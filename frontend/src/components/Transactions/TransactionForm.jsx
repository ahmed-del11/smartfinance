import { useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ categories, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        category_id: ''
    });
    const [transactionType, setTransactionType] = useState('expense');
    const [loading, setLoading] = useState(false);

    const filteredCategories = categories.filter(c => c.type === transactionType);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await onSubmit({
            ...formData,
            amount: parseFloat(formData.amount),
            category_id: parseInt(formData.category_id)
        });

        setLoading(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="transaction-form" onClick={(e) => e.stopPropagation()}>
                <h2>Add Transaction</h2>

                <div className="type-toggle">
                    <button
                        className={`type-btn ${transactionType === 'expense' ? 'active expense' : ''}`}
                        onClick={() => {
                            setTransactionType('expense');
                            setFormData({ ...formData, category_id: '' });
                        }}
                        type="button"
                    >
                        Expense
                    </button>
                    <button
                        className={`type-btn ${transactionType === 'income' ? 'active income' : ''}`}
                        onClick={() => {
                            setTransactionType('income');
                            setFormData({ ...formData, category_id: '' });
                        }}
                        type="button"
                    >
                        Income
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Amount ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            required
                        >
                            <option value="">Select category...</option>
                            {filteredCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description (optional)</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter description..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
