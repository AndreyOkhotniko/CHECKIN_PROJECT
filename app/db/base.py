from sqlmodel import SQLModel
from datetime import datetime
from sqlalchemy import Column, DateTime
from sqlalchemy.sql import func

class BaseModel(SQLModel):
    """Базовый класс для всех моделей с общими полями"""
    
    class Config:
        arbitrary_types_allowed = True
    
    # Эти поля будут добавлены в каждую модель
    # Но их нужно явно указывать в дочерних классах

# Если хотите добавить служебные поля во все модели:
class TimestampMixin(SQLModel):
    """Mixin для добавления временных меток"""
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"onupdate": datetime.utcnow}
    )