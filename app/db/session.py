from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Создание асинхронного движка БД
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,        # Логирование SQL запросов при DEBUG=True
    future=True,                # Использование нового стиля SQLAlchemy 2.0
    pool_size=20,               # Размер пула соединений
    max_overflow=10             # Максимальное количество дополнительных соединений
)

# Фабрика сессий
async_session = sessionmaker(
    engine,
    class_=AsyncSession,        # Асинхронные сессии
    expire_on_commit=False      # Объекты остаются доступными после коммита
)

async def get_db() -> AsyncSession:
    """
    Зависимость FastAPI для получения сессии БД.
    
    Автоматически управляет:
    - Созданием сессии
    - Коммитом/откатом транзакций
    - Закрытием сессии
    """
    async with async_session() as session:
        try:
            yield session
            await session.commit()      # Автоматический коммит при успехе
        except Exception:
            await session.rollback()    # Автоматический откат при ошибке
            raise                       # Проброс исключения дальше
        finally:
            await session.close()       # Гарантированное закрытие