from sqlalchemy import Column, Integer, String, Boolean, DateTime, Table
from sqlalchemy.sql import func
from app.db.base import Base

class User(Base):
    """
    Модель пользователя (SQLAlchemy ORM).
    
    Описывает структуру таблицы 'users' в БД.
    """
    __tablename__ = "users"
    
    # Первичный ключ
    id = Column(Integer, primary_key=True, index=True)
    
    # Уникальные поля с индексами для быстрого поиска
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    
    # Основная информация
    full_name = Column(String(100))
    hashed_password = Column(String(255), nullable=False)
    
    # Статус пользователя
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    # Временные метки
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        """Строковое представление для отладки"""
        return f"<User {self.username}>"