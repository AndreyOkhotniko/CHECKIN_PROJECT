"Пример эндпоинта с БД"
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserInDB

router = APIRouter()

@router.post("/users/", response_model=UserInDB)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # Проверка существования пользователя
    result = await db.execute(
        select(User).where(User.email == user.email)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # В реальном проекте здесь должно быть хеширование пароля
    db_user = User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=user.password  # Временно, нужно хешировать!
    )
    
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

@router.get("/users/", response_model=list[UserInDB])
async def get_users(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(User).offset(skip).limit(limit)
    )
    users = result.scalars().all()
    return users

@router.get("/users/{user_id}", response_model=UserInDB)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user