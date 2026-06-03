from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    SUBJ = "subj"  # обычный пользователь
    OBJ = "obj"    # владелец места

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, nullable=False)
    email: str = Field(max_length=255, unique=True, nullable=False, index=True)
    phone: Optional[str] = Field(default=None, max_length=50)
    password: str = Field(max_length=255, nullable=False)  # хранить хеш!
    role: UserRole = Field(default=UserRole.SUBJ)
    avatar: Optional[str] = Field(default=None)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow}
    )
    
    # Связи (будет работать после создания других моделей)
    places: List["Place"] = Relationship(back_populates="owner")
    stamps: List["Stamp"] = Relationship(back_populates="user")