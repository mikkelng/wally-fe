import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import "./Expenses.css";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.get("http://localhost:5005/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "http://localhost:5005/api/expenses",
        newExpense,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses([...expenses, data]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEditExpense = async (updatedExpense) => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.put(
        `http://localhost:5005/api/expenses/${editingExpense._id}`,
        updatedExpense,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(
        expenses.map((expense) => (expense._id === data._id ? data : expense))
      );
      setEditingExpense(null);
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5005/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="expense-page">
      <h1>Expense Tracker</h1>

      <ExpenseForm
        expense={editingExpense}
        onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
        onCancel={() => setEditingExpense(null)}
      />

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
                  onClick={() => {
                    setEditingExpense(expense);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteExpense(expense._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Expense;
