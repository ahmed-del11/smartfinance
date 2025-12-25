"""
Database seeder script for SmartFinance.
Run this after creating the database to seed initial categories.
"""
import sys
sys.path.insert(0, '.')

from app.database import SessionLocal, engine, Base
from app.models.category import Category
from app.models.user import User
from app.models.transaction import Transaction  # Import to register the model
from app.services.auth import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

# Predefined categories
CATEGORIES = [
    # Expense categories
    {"name": "Food & Dining", "type": "expense", "icon": "🍔", "color": "#EF4444"},
    {"name": "Transportation", "type": "expense", "icon": "🚗", "color": "#F59E0B"},
    {"name": "Shopping", "type": "expense", "icon": "🛍️", "color": "#EC4899"},
    {"name": "Entertainment", "type": "expense", "icon": "🎬", "color": "#8B5CF6"},
    {"name": "Bills & Utilities", "type": "expense", "icon": "💡", "color": "#6366F1"},
    {"name": "Healthcare", "type": "expense", "icon": "🏥", "color": "#14B8A6"},
    {"name": "Education", "type": "expense", "icon": "📚", "color": "#0EA5E9"},
    {"name": "Travel", "type": "expense", "icon": "✈️", "color": "#F97316"},
    {"name": "Groceries", "type": "expense", "icon": "🛒", "color": "#22C55E"},
    {"name": "Other Expense", "type": "expense", "icon": "📦", "color": "#6B7280"},
    
    # Income categories
    {"name": "Salary", "type": "income", "icon": "💼", "color": "#10B981"},
    {"name": "Freelance", "type": "income", "icon": "💻", "color": "#06B6D4"},
    {"name": "Investments", "type": "income", "icon": "📈", "color": "#8B5CF6"},
    {"name": "Gifts", "type": "income", "icon": "🎁", "color": "#F43F5E"},
    {"name": "Other Income", "type": "income", "icon": "💰", "color": "#84CC16"},
]


def seed_categories(db):
    """Seed default categories."""
    existing = db.query(Category).first()
    if existing:
        print("Categories already exist, skipping...")
        return
    
    for cat_data in CATEGORIES:
        category = Category(**cat_data)
        db.add(category)
    
    db.commit()
    print(f"✅ {len(CATEGORIES)} categories seeded successfully!")


def seed_demo_user(db):
    """Seed a demo user."""
    existing = db.query(User).filter(User.email == "demo@smartfinance.com").first()
    if existing:
        print("Demo user already exists, skipping...")
        return
    
    demo_user = User(
        username="demo",
        email="demo@smartfinance.com",
        password_hash=get_password_hash("demo123")
    )
    db.add(demo_user)
    db.commit()
    print("✅ Demo user created: demo@smartfinance.com / demo123")


def main():
    print("🌱 Seeding SmartFinance database...")
    
    db = SessionLocal()
    try:
        seed_categories(db)
        seed_demo_user(db)
        print("\n🎉 Database seeding complete!")
    finally:
        db.close()


if __name__ == "__main__":
    main()
