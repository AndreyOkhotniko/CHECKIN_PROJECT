from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class StampBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    address: str = Field(..., min_length=1, max_length=255)
    qr_code: str = Field(..., min_length=1, max_length=255)

class StampCreate(StampBase):
    place_id: int

class StampUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    is_active: Optional[bool] = None
    expires_at: Optional[datetime] = None

class StampResponse(StampBase):
    id: int
    user_id: int
    place_id: int
    is_active: bool
    earned_at: datetime
    expires_at: Optional[datetime]
    
    class Config:
        from_attributes = True