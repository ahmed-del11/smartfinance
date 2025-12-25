from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["Categories"])


@router.get("/", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    """Get all categories."""
    categories = db.query(Category).all()
    return categories


@router.get("/income", response_model=List[CategoryResponse])
def get_income_categories(db: Session = Depends(get_db)):
    """Get income categories only."""
    categories = db.query(Category).filter(Category.type == "income").all()
    return categories


@router.get("/expense", response_model=List[CategoryResponse])
def get_expense_categories(db: Session = Depends(get_db)):
    """Get expense categories only."""
    categories = db.query(Category).filter(Category.type == "expense").all()
    return categories
