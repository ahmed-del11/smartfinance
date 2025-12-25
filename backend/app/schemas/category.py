from pydantic import BaseModel
from typing import Optional


class CategoryBase(BaseModel):
    name: str
    type: str  # 'income' or 'expense'
    icon: Optional[str] = None
    color: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True
