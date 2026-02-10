import React from 'react'
import Header from '../../includes/Header'
import Sidebar from '../../components/SideBar'

function Dashboard() {
  const stats = [
    {
      title: "Total Courses",
      value: 48,
      icon: "ti ti-book",
    },
    {
      title: "Registered Students",
      value: 12,
      icon: "ti ti-users",
    },
    {
      title: "Pending Approvals",
      value: 3,
      icon: "ti ti-clock",
    },
    {
      title: "Units Active",
      value: 18,
      icon: "ti ti-layout-grid",
    },
  ];

  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar role="admin" />

        <div className="body-wrapper">
          <Header />

          <div className="body-wrapper-inner p-4">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between mb-5">
                <div>
                  <h2 className="fw-bold text-gradient mb-1">Administrative Overview</h2>
                  <p className="text-muted">Monitor registrations and system performance</p>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn-premium py-2 px-3 shadow-sm rounded-pill">
                    <i className="ti ti-plus me-2"></i>New Course
                  </button>
                </div>
              </div>

              <div className="row g-4 mb-5">
                {stats.map((item, index) => (
                  <div className="col-md-6 col-lg-3" key={index}>
                    <div className="premium-card p-4 d-flex align-items-center gap-4">
                      <div className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 56, height: 56, backgroundColor: 'var(--primary-light)' }}>
                        <i className={`${item.icon} fs-7 text-primary`}></i>
                      </div>
                      <div>
                        <p className="mb-0 text-muted small fw-bold text-uppercase">{item.title}</p>
                        <h3 className="mb-0 fw-bold">{item.value}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="premium-card">
                    <div className="card-body p-3 p-md-5">
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h4 className="fw-bold mb-0">System Activity</h4>
                        <div className="d-flex gap-3">
                          <select className="form-select border-0 bg-light rounded-3 px-3 py-2 cursor-pointer shadow-none">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-3 p-md-5 border-dashed rounded-3 text-center border-2 bg-light bg-opacity-10">
                        <i className="ti ti-chart-area-line fs-10 text-muted opacity-25 mb-3 d-block"></i>
                        <h5 className="text-muted">Analytical charts are being updated...</h5>
                      </div>
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
