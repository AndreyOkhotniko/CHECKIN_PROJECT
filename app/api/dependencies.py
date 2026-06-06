from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.models.user import User
from app.core.security import verify_token

security = HTTPBearer()


async def get_current_user(
    credentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Получить текущего пользователя из JWT token.
    
    Используется как зависимость в защищенных эндпоинтах.
    """
    token = credentials.credentials
    token_data = verify_token(token)
    
    if not token_data or token_data.type != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неправильный или истекший токен",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    result = await db.execute(select(User).where(User.id == token_data.sub))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден"
        )
    
    return user
