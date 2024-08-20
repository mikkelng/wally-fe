import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Logsignin.css"
import { API_URL } from "../config";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = { name: username, email, password };

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/signup`,
        newUser
      );
      console.log("successfully signed up", data);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signup with us!</h1>
      <form className="txt_field" onSubmit={handleSignUp}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="logsign_btn">Sign Up</button>
      </form>
      <p>
        Login with the button on the right! <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
export default SignUp;
