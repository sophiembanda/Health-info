import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form className="login-form">
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
