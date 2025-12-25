from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional
from app.schemas.category import CategoryResponse


class TransactionBase(BaseModel):
    amount: Decimal = Field(..., gt=0, description="Transaction amount (positive)")
    date: date
    description: Optional[str] = None
    category_id: int


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    amount: Optional[Decimal] = Field(None, gt=0)
    date: Optional[date] = None
    description: Optional[str] = None
    category_id: Optional[int] = None


class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    category: CategoryResponse

    class Config:
        from_attributes = True


class TransactionListResponse(BaseModel):
    id: int
    amount: Decimal
    date: date
    description: Optional[str]
    category: CategoryResponse

    class Config:
        from_attributes = True
