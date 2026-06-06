from sqlalchemy import Column, Integer, String, Boolean, DateTime, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base


class User(Base):
    """
    Модель пользователя.
    
    Поля:
    - name: имя пользователя
    - email: электронная почта
    - phone: номер телефона (опционально)
    - hashed_password: хеш пароля
    - role: роль (subj - субъект, obj - объект места)
    - referred_by: ID пользователя, кто пригласил
    - stamps_count: количество штампов
    - is_active: активен ли аккаунт
    """
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20))
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="subj")  # subj или obj
    referred_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    stamps_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Отношения
    places = relationship("Place", back_populates="owner")
    stamps = relationship("Stamp", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.name}>"


class Category(Base):
    """Категория места."""
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Place(Base):
    """
    Место с QR-кодом.
    
    Создается объектом (role=obj).
    """
    __tablename__ = "places"
    
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    address = Column(String(500))
    category_id = Column(Integer, ForeignKey("categories.id"))
    qr_code = Column(String(500), unique=True, nullable=False)  # Текстовое представление QR
    stamp_url = Column(String(500))  # Картинка штампа (опционально)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Отношения
    owner = relationship("User", back_populates="places")
    stamps = relationship("Stamp", back_populates="place")
    category = relationship("Category")


class Stamp(Base):
    """
    Штамп (чекин) - запись о посещении.
    """
    __tablename__ = "stamps"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    place_id = Column(Integer, ForeignKey("places.id"), nullable=False)
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Отношения
    user = relationship("User", back_populates="stamps")
    place = relationship("Place", back_populates="stamps")
    
    __table_args__ = (
        # Уникальное ограничение: один пользователь может ставить штамп в одно место только один раз
        # (если нужны повторные штампы, удалите это ограничение)
    )