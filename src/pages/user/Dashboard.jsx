import React from 'react'
import Header from '../../includes/Header'
import Sidebar from '../../includes/Sidebar'

function Dashboard() {
  const stats = [
    {
      title: "Available Courses",
      value: 48,
      icon: "ti ti-book",
    },
    {
      title: "My Registrations",
      value: 12,
      icon: "ti ti-checkbox",
    },
    {
      title: "Credits Earned",
      value: 5,
      icon: "ti ti-award",
    },
    {
      title: "Pending Status",
      value: 3,
      icon: "ti ti-clock",
    },
  ];

  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar role="student" />

        <div className="body-wrapper">
          <Header />

          <div className="body-wrapper-inner p-4">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between mb-5">
                <div>
                  <h2 className="fw-bold text-gradient mb-1">Student Dashboard</h2>
                  <p className="text-muted">Track your progress and course registrations</p>
                </div>
                <div>
                  <button className="btn-premium py-2 px-4 shadow-sm rounded-pill">
                    <i className="ti ti-search me-2"></i>Find Courses
                  </button>
                </div>
              </div>

              <div className="row g-4 mb-5">
                {stats.map((item, index) => (
                  <div className="col-md-6 col-lg-3" key={index}>
                    <div className="premium-card p-4 d-flex align-items-center gap-4 border-0 shadow-sm hover-translate transition-all">
                      <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: 64, height: 64, backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                        <i className={`${item.icon} fs-7`}></i>
                      </div>
                      <div>
                        <p className="mb-1 text-muted small fw-bold text-uppercase tracking-wider">{item.title}</p>
                        <h3 className="mb-0 fw-bolder text-dark">{item.value}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-lg-8">
                  <div className="premium-card h-100 border-0 shadow-lg">
                    <div className="card-body p-3 p-md-5">
                      <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="fw-bold mb-0 text-dark">My Academic Journey</h4>
                        <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill fw-bold small">Semester 2 / 2025</span>
                      </div>

                      <div className="position-relative ps-4 border-start border-2 border-primary border-opacity-25 ms-2">
                        <div className="mb-5 position-relative">
                          <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-primary border border-4 border-white shadow-sm" style={{ width: 16, height: 16, left: '-2px' }}></div>
                          <h6 className="fw-bold text-primary mb-1">Registration Opens</h6>
                          <p className="text-muted small mb-0">January 15, 2025</p>
                        </div>
                        <div className="mb-5 position-relative">
                          <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-success border border-4 border-white shadow-sm" style={{ width: 16, height: 16, left: '-2px' }}></div>
                          <h6 className="fw-bold text-dark mb-1">Course Selection</h6>
                          <p className="text-success small fw-bold mb-0"><i className="ti ti-check me-1"></i>Completed</p>
                        </div>
                        <div className="mb-5 position-relative">
                          <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-warning border border-4 border-white shadow-sm" style={{ width: 16, height: 16, left: '-2px' }}></div>
                          <h6 className="fw-bold text-dark mb-1">Academic Approval</h6>
                          <p className="text-warning small fw-bold mb-0">In Progress</p>
                        </div>
                        <div className="position-relative">
                          <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-light border border-4 border-white shadow-sm" style={{ width: 16, height: 16, left: '-2px' }}></div>
                          <h6 className="fw-bold text-muted mb-1">Semester Exams</h6>
                          <p className="text-muted small mb-0">Coming May 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="premium-card h-100 border-0 shadow-lg bg-primary text-white position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 p-3 opacity-10">
                      <i className="ti ti-trophy fs-10"></i>
                    </div>
                    <div className="card-body p-3 p-md-5 position-relative z-index-1">
                      <h4 className="fw-bold text-white mb-4">Student Status</h4>
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="bg-white bg-opacity-25 p-3 rounded-circle text-white">
                          <i className="ti ti-star fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0 text-white">Good Standing</h6>
                          <small className="text-white text-opacity-75">GPA: 3.8/4.0</small>
                        </div>
                      </div>
                      <hr className="border-white opacity-25 my-4" />
                      <p className="text-white text-opacity-75 small mb-4">You are on track for the Dean's List this semester. Keep up the great work!</p>
                      <button className="btn btn-white text-primary fw-bold w-100 rounded-pill shadow-sm">View Transcript</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
