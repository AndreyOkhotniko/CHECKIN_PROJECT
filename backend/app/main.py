from fastapi import FastAPI
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

@app.on_event("startup")
async def startup():
    # Создание таблиц (только для разработки, в продакшене используйте миграции)
    async with engine.begin() as conn:
        # Для разработки можно раскомментировать
        # await conn.run_sync(Base.metadata.create_all)
        pass

@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()

@app.get("/")
async def root():
    return {
        "message": "Hello World", 
        "environment": settings.ENVIRONMENT,
        "database": settings.POSTGRES_DB
    }

@app.get("/health")
async def health_check():
    try:
        # Простая проверка подключения к БД
        async with engine.connect() as conn:
            await conn.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}