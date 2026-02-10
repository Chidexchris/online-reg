import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

function Header() {
  const navigate = useNavigate();
  const { triggerLoading } = useLoading();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    const mainWrapper = document.getElementById('main-wrapper');
    if (mainWrapper) {
      if (window.innerWidth < 1200) {
        mainWrapper.classList.toggle('show-sidebar');
      } else {
        mainWrapper.classList.toggle('mini-sidebar');
        if (mainWrapper.classList.contains('mini-sidebar')) {
          mainWrapper.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
          mainWrapper.setAttribute('data-sidebartype', 'full');
        }
      }
    }
  };

  return (
    <>
      <header className="app-header position-sticky top-0 glass shadow-sm" style={{ zIndex: 10 }}>
        <nav className="navbar navbar-expand-lg navbar-light px-4 py-3">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item d-block d-xl-none">
              <button
                className="nav-link sidebartoggler p-2 rounded-circle border-0 bg-transparent"
                id="headerCollapse"
                onClick={handleSidebarToggle}
              >
                <i className="ti ti-menu-2 fs-6"></i>
              </button>
            </li>
            <li className="nav-item d-none d-lg-block">
              <div className="input-group bg-light rounded-pill px-3" style={{ width: 300 }}>
                <span className="input-group-text bg-transparent border-0"><i className="ti ti-search text-muted"></i></span>
                <input type="text" className="form-control bg-transparent border-0 small" placeholder="Search resources..." style={{ boxShadow: 'none' }} />
              </div>
            </li>
            <li className="nav-item d-none d-lg-block ms-3">
              <button
                className="btn btn-light rounded-circle shadow-none p-2"
                onClick={() => triggerLoading(1500)}
                title="Refresh Data"
              >
                <i className="ti ti-refresh text-primary"></i>
              </button>
            </li>
          </ul>

          <div className="navbar-collapse justify-content-end px-0 d-flex" id="navbarNav">
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end gap-3">
              <li className="nav-item dropdown">
                <a className="nav-link p-2 bg-light rounded-circle shadow-none" href="#" id="drop1" data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
                  <i className="ti ti-bell-ringing fs-5 text-primary"></i>
                  <div className="notification bg-danger rounded-circle position-absolute" style={{ width: 8, height: 8, top: 8, right: 8, border: '2px solid white' }}></div>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link d-flex align-items-center gap-2 p-1 pe-3 bg-light rounded-pill shadow-none" href="#" id="drop2" data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
                  <img src="../assets/images/profile/user-1.jpg" alt="" width="32" height="32" className="rounded-circle shadow-sm" />
                  <span className="small fw-bold text-dark d-none d-md-block">My Account</span>
                  <i className="ti ti-chevron-down small text-muted"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end premium-card border-0 p-3 mt-2 shadow-lg animate-up">
                  <div className="message-body">
                    <Link to="/profile" className="d-flex align-items-center gap-3 py-2 px-3 dropdown-item rounded-3">
                      <i className="ti ti-user fs-5 text-primary"></i>
                      <p className="mb-0 small fw-semibold">View Profile</p>
                    </Link>
                    <Link to="/settings" className="d-flex align-items-center gap-3 py-2 px-3 dropdown-item rounded-3">
                      <i className="ti ti-settings fs-5 text-secondary"></i>
                      <p className="mb-0 small fw-semibold">Settings</p>
                    </Link>
                    <hr className="my-2 opacity-50" />
                    <button onClick={handleLogout} className="btn btn-outline-danger w-100 mt-2 py-2 rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-bold small">
                      Log Out
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
