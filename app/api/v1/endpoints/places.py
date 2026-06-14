import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.db.session import get_db
from app.models.user import User
from app.models.user import Place, Stamp
from app.schemas.place import (
    PlaceCreate, PlaceUpdate, PlaceResponse, PlacePublicResponse,
    PlaceStatsResponse, PlaceQRResponse
)
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/places", tags=["places"])


@router.post("/", response_model=PlaceResponse)
async def create_place(
    place_data: PlaceCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Создать новое место (только для роли obj)."""
    if current_user.role != "obj":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Только объекты могут создавать места"
        )
    
    # Генерируем QR-код
    qr_code = str(uuid.uuid4())
    
    # Проверяем uniqueness
    result = await db.execute(select(Place).where(Place.qr_code == qr_code))
    while result.scalar_one_or_none():
        qr_code = str(uuid.uuid4())
        result = await db.execute(select(Place).where(Place.qr_code == qr_code))
    
    new_place = Place(
        owner_id=current_user.id,
        name=place_data.name,
        description=place_data.description,
        address=place_data.address,
        category_id=place_data.category_id,
        qr_code=qr_code
    )
    
    db.add(new_place)
    await db.commit()
    await db.refresh(new_place)
    
    return PlaceResponse.model_validate(new_place)


@router.get("/my/")
async def get_my_places(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Получить список мест, созданных текущим объектом."""
    if current_user.role != "obj":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Только объекты имеют места"
        )
    
    result = await db.execute(
        select(Place).where(Place.owner_id == current_user.id)
    )
    places = result.scalars().all()
    
    return [PlaceResponse.model_validate(place) for place in places]


@router.get("/", response_model=list[PlacePublicResponse])
async def get_public_places(
    search: str = None,
    category: int = None,
    db: AsyncSession = Depends(get_db)
):
    """Получить публичный список активных мест (без QR-кодов)."""
    query = select(Place).where(Place.is_active.is_(True))

    if search:
        query = query.where(
            (Place.name.ilike(f"%{search}%")) |
            (Place.description.ilike(f"%{search}%"))
        )

    if category:
        query = query.where(Place.category_id == category)

    result = await db.execute(query)
    places = result.scalars().all()

    return [PlacePublicResponse.model_validate(place) for place in places]


@router.get("/{place_id}/", response_model=PlacePublicResponse)
async def get_place(
    place_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Получить детали конкретного места (публично, без QR-кода)."""
    result = await db.execute(select(Place).where(Place.id == place_id))
    place = result.scalar_one_or_none()

    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Место не найдено"
        )

    return PlacePublicResponse.model_validate(place)


@router.put("/{place_id}/", response_model=PlaceResponse)
async def update_place(
    place_id: int,
    place_update: PlaceUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Обновить место (только владелец)."""
    result = await db.execute(select(Place).where(Place.id == place_id))
    place = result.scalar_one_or_none()
    
    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Место не найдено"
        )
    
    if place.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Только владелец может редактировать место"
        )
    
    if place_update.name:
        place.name = place_update.name
    if place_update.description:
        place.description = place_update.description
    if place_update.address:
        place.address = place_update.address
    if place_update.category_id:
        place.category_id = place_update.category_id
    
    db.add(place)
    await db.commit()
    await db.refresh(place)
    
    return PlaceResponse.model_validate(place)


@router.delete("/{place_id}/")
async def delete_place(
    place_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Удалить место (только если нет штампов)."""
    result = await db.execute(select(Place).where(Place.id == place_id))
    place = result.scalar_one_or_none()
    
    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Место не найдено"
        )
    
    if place.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Только владелец может удалить место"
        )
    
    # Проверяем наличие штампов
    result = await db.execute(
        select(func.count(Stamp.id)).where(Stamp.place_id == place_id)
    )
    stamp_count = result.scalar()
    
    if stamp_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Невозможно удалить место с штампами"
        )
    
    await db.delete(place)
    await db.commit()
    
    return {"detail": "Место успешно удалено"}


@router.get("/{place_id}/qr/")
async def get_place_qr(
    place_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Получить QR-код места."""
    result = await db.execute(select(Place).where(Place.id == place_id))
    place = result.scalar_one_or_none()
    
    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Место не найдено"
        )
    
    return PlaceQRResponse(
        qr_code=place.qr_code,
        place_id=place.id,
        place_name=place.name
    )


@router.get("/{place_id}/stats/")
async def get_place_stats(
    place_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Получить статистику по месту (только для владельца)."""
    result = await db.execute(select(Place).where(Place.id == place_id))
    place = result.scalar_one_or_none()
    
    if not place:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Место не найдено"
        )
    
    if place.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Только владелец может смотреть статистику"
        )
    
    # Получаем статистику
    result = await db.execute(
        select(func.count(Stamp.id)).where(Stamp.place_id == place_id)
    )
    total_stamps = result.scalar()
    
    # Получаем последние штампы
    result = await db.execute(
        select(User.name, Stamp.scanned_at)
        .join(User)
        .where(Stamp.place_id == place_id)
        .order_by(Stamp.scanned_at.desc())
        .limit(10)
    )
    recent_stamps = [
        {"user_name": row[0], "stamped_at": row[1].isoformat()}
        for row in result.all()
    ]
    
    return PlaceStatsResponse(
        total_stamps=total_stamps,
        recent_stamps=recent_stamps
    )
