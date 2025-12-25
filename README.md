# 💰 SmartFinance - Expense Tracker

A full-stack personal finance application built with **Python (FastAPI)** and **React.js** featuring data visualization.

![SmartFinance](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800)

## ✨ Features

- 📊 **Dashboard** - View total income, expenses, and balance at a glance
- 📈 **Visual Analytics** - Interactive pie chart showing expense breakdown by category
- 💸 **Transaction Management** - Add, filter, and delete income/expenses
- 📅 **Date Filtering** - Filter transactions by custom date ranges
- 🔐 **Secure Authentication** - JWT-based user authentication

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js 18, React Router v6, Recharts |
| **Backend** | Python, FastAPI |
| **Database** | PostgreSQL with SQLAlchemy ORM |
| **Auth** | JWT tokens, bcrypt password hashing |
| **HTTP Client** | Axios |

## 📁 Project Structure

```
smartfinance/
├── backend/
│   ├── app/
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── routers/      # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── config.py     # Settings
│   │   ├── database.py   # DB connection
│   │   └── main.py       # FastAPI app
│   ├── seed.py           # Database seeder
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── context/      # Auth context
    │   ├── pages/        # Login/Register
    │   ├── services/     # API layer
    │   └── App.jsx
    └── package.json
```

## 📊 Database Schema

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Users     │     │   Transactions   │     │  Categories  │
├─────────────┤     ├──────────────────┤     ├──────────────┤
│ id (PK)     │◄────│ user_id (FK)     │     │ id (PK)      │
│ username    │     │ category_id (FK) │────►│ name         │
│ email       │     │ amount           │     │ type         │
│ password    │     │ date             │     │ icon         │
│ created_at  │     │ description      │     │ color        │
└─────────────┘     └──────────────────┘     └──────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- PostgreSQL (or SQLite for quick start)
- Node.js v18+

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database URL

# Seed database with categories
python seed.py

# Run server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/summary` | Income, expenses, balance |
| GET | `/api/dashboard/chart` | Expense chart data |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | List transactions (with filters) |
| POST | `/api/transactions` | Create transaction |
| DELETE | `/api/transactions/{id}` | Delete transaction |

## 🧪 Demo Credentials

```
Email: demo@smartfinance.com
Password: demo123
```

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/smartfinance
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
```

## 👨‍💻 Author

**Ahmed Ramadan** - Full-Stack Developer

## 📄 License

MIT License - feel free to use this project for your portfolio!
