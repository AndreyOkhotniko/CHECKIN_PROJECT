from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """
    Централизованные настройки приложения.
    
    Загружаются из:
    1. Переменных окружения
    2. .env файла
    3. Значений по умолчанию (в порядке приоритета)
    """
    
    # Основные настройки проекта
    PROJECT_NAME: str = "FastAPI Project"
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "change-me-in-production"
    
    # Настройки БД PostgreSQL
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "fastapi_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"
    
    @property
    def DATABASE_URL(self) -> str:
        """
        URL для асинхронного подключения к PostgreSQL.
        
        Использует asyncpg драйвер для поддержки асинхронных операций.
        """
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:"
            f"{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:"
            f"{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )
    
    @property
    def SYNC_DATABASE_URL(self) -> str:
        """
        URL для синхронного подключения.
        
        Необходим для Alembic миграций, так как Alembic не поддерживает асинхронный режим.
        """
        return (
            f"postgresql://{self.POSTGRES_USER}:"
            f"{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:"
            f"{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )
    
    class Config:
        env_file = ".env"      # Файл с переменными окружения
        case_sensitive = True  # Чувствительность к регистру

# Синглтон с настройками
settings = Settings()