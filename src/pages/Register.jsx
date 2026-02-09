import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Successful registration → go to login
      navigate("/login");
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="auth-background">
      <div className="card premium-card p-5" style={{ width: 450 }}>
        <div className="brand-logo d-flex align-items-center justify-content-center mb-4 gap-2">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 35, height: 35 }}>
            <i className="ti ti-school text-white fs-5"></i>
          </div>
          <h4 className="mb-0 text-gradient fw-bolder">OnlineReg</h4>
        </div>

        <h3 className="text-center mb-2 font-weight-bold">Create Account</h3>
        <p className="text-center text-muted mb-4">Join our learning community today</p>

        {error && <div className="alert alert-danger border-0 shadow-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label font-weight-bold small text-uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold small text-uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label font-weight-bold small text-uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-premium w-100 mt-2">Sign Up</button>
        </form>

        <div className="text-center mt-4">
          <p className="mb-0">
            Already have an account? <Link className="text-primary font-weight-bold ms-1" to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
