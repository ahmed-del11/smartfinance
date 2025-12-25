from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base, SessionLocal
from app.routers import auth, transactions, dashboard, categories
from app.models.category import Category

# Create database tables
Base.metadata.create_all(bind=engine)


def seed_categories():
    """Seed initial categories if database is empty."""
    db = SessionLocal()
    try:
        # Check if categories exist
        existing = db.query(Category).first()
        if existing:
            return  # Already seeded
        
        # Seed default categories
        default_categories = [
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
            {"name": "Salary", "type": "income", "icon": "💼", "color": "#10B981"},
            {"name": "Freelance", "type": "income", "icon": "💻", "color": "#06B6D4"},
            {"name": "Investments", "type": "income", "icon": "📈", "color": "#8B5CF6"},
            {"name": "Gifts", "type": "income", "icon": "🎁", "color": "#F43F5E"},
            {"name": "Other Income", "type": "income", "icon": "💰", "color": "#84CC16"},
        ]
        
        for cat_data in default_categories:
            category = Category(**cat_data)
            db.add(category)
        
        db.commit()
        print("✅ Categories seeded successfully!")
    except Exception as e:
        print(f"Error seeding categories: {e}")
        db.rollback()
    finally:
        db.close()


# Seed categories on startup
seed_categories()

# Initialize FastAPI app
app = FastAPI(
    title="SmartFinance API",
    description="Personal expense tracker API with data visualization",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://smartfinance-five.vercel.app",
        "https://smartfinance-3uhb.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(transactions.router)
app.include_router(dashboard.router)
app.include_router(categories.router)


@app.get("/api/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "message": "SmartFinance API is running"
    }


@app.get("/")
def root():
    """Root endpoint with API info."""
    return {
        "name": "SmartFinance API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }

