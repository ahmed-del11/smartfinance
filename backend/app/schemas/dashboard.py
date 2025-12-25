from pydantic import BaseModel
from decimal import Decimal
from typing import List


class DashboardSummary(BaseModel):
    total_income: Decimal
    total_expenses: Decimal
    balance: Decimal


class ChartDataItem(BaseModel):
    category: str
    amount: Decimal
    color: str


class ChartDataResponse(BaseModel):
    data: List[ChartDataItem]
