import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../utils/auth";

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
        "https://courson.up.railway.app/api/auth/login",
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
    <div className="page-wrapper">
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card p-4" style={{ width: 400 }}>
          <h4 className="text-center mb-3">Login</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100">Login</button>
          </form>

          <p className="text-center mt-3">
            No account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
