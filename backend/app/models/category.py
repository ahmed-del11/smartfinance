from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


class Category(Base):
    """Category model for transaction categorization."""
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    type = Column(String(10), nullable=False)  # 'income' or 'expense'
    icon = Column(String(50), nullable=True)
    color = Column(String(7), nullable=True)  # Hex color code

    # Relationship with transactions
    transactions = relationship("Transaction", back_populates="category")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}', type='{self.type}')>"
