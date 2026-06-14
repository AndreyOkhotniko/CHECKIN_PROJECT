from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from app.core.config import settings

# Контекст для хеширования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class TokenData(BaseModel):
    """Данные, которые хранятся в JWT токене."""
    sub: int  # user_id
    type: str = "access"  # access или refresh


def hash_password(password: str) -> str:
    """Хеширует пароль."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверяет пароль."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(user_id: int, expires_delta: Optional[timedelta] = None) -> str:
    """Создает JWT access token."""
    if expires_delta is None:
        expires_delta = timedelta(hours=24)
    
    expire = datetime.now(timezone.utc) + expires_delta
    data = {
        "sub": str(user_id),
        "type": "access",
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    
    encoded_jwt = jwt.encode(
        data,
        settings.SECRET_KEY,
        algorithm="HS256"
    )
    return encoded_jwt


def create_refresh_token(user_id: int, expires_delta: Optional[timedelta] = None) -> str:
    """Создает JWT refresh token."""
    if expires_delta is None:
        expires_delta = timedelta(days=7)
    
    expire = datetime.now(timezone.utc) + expires_delta
    data = {
        "sub": str(user_id),
        "type": "refresh",
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    
    encoded_jwt = jwt.encode(
        data,
        settings.SECRET_KEY,
        algorithm="HS256"
    )
    return encoded_jwt


def verify_token(token: str) -> Optional[TokenData]:
    """Проверяет JWT token и возвращает данные. При любой ошибке возвращает None."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        sub = payload.get("sub")
        if sub is None:
            return None
        # sub хранится строкой; некорректное значение → TypeError/ValueError
        user_id = int(sub)
        token_type = payload.get("type", "access")
        return TokenData(sub=user_id, type=token_type)
    except (JWTError, TypeError, ValueError):
        return None
