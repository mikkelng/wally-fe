import { useState, useEffect } from 'react';

const IncomeForm = ({ onSubmit, income }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setSource(income.source);
      setDescription(income.description);
      setDate(income.date);
    }
  }, [income]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newIncome = { amount, source, description, date };
    onSubmit(newIncome);
    setAmount('');
    setSource('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Save Income</button>
    </form>
  );
};

export default IncomeForm;
