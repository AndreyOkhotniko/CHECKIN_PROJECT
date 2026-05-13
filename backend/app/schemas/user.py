from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    """
    Базовая схема пользователя.
    
    Содержит общие поля для всех схем пользователя.
    """
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = Field(None, max_length=100)
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    """
    Схема для создания пользователя.
    
    Включает пароль, который не возвращается в ответах API.
    """
    password: str = Field(..., min_length=8, max_length=100)

class UserUpdate(BaseModel):
    """
    Схема для обновления пользователя.
    
    Все поля опциональны - обновляются только переданные.
    """
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8)
    is_active: Optional[bool] = None

class UserResponse(UserBase):
    """
    Схема для ответа API.
    
    Включает все поля кроме пароля.
    """
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True  # Позволяет создавать схему из ORM объекта

class UserInDB(UserResponse):
    """
    Внутренняя схема (для базы данных).
    
    Включает хеш пароля (никогда не возвращается в API).
    """
    hashed_password: str