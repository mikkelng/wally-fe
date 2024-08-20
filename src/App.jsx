import { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./contexts/Auth.context";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";  
import IsPrivate from "./components/IsPrivate";
import Sidebar from "./components/Sidebar";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="app-container">
      {isLoggedIn && <Sidebar />}
      <div className={`logsign_ctn ${isLoggedIn ? 'with-sidebar' : 'full-width'}`}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <Profile />
              </IsPrivate>
            }
          />
          <Route
            path="/expenses"
            element={
              <IsPrivate>
                <Expenses /> 
              </IsPrivate>
            }
          />
          <Route
            path="/income"
            element={
              <IsPrivate>
                <Income /> 
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
