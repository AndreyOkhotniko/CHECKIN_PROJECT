from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class CategoryResponse(BaseModel):
    """Ответ с информацией о категории."""
    id: int
    name: str
    description: Optional[str]
    
    class Config:
        from_attributes = True


class PlaceBase(BaseModel):
    """Базовая схема места."""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    address: Optional[str] = None
    category_id: Optional[int] = None


class PlaceCreate(PlaceBase):
    """Схема для создания места."""
    pass


class PlaceUpdate(BaseModel):
    """Схема для обновления места."""
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    category_id: Optional[int] = None


class PlacePublicResponse(PlaceBase):
    """
    Публичный ответ о месте (без qr_code!).

    Используется в открытых эндпоинтах. QR-код намеренно НЕ отдаётся, иначе
    любой пользователь мог бы поставить штамп, не посещая место физически.
    """
    id: int
    owner_id: int
    stamp_url: Optional[str]
    is_active: bool
    created_at: datetime
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True


class PlaceResponse(PlacePublicResponse):
    """
    Полный ответ о месте, включая qr_code.

    Возвращается только владельцу места (создание, /my, обновление).
    """
    qr_code: str


class PlaceStatsResponse(BaseModel):
    """Статистика по месту."""
    total_stamps: int
    recent_stamps: list


class PlaceQRResponse(BaseModel):
    """Ответ с QR-кодом."""
    qr_code: str
    place_id: int
    place_name: str
