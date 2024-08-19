import { useState, useEffect } from 'react';

const IncomeForm = ({ onSubmit, income }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setCategory(income.category);
      setDescription(income.description);
      setDate(income.date);
    }
  }, [income]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newIncome = { amount, category, description, date };
    onSubmit(newIncome);
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
      <button type="submit">Save Income</button>
    </form>
  );
};

export default IncomeForm;
