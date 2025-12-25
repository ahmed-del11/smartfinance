# SmartFinance - Personal Expense Tracker

A full-stack personal finance application built with Python (FastAPI) and React.js featuring interactive data visualization for tracking income and expenses.

![SmartFinance](https://img.shields.io/badge/SmartFinance-Personal%20Finance-blue)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)

---

## Features

- **Dashboard** - View total income, expenses, and balance at a glance
- **Visual Analytics** - Interactive pie chart showing expense breakdown by category
- **Transaction Management** - Add, filter, and delete income/expenses
- **Date Filtering** - Filter transactions by custom date ranges
- **Secure Authentication** - JWT-based user authentication
- **SAR Currency Support** - Built with Saudi Riyal currency

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js 18, React Router v6, Recharts, Vite |
| Backend | Python, FastAPI, Uvicorn |
| Database | SQLite / PostgreSQL with SQLAlchemy ORM |
| Auth | JWT tokens, Passlib password hashing |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Project Structure

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

---

## Database Schema

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

---

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js v18+
- PostgreSQL (optional - SQLite works for development)

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

---

## API Endpoints

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

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |

---

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=sqlite:///./smartfinance.db
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Live Demo

- **Frontend:** [smartfinance-3uhb.vercel.app](https://smartfinance-3uhb.vercel.app)
- **Backend API:** [smartfinance-15n2.onrender.com](https://smartfinance-15n2.onrender.com)

---

## Contact

**Ahmed Ramadan** - Full-Stack Developer

- Portfolio: [portfolio-rouge-ten-k3hf1ebs9e.vercel.app](https://portfolio-rouge-ten-k3hf1ebs9e.vercel.app)
- GitHub: [@ahmed-del11](https://github.com/ahmed-del11)
- LinkedIn: [ahmed-ramadan-9641ba211](https://www.linkedin.com/in/ahmed-ramadan-9641ba211)

---

## License

MIT License - feel free to use this project for learning and your portfolio!

---

If you found this project helpful, please give it a star!
