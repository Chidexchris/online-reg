import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../utils/auth";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      setToken(res.data.token);

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-background">
      <div className="card premium-card p-5" style={{ width: 450 }}>
        <h2 className="text-center mb-4 text-gradient font-weight-bold">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Please enter your details to sign in</p>

        {error && <div className="alert alert-danger border-0 shadow-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label font-weight-bold small text-uppercase tracking-wider">Email Address</label>
            <input
              className="form-control"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label font-weight-bold small text-uppercase tracking-wider">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-premium w-100 mt-2">Sign In</button>
        </form>

        <p className="text-center mt-4 mb-0">
          Don't have an account? <Link to="/register" className="text-primary font-weight-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
