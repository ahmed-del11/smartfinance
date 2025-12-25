import { useState, useEffect } from 'react';
import { getTransactions, getCategories, createTransaction, deleteTransaction } from '../../services/api';
import TransactionForm from './TransactionForm';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [dateFilter, setDateFilter] = useState({
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch categories first (doesn't need filters)
            const catRes = await getCategories();
            console.log('Categories response:', catRes.data);
            setCategories(catRes.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }

        try {
            // Fetch transactions with filters (only include non-empty filters)
            const params = {};
            if (dateFilter.start_date) params.start_date = dateFilter.start_date;
            if (dateFilter.end_date) params.end_date = dateFilter.end_date;

            const transRes = await getTransactions(params);
            console.log('Transactions response:', transRes.data);
            setTransactions(transRes.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = () => {
        setLoading(true);
        fetchData();
    };

    const handleAddTransaction = async (data) => {
        try {
            await createTransaction(data);
            setShowForm(false);
            fetchData();
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await deleteTransaction(id);
                fetchData();
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getCategoryById = (id) => {
        return categories.find(c => c.id === id) || {};
    };

    return (
        <div className="transactions-page">
            <div className="page-header">
                <h1>Transactions</h1>
                <button className="btn-add" onClick={() => setShowForm(true)}>
                    + Add Transaction
                </button>
            </div>

            <div className="filters">
                <div className="filter-group">
                    <label>From:</label>
                    <input
                        type="text"
                        value={dateFilter.start_date}
                        onChange={(e) => setDateFilter({ ...dateFilter, start_date: e.target.value })}
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                    />
                </div>
                <div className="filter-group">
                    <label>To:</label>
                    <input
                        type="text"
                        value={dateFilter.end_date}
                        onChange={(e) => setDateFilter({ ...dateFilter, end_date: e.target.value })}
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                    />
                </div>
                <button className="btn-filter" onClick={handleFilter}>Apply Filter</button>
            </div>

            {loading ? (
                <div className="loading">Loading transactions...</div>
            ) : (
                <div className="transactions-list">
                    {transactions.length === 0 ? (
                        <div className="no-transactions">
                            <p>No transactions found.</p>
                            <p>Click "Add Transaction" to get started!</p>
                        </div>
                    ) : (
                        transactions.map((transaction) => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-icon" style={{ backgroundColor: transaction.category?.color || '#6B7280' }}>
                                    {transaction.category?.icon || '💵'}
                                </div>
                                <div className="transaction-details">
                                    <span className="transaction-description">
                                        {transaction.description || transaction.category?.name}
                                    </span>
                                    <span className="transaction-category">{transaction.category?.name}</span>
                                </div>
                                <div className="transaction-date">{formatDate(transaction.date)}</div>
                                <div className={`transaction-amount ${transaction.category?.type}`}>
                                    {transaction.category?.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
                                </div>
                                <button className="btn-delete" onClick={() => handleDelete(transaction.id)}>
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {showForm && (
                <TransactionForm
                    categories={categories}
                    onSubmit={handleAddTransaction}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default Transactions;
