from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class StampBase(BaseModel):
    """Базовая схема штампа."""
    pass


class StampVerifyRequest(BaseModel):
    """Запрос на проверку QR-кода."""
    qr_code: str


class StampCreateRequest(BaseModel):
    """Запрос на создание штампа."""
    qr_code: Optional[str] = None
    place_id: Optional[int] = None


class StampResponse(BaseModel):
    """Ответ с информацией о штампе."""
    id: int
    user_id: int
    place_id: int
    place_name: Optional[str] = None
    place_stamp_url: Optional[str] = None
    scanned_at: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True


class StampCollectionResponse(BaseModel):
    """Ответ для коллекции штампов."""
    id: int
    place_name: str
    place_stamp_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


class StampVerifyResponse(BaseModel):
    """Ответ на проверку QR-кода."""
    place_id: int
    place_name: str
    stamp_preview: Optional[str] = None


class StampOfflineSyncRequest(BaseModel):
    """Запрос на синхронизацию офлайн штампов."""
    items: list[dict]  # [{qr_code, scanned_at}, ...]


class StampOfflineSyncResponse(BaseModel):
    """Ответ на синхронизацию офлайн штампов."""
    successful: list[dict]
    errors: list[dict]
