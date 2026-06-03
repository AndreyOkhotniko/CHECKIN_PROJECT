from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Place(SQLModel, table=True):
    __tablename__ = "places"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, nullable=False)
    description: Optional[str] = Field(default=None)
    address: str = Field(max_length=255, nullable=False)
    latitude: Optional[float] = Field(default=None)  # для карт
    longitude: Optional[float] = Field(default=None) # для карт
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow}
    )
    
    # Внешний ключ
    owner_id: int = Field(foreign_key="users.id", nullable=False, index=True)
    
    # Связи
    owner: Optional["User"] = Relationship(back_populates="places")
    stamps: List["Stamp"] = Relationship(back_populates="place")