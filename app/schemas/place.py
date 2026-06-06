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


class PlaceResponse(PlaceBase):
    """Ответ с информацией о месте."""
    id: int
    owner_id: int
    qr_code: str
    stamp_url: Optional[str]
    is_active: bool
    created_at: datetime
    category: Optional[CategoryResponse]
    
    class Config:
        from_attributes = True


class PlaceStatsResponse(BaseModel):
    """Статистика по месту."""
    total_stamps: int
    recent_stamps: list


class PlaceQRResponse(BaseModel):
    """Ответ с QR-кодом."""
    qr_code: str
    place_id: int
    place_name: str
