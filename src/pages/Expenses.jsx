import { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Sidebar from '../components/Sidebar';
import '../App.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetch('/api/expenses')
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error('Failed to fetch expenses:', err));
  }, []);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setTotalExpenses(total);
  }, [expenses]);

  const handleAddExpense = (expense) => {
    fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    })
      .then((response) => response.json())
      .then((newExpense) => setExpenses([...expenses, newExpense]))
      .catch((err) => console.error('Failed to add expense:', err));
  };

  const handleEditExpense = (updatedExpense) => {
    fetch(`/api/expenses/${selectedExpense._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpense),
    })
      .then((response) => response.json())
      .then((newExpense) => {
        setExpenses(expenses.map((expense) => (expense._id === newExpense._id ? newExpense : expense)));
        setSelectedExpense(null);
      })
      .catch((err) => console.error('Failed to update expense:', err));
  };

  const handleDeleteExpense = (id) => {
    fetch(`/api/expenses/${id}`, { method: 'DELETE' })
      .then(() => setExpenses(expenses.filter((expense) => expense._id !== id)))
      .catch((err) => console.error('Failed to delete expense:', err));
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Expenses</h1>
        <h2>Total Expenses: ${totalExpenses}</h2>
        <ExpenseForm onSubmit={selectedExpense ? handleEditExpense : handleAddExpense} expense={selectedExpense} />
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onEdit={setSelectedExpense} />
      </div>
    </div>
  );
};

export default Expenses;
