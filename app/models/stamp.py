from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from sqlalchemy import UniqueConstraint

class Stamp(SQLModel, table=True):
    __tablename__ = "stamps"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, nullable=False)
    description: Optional[str] = Field(default=None)
    address: str = Field(max_length=255, nullable=False)
    qr_code: str = Field(max_length=255, unique=True, nullable=False, index=True)
    is_active: bool = Field(default=True)
    earned_at: datetime = Field(default_factory=datetime.utcnow)  # когда получен штамп
    expires_at: Optional[datetime] = Field(default=None)  # срок действия
    
    # Внешние ключи
    user_id: int = Field(foreign_key="users.id", nullable=False, index=True)
    place_id: int = Field(foreign_key="places.id", nullable=False, index=True)
    
    # Связи
    user: Optional["User"] = Relationship(back_populates="stamps")
    place: Optional["Place"] = Relationship(back_populates="stamps")
    
    # Уникальность пары (пользователь, место) - один чек-ин на место
    __table_args__ = (
        UniqueConstraint('user_id', 'place_id', name='uq_user_place'),
    )