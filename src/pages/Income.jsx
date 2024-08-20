import { useState, useEffect } from "react";
import axios from "axios";
import IncomeForm from "../components/IncomeForm";
import "./Income.css";
import { API_URL } from "../config";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.get(`${API_URL}/api/income`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(data);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const handleAddIncome = async (newIncome) => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.post(
        `${API_URL}/api/income`,
        newIncome,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIncomes([...incomes, data]);
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const handleEditIncome = async (updatedIncome) => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.put(
        `${API_URL}/api/income/${editingIncome._id}`,
        updatedIncome,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIncomes(
        incomes.map((income) => (income._id === data._id ? data : income))
      );
      setEditingIncome(null);
    } catch (error) {
      console.error("Error editing income:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(incomes.filter((income) => income._id !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  return (
    <div className="income-page">
      <h1>Income Tracker</h1>

      <IncomeForm
        income={editingIncome}
        onSubmit={editingIncome ? handleEditIncome : handleAddIncome}
        onCancel={() => setEditingIncome(null)}
      />

      <div className="income-list">
        <h2>Income List</h2>
        {incomes.length === 0 ? (
          <p>No income entries available.</p>
        ) : (
          <ul>
            {incomes.map((income) => (
              <li key={income._id}>
                <p>
                  <strong>Amount:</strong> ${income.amount}
                </p>
                <p>
                  <strong>Category:</strong> {income.category}
                </p>
                <p>
                  <strong>Description:</strong> {income.description}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(income.date).toLocaleDateString()}
                </p>
                <button
                  onClick={() => {
                    setEditingIncome(income);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteIncome(income._id)}>
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

export default Income;
