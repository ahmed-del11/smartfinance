import { useState, useEffect } from 'react';
import { getDashboardSummary, getExpenseChart } from '../../services/api';
import ExpenseChart from './ExpenseChart';
import './Dashboard.css';

const Dashboard = () => {
    const [summary, setSummary] = useState({
        total_income: 0,
        total_expenses: 0,
        balance: 0
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [summaryRes, chartRes] = await Promise.all([
                getDashboardSummary(),
                getExpenseChart()
            ]);
            setSummary(summaryRes.data);
            setChartData(chartRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="summary-cards">
                <div className="summary-card income">
                    <div className="card-icon">💰</div>
                    <div className="card-content">
                        <span className="card-label">Total Income</span>
                        <span className="card-value">{formatCurrency(summary.total_income)}</span>
                    </div>
                </div>

                <div className="summary-card expenses">
                    <div className="card-icon">💸</div>
                    <div className="card-content">
                        <span className="card-label">Total Expenses</span>
                        <span className="card-value">{formatCurrency(summary.total_expenses)}</span>
                    </div>
                </div>

                <div className={`summary-card balance ${parseFloat(summary.balance) >= 0 ? 'positive' : 'negative'}`}>
                    <div className="card-icon">📊</div>
                    <div className="card-content">
                        <span className="card-label">Balance</span>
                        <span className="card-value">{formatCurrency(summary.balance)}</span>
                    </div>
                </div>
            </div>

            <div className="chart-section">
                <ExpenseChart data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
