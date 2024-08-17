import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Additional user info */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
