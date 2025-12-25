import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ExpenseChart.css';

const ExpenseChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="expense-chart">
                <h3>Expenses by Category</h3>
                <div className="chart-empty">
                    <p>No expense data to display yet.</p>
                    <p>Add some transactions to see the breakdown!</p>
                </div>
            </div>
        );
    }

    // Transform data for Recharts
    const chartData = data.map(item => ({
        name: item.category,
        value: parseFloat(item.amount),
        color: item.color
    }));

    const renderCustomLabel = ({ name, percent }) => {
        return `${name}: ${(percent * 100).toFixed(0)}%`;
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{data.name}</p>
                    <p className="tooltip-value">${data.value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="expense-chart">
            <h3>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        paddingAngle={3}
                        label={renderCustomLabel}
                        labelLine={true}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span style={{ color: '#e0e0e0' }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
