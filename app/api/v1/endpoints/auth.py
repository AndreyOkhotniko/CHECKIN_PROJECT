import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, TokenResponse, TokenRefresh
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, verify_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register/", response_model=TokenResponse)
async def register(
    user_data: UserCreate,
    ref: str = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Регистрация нового пользователя.
    
    Query параметр `ref` - код реферала (опционально).
    """
    # Проверяем, есть ли уже пользователь с таким email
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email уже зарегистрирован"
        )
    
    # Ищем пользователя по реферальному коду
    referred_by = None
    if ref:
        result = await db.execute(select(User).where(User.id == int(ref)))
        referred_user = result.scalar_one_or_none()
        if referred_user:
            referred_by = referred_user.id
    
    # Создаем нового пользователя
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        hashed_password=hash_password(user_data.password),
        role=user_data.role,
        referred_by=referred_by,
        stamps_count=0
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    # Создаем токены
    access_token = create_access_token(new_user.id)
    refresh_token = create_refresh_token(new_user.id)
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )


@router.post("/login/", response_model=TokenResponse)
async def login(
    email: str,
    password: str,
    db: AsyncSession = Depends(get_db)
):
    """Вход пользователя (получение JWT)."""
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неправильный email или пароль"
        )
    
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )


@router.post("/refresh/", response_model=TokenResponse)
async def refresh(
    token_data: TokenRefresh,
    db: AsyncSession = Depends(get_db)
):
    """Обновление JWT access token по refresh token."""
    token_info = verify_token(token_data.refresh)
    
    if not token_info or token_info.type != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неправильный refresh token"
        )
    
    # Проверяем, что пользователь существует
    result = await db.execute(select(User).where(User.id == token_info.sub))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден"
        )
    
    access_token = create_access_token(user.id)
    new_refresh_token = create_refresh_token(user.id)
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh_token
    )
