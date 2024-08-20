import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import "../App.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {user ? (
        <div>
          <h3>Username:</h3>
          <p>{user.name}</p>
         
          <h3>Email: </h3>
          <p>{user.email}</p>
   
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
