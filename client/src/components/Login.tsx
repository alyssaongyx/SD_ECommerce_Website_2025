import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiRequest";
import "../Signup_Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    try {
      const response = await apiRequest("users", "POST", "login", {
        email: email,
        password: password,
      });
      if (response.success) {
        localStorage.setItem("token", response.data.token); //Ensure JWT bearer token is stored in the local storage after logging in
        console.log("Login successful:", response.data);
        navigate("/home");
      } else {
        setErrorMessage("Incorrect Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="main-container">
      {/* Left Section: Logo */}
      <div className="logo-section">
        <div className="logo-box">"ELEOS"</div>
      </div>

      {/* Right Section: Form */}
      <div className="form-container">
        {" "}
        {/* New parent class */}
        <div className="tab-buttons">
          <button
            className="button button-tab-login-on"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="button button-tab-signup-off"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin} className="button confirm-button">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Login;