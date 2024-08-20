import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context'; // Ensure the correct path to the AuthContext
import '../components/Sidebar.css';
import  avatar  from "../assets/6858504.png"
import "../App.css"
const Sidebar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src={avatar} alt="Profile Icon" />
        <p>{user?.name}</p> {/* Display the username from the AuthContext */}
      </div>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/income">Income</Link></li>
          <li><button className='logout_btn' onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
