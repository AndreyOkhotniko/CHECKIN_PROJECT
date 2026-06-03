from fastapi import FastAPI
from app.core.config import settings
from app.db.session import engine
from app.db.base import BaseModel
from app.models import User, Place, Stamp  # Добавьте эту строку

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

@app.on_event("startup")
async def startup():
    # В разработке можно создать таблицы (но лучше через миграции)
    # Раскомментируйте для быстрого старта:
    # async with engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.create_all)
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
        async with engine.connect() as conn:
            await conn.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}