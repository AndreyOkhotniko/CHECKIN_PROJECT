from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.models.user import Category
from app.schemas.place import CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("/", response_model=list[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    """Получить список всех категорий."""
    result = await db.execute(select(Category))
    categories = result.scalars().all()
    
    return [CategoryResponse.model_validate(cat) for cat in categories]
