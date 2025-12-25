from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from decimal import Decimal
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.category import Category
from app.models.transaction import Transaction
from app.schemas.dashboard import DashboardSummary, ChartDataItem
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get total income, expenses, and balance for the current user."""
    # Calculate total income
    income_result = db.query(func.coalesce(func.sum(Transaction.amount), 0)).join(
        Category
    ).filter(
        Transaction.user_id == current_user.id,
        Category.type == "income"
    ).scalar()

    # Calculate total expenses
    expenses_result = db.query(func.coalesce(func.sum(Transaction.amount), 0)).join(
        Category
    ).filter(
        Transaction.user_id == current_user.id,
        Category.type == "expense"
    ).scalar()

    total_income = Decimal(str(income_result))
    total_expenses = Decimal(str(expenses_result))
    balance = total_income - total_expenses

    return DashboardSummary(
        total_income=total_income,
        total_expenses=total_expenses,
        balance=balance
    )


@router.get("/chart", response_model=List[ChartDataItem])
def get_expense_chart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get expenses grouped by category for pie chart visualization."""
    results = db.query(
        Category.name,
        Category.color,
        func.sum(Transaction.amount).label("total")
    ).join(
        Transaction
    ).filter(
        Transaction.user_id == current_user.id,
        Category.type == "expense"
    ).group_by(
        Category.id, Category.name, Category.color
    ).all()

    return [
        ChartDataItem(
            category=row.name,
            amount=Decimal(str(row.total)) if row.total else Decimal(0),
            color=row.color or "#6B7280"
        )
        for row in results
    ]


@router.get("/income-chart", response_model=List[ChartDataItem])
def get_income_chart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get income grouped by category for pie chart visualization."""
    results = db.query(
        Category.name,
        Category.color,
        func.sum(Transaction.amount).label("total")
    ).join(
        Transaction
    ).filter(
        Transaction.user_id == current_user.id,
        Category.type == "income"
    ).group_by(
        Category.id, Category.name, Category.color
    ).all()

    return [
        ChartDataItem(
            category=row.name,
            amount=Decimal(str(row.total)) if row.total else Decimal(0),
            color=row.color or "#10B981"
        )
        for row in results
    ]
