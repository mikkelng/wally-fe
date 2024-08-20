import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import './Expenses.css';
import { API_URL } from "../config";

// Example colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const { data } = await axios.get(`${API_URL}/api/expenses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expense data:', error);
        }
    };

    const handleAddExpense = async (newExpense) => {
        try {
            const token = localStorage.getItem('authToken');
            const { data } = await axios.post(
                `${API_URL}/api/expenses`,
                newExpense,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setExpenses([...expenses, data]);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleEditExpense = async (updatedExpense) => {
        try {
            const token = localStorage.getItem('authToken');
            const { data } = await axios.put(
                `${API_URL}/api/expenses/${editingExpense._id}`,
                updatedExpense,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setExpenses(
                expenses.map((expense) =>
                    expense._id === data._id ? data : expense
                )
            );
            setEditingExpense(null);
        } catch (error) {
            console.error('Error editing expense:', error);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${API_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Calculate the total expense amount and categories
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const expenseData = expenses.map(expense => ({
        name: expense.category,
        value: expense.amount
    }));

    return (
        <div className="expense-page">
            <h1>Expense Tracker</h1>

            <ExpenseForm
                expense={editingExpense}
                onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
                onCancel={() => setEditingExpense(null)}
            />

            <div className="expense-content">
                <div className="expense-list">
                    <h2>Expense List</h2>
                    {expenses.length === 0 ? (
                        <p>No expense entries available.</p>
                    ) : (
                        <ul>
                            {expenses.map((expense) => (
                                <li key={expense._id}>
                                    <p>
                                        <strong>Amount:</strong> ${expense.amount}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {expense.category}
                                    </p>
                                    <p>
                                        <strong>Description:</strong> {expense.description}
                                    </p>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(expense.date).toLocaleDateString()}
                                    </p>
                                    <button
                                        className="list_btn"
                                        onClick={() => setEditingExpense(expense)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="list_btn"
                                        onClick={() => handleDeleteExpense(expense._id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {expenses.length > 0 && (
                    <div className="expense-chart">
                        <PieChart width={200} height={140}> {/* Chart dimensions */}
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={60}
                                fill="#8884d8"
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <p className="total-expenses">Total Expenses: ${totalExpense.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expense;
