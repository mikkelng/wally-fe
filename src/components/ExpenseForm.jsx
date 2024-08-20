import { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, expense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setCategory(expense.category);
      setDescription(expense.description);
      setDate(expense.date);
    }
  }, [expense]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newExpense = { amount, category, description, date };
    onSubmit(newExpense);
    setAmount('');
    setCategory('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button className='exp_btn' type="submit">Save Expense</button>
    </form>
  );
};

export default ExpenseForm;
