

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id}>
          <span>{expense.description} - ${expense.amount}</span>
          <button onClick={() => onEdit(expense)}>Edit</button>
          <button onClick={() => onDelete(expense._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
