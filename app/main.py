from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base

# Импортируем все роутеры
from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.users import router as users_router
from app.api.v1.endpoints.places import router as places_router
from app.api.v1.endpoints.stamps import router as stamps_router
from app.api.v1.endpoints.categories import router as categories_router


# Асинхронные события жизненного цикла приложения
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        async with engine.begin() as conn:
            # Создание таблиц (только для разработки, в продакшене используйте миграции)
            # await conn.run_sync(Base.metadata.create_all)
            pass
    except Exception as e:
        print(f"Warning: Could not connect to database on startup: {e}")
        print("Continuing without database...")
    yield
    # Shutdown
    try:
        await engine.dispose()
    except Exception as e:
        print(f"Warning: Error during shutdown: {e}")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
)

# Регистрируем все роутеры
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(places_router)
app.include_router(stamps_router)
app.include_router(categories_router)


@app.get("/")
async def root():
    return {
        "message": "Асинхронная библиотека",
        "environment": settings.ENVIRONMENT,
        "database": settings.POSTGRES_DB
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}