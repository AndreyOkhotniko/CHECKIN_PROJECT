from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timezone

from app.db.session import get_db
from app.models.user import User, Place, Stamp
from app.schemas.stamp import (
    StampVerifyRequest, StampCreateRequest, StampResponse,
    StampCollectionResponse, StampVerifyResponse, StampOfflineSyncRequest,
    StampOfflineSyncResponse
)
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/stamps", tags=["stamps"])


@router.post("/verify/", response_model=StampVerifyResponse)
async def verify_stamp(
    request: StampVerifyRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Проверка QR-кода без сохранения штампа."""
    # Ищем место по QR-коду
    result = await db.execute(
        select(Place).where(Place.qr_code == request.qr_code)
    )
    place = result.scalar_one_or_none()
    
    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="QR-код не найден"
        )
    
    if not place.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Это место больше не активно"
        )
    
    # Проверяем, есть ли уже штамп у этого пользователя в этом месте
    result = await db.execute(
        select(Stamp).where(
            (Stamp.user_id == current_user.id) &
            (Stamp.place_id == place.id)
        )
    )
    existing_stamp = result.scalar_one_or_none()
    
    if existing_stamp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Вы уже ставили штамп в этом месте"
        )
    
    return StampVerifyResponse(
        place_id=place.id,
        place_name=place.name,
        stamp_preview=place.stamp_url
    )


@router.post("/", response_model=StampResponse)
async def create_stamp(
    request: StampCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Сохранить штамп после подтверждения."""
    place = None
    
    if request.qr_code:
        result = await db.execute(
            select(Place).where(Place.qr_code == request.qr_code)
        )
        place = result.scalar_one_or_none()
    elif request.place_id:
        result = await db.execute(
            select(Place).where(Place.id == request.place_id)
        )
        place = result.scalar_one_or_none()
    
    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Место не найдено"
        )
    
    # Проверяем, есть ли уже штамп
    result = await db.execute(
        select(Stamp).where(
            (Stamp.user_id == current_user.id) &
            (Stamp.place_id == place.id)
        )
    )
    existing_stamp = result.scalar_one_or_none()
    
    if existing_stamp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Вы уже ставили штамп в этом месте"
        )
    
    # Создаем штамп
    new_stamp = Stamp(
        user_id=current_user.id,
        place_id=place.id,
        scanned_at=datetime.now(timezone.utc)
    )
    
    # Обновляем счетчик штампов пользователя
    current_user.stamps_count += 1
    
    db.add(new_stamp)
    db.add(current_user)
    await db.commit()
    await db.refresh(new_stamp)
    
    return StampResponse(
        id=new_stamp.id,
        user_id=new_stamp.user_id,
        place_id=new_stamp.place_id,
        place_name=place.name,
        place_stamp_url=place.stamp_url,
        scanned_at=new_stamp.scanned_at,
        created_at=new_stamp.created_at
    )


@router.get("/my/", response_model=list[StampCollectionResponse])
async def get_user_stamps(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Получить список штампов текущего пользователя."""
    result = await db.execute(
        select(Stamp, Place.name, Place.stamp_url)
        .join(Place)
        .where(Stamp.user_id == current_user.id)
        .order_by(Stamp.created_at.desc())
    )
    stamps = result.all()
    
    return [
        StampCollectionResponse(
            id=stamp[0].id,
            place_name=stamp[1],
            place_stamp_url=stamp[2],
            created_at=stamp[0].created_at
        )
        for stamp in stamps
    ]


@router.get("/{stamp_id}/", response_model=StampResponse)
async def get_stamp(
    stamp_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Получить детали одного штампа."""
    result = await db.execute(
        select(Stamp).where(Stamp.id == stamp_id)
    )
    stamp = result.scalar_one_or_none()
    
    if not stamp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Штамп не найден"
        )
    
    # Проверяем доступ (может смотреть только владелец)
    if stamp.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Вы не имеете доступа к этому штампу"
        )
    
    # Получаем информацию о месте
    result = await db.execute(
        select(Place).where(Place.id == stamp.place_id)
    )
    place = result.scalar_one_or_none()
    
    return StampResponse(
        id=stamp.id,
        user_id=stamp.user_id,
        place_id=stamp.place_id,
        place_name=place.name if place else None,
        place_stamp_url=place.stamp_url if place else None,
        scanned_at=stamp.scanned_at,
        created_at=stamp.created_at
    )


@router.post("/offline_sync/", response_model=StampOfflineSyncResponse)
async def offline_sync(
    request: StampOfflineSyncRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Пакетная отправка чек-инов, сделанных без интернета."""
    successful = []
    errors = []
    seen_place_ids = set()  # дедуп дублей внутри одного пакета

    for item in request.items:
        qr_code = item.get("qr_code")
        scanned_at = item.get("scanned_at")

        try:
            # Ищем место по QR-коду
            result = await db.execute(
                select(Place).where(Place.qr_code == qr_code)
            )
            place = result.scalar_one_or_none()

            if not place:
                errors.append({"qr_code": qr_code, "error": "QR-код не найден"})
                continue

            # Дубль в пределах этого же пакета
            if place.id in seen_place_ids:
                errors.append({"qr_code": qr_code, "error": "Дубликат в пакете"})
                continue

            # Проверяем, есть ли уже штамп в БД
            result = await db.execute(
                select(Stamp).where(
                    (Stamp.user_id == current_user.id) &
                    (Stamp.place_id == place.id)
                )
            )
            if result.scalar_one_or_none():
                errors.append({"qr_code": qr_code, "error": "Штамп уже существует"})
                continue

            new_stamp = Stamp(
                user_id=current_user.id,
                place_id=place.id,
                scanned_at=datetime.fromisoformat(scanned_at) if isinstance(scanned_at, str) else scanned_at
            )

            # Сохраняем элемент в собственном savepoint: ошибка одного штампа
            # (например, гонка с уникальным ограничением) не рушит весь пакет.
            async with db.begin_nested():
                db.add(new_stamp)
                await db.flush()

            current_user.stamps_count += 1
            seen_place_ids.add(place.id)
            successful.append({
                "qr_code": qr_code,
                "place_id": place.id,
                "place_name": place.name
            })

        except IntegrityError:
            errors.append({"qr_code": qr_code, "error": "Штамп уже существует"})
        except Exception as e:
            errors.append({"qr_code": qr_code, "error": str(e)})

    await db.commit()

    return StampOfflineSyncResponse(
        successful=successful,
        errors=errors
    )
