from .user import User, UserRole
from .place import Place
from .stamp import Stamp

# Для Alembic (чтобы видел все модели)
__all__ = ["User", "UserRole", "Place", "Stamp"]