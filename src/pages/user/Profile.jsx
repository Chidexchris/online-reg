import React from "react";
import Sidebar from '../../includes/Sidebar'
import Header from '../../includes/Header'

function Profile() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Department of Informatics",
    studentId: "STD-2025-001X",
    phone: "+234 901 234 5678",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=edf2ff&color=4e73df&size=256&bold=true"
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
      data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar role="student" />

      <div className="body-wrapper">
        <Header />

        <div className="body-wrapper-inner p-4">
          <div className="container-fluid">
            {/* Header Banner */}
            <div className="premium-card overflow-hidden shadow-lg border-0 mb-5 position-relative" style={{ minHeight: '200px' }}>
              <div className="position-absolute w-100 h-100 bg-primary" style={{ opacity: 0.1 }}></div>
              <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(90deg, var(--primary) 0%, #60a5fa 100%)', opacity: 0.9 }}></div>
              <div className="position-absolute top-0 end-0 p-5 opacity-25 text-white">
                <i className="ti ti-school fs-10"></i>
              </div>
            </div>

            <div className="row g-4" style={{ marginTop: '-100px' }}>
              {/* Profile Identify Card */}
              <div className="col-lg-4">
                <div className="premium-card p-0 text-center shadow-lg border-0 animate-up overflow-hidden h-100">
                  <div className="p-5 pb-4">
                    <div className="position-relative d-inline-block mb-4">
                      <img
                        src={user.avatar}
                        alt="profile"
                        className="rounded-circle shadow-lg border border-4 border-white"
                        width="140"
                        height="140"
                      />
                      <button className="btn btn-primary rounded-circle position-absolute bottom-0 end-0 p-2 shadow-sm border border-2 border-white" style={{ width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="ti ti-camera small"></i>
                      </button>
                    </div>

                    <h4 className="fw-bold text-dark mb-1">{user.name}</h4>
                    <p className="text-muted small fw-bold text-uppercase mb-4">{user.department}</p>

                    <div className="d-flex justify-content-center gap-2 mb-4">
                      <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill fw-bold small">Semester 2</span>
                      <span className="badge bg-success-light text-success px-3 py-2 rounded-pill fw-bold small">Active</span>
                    </div>

                    <div className="d-grid gap-2">
                      <button className="btn-premium py-2 px-3 rounded-pill shadow-none fw-bold small">
                        <i className="ti ti-edit me-2"></i>Edit Profile
                      </button>
                    </div>
                  </div>

                  <div className="bg-light bg-opacity-50 p-4 border-top">
                    <div className="row text-center">
                      <div className="col-4 border-end">
                        <h5 className="fw-bold mb-0">3.8</h5>
                        <small className="text-muted small fw-bold text-uppercase">GPA</small>
                      </div>
                      <div className="col-4 border-end">
                        <h5 className="fw-bold mb-0">45</h5>
                        <small className="text-muted small fw-bold text-uppercase">Credits</small>
                      </div>
                      <div className="col-4">
                        <h5 className="fw-bold mb-0">12</h5>
                        <small className="text-muted small fw-bold text-uppercase">Rank</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Details - Improved Layout */}
              <div className="col-lg-8">
                <div className="premium-card p-5 shadow-lg border-0 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-5">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary-light p-2 rounded-3 text-primary">
                        <i className="ti ti-id-badge-2 fs-6"></i>
                      </div>
                      <h4 className="fw-bold mb-0 text-dark">Student Information</h4>
                    </div>
                    <button className="btn btn-light rounded-circle shadow-none p-2 text-muted">
                      <i className="ti ti-dots-vertical"></i>
                    </button>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="p-3 border rounded-3 h-100 hover-shadow transition-all">
                        <small className="text-uppercase fw-bold text-muted small mb-1 d-block">Full Name</small>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ti ti-user text-primary opacity-50"></i>
                          <span className="fw-bold text-dark">{user.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 border rounded-3 h-100 hover-shadow transition-all">
                        <small className="text-uppercase fw-bold text-muted small mb-1 d-block">Student ID</small>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ti ti-hash text-primary opacity-50"></i>
                          <span className="fw-bold text-dark font-monospace">{user.studentId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="p-3 border rounded-3 h-100 hover-shadow transition-all">
                        <small className="text-uppercase fw-bold text-muted small mb-1 d-block">Email Address</small>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ti ti-mail text-primary opacity-50"></i>
                          <span className="fw-bold text-dark">{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 border rounded-3 h-100 hover-shadow transition-all">
                        <small className="text-uppercase fw-bold text-muted small mb-1 d-block">Department</small>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ti ti-building text-primary opacity-50"></i>
                          <span className="fw-bold text-dark">{user.department}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 border rounded-3 h-100 hover-shadow transition-all">
                        <small className="text-uppercase fw-bold text-muted small mb-1 d-block">Phone Number</small>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ti ti-phone text-primary opacity-50"></i>
                          <span className="fw-bold text-dark">{user.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 p-4 bg-primary-light rounded-3 d-flex align-items-center gap-3">
                    <i className="ti ti-shield-lock text-primary fs-6"></i>
                    <div>
                      <h6 className="fw-bold text-dark mb-0">Privacy & Security</h6>
                      <small className="text-muted fw-bold">Your data is visible only to you and academic administrators.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
