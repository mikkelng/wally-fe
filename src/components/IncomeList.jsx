

const IncomeList = ({ incomeList, onEdit, onDelete }) => {
  return (
    <ul>
      {incomeList.map((income) => (
        <li key={income._id}>
          <span>{income.category} - ${income.amount}</span>
          <button onClick={() => onEdit(income)}>Edit</button>
          <button onClick={() => onDelete(income._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default IncomeList;
