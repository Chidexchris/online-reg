import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center premium-card p-5 shadow-lg border-0" style={{ maxWidth: '450px' }}>
        <div className="mb-4">
          <div className="bg-danger bg-opacity-10 text-danger d-inline-block p-4 rounded-circle mb-3">
            <i className="ti ti-shield-lock fs-10"></i>
          </div>
          <h2 className="fw-bold text-dark mb-2">Access Denied</h2>
          <p className="text-muted">You do not have the required administrative permissions to view this resource.</p>
        </div>
        <div className="d-grid gap-2">
          <Link to="/" className="btn-premium py-3 rounded-pill shadow-none text-decoration-none d-flex align-items-center justify-content-center">
            <i className="ti ti-arrow-left me-2"></i>Return to Student Dashboard
          </Link>
          <Link to="/login" className="btn btn-light py-3 rounded-pill border-0 text-dark fw-bold small text-decoration-none">
            <i className="ti ti-login me-2"></i>Switch Account
          </Link>
        </div>
        <div className="mt-4 pt-3 border-top border-light">
          <p className="small text-muted mb-0">Security ID: <span className="font-monospace text-uppercase">Err_Auth_Forbidden</span></p>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
