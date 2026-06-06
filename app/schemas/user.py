from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    """Базовая схема пользователя."""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    role: str = Field(default="subj")  # subj или obj


class UserCreate(UserBase):
    """Схема для регистрации."""
    password: str = Field(..., min_length=6, max_length=100)


class UserUpdate(BaseModel):
    """Схема для обновления профиля."""
    name: Optional[str] = None
    phone: Optional[str] = None


class UserResponse(BaseModel):
    """Ответ с информацией пользователя."""
    id: int
    name: str
    email: str
    phone: Optional[str]
    role: str
    referred_by: Optional[int]
    stamps_count: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """Ответ при входе с токенами."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    """Запрос на обновление токена."""
    refresh: str