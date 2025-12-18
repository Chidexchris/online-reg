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
      const res = await fetch("https://courson.up.railway.app/api/auth/register", {
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
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <Link
                    to="/"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <img
                      src="../assets/images/logos/logo.svg"
                      alt="logo"
                    />
                  </Link>

                  <p className="text-center">Your Social Campaigns</p>

                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                    >
                      Sign Up
                    </button>

                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">
                        Already have an Account?
                      </p>
                      <Link
                        className="text-primary fw-bold ms-2"
                        to="/login"
                      >
                        Sign In
                      </Link>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
