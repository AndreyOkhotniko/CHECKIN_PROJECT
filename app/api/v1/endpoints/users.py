import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me/", response_model=UserResponse)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Получить профиль текущего пользователя."""
    return UserResponse.model_validate(current_user)


@router.put("/me/", response_model=UserResponse)
async def update_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Обновить профиль пользователя."""
    if user_update.name:
        current_user.name = user_update.name
    if user_update.phone:
        current_user.phone = user_update.phone
    
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    
    return UserResponse.model_validate(current_user)


@router.get("/referral_link/")
async def get_referral_link(
    current_user: User = Depends(get_current_user)
):
    """Получить реферальную ссылку текущего пользователя."""
    return {
        "referral_code": str(current_user.id),
        "referral_link": f"https://yourapp.com/register?ref={current_user.id}"
    }
