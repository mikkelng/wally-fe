import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    const userToLogin = { email, password };

    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/login",
        userToLogin
      );
      console.log("successfully logged in", data);
      localStorage.setItem("authToken", data.authToken);
      await authenticateUser();
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login with us</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <p>
        Sign up now! <Link to="/">Signup</Link>
      </p>
    </div>
  );
};
export default Login;