import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/images/logos/logo.svg";
import Courses from "../pages/user/Courses";
import { logout } from "../utils/auth";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCloseSidebar = () => {
    const mainWrapper = document.getElementById('main-wrapper');
    if (mainWrapper) {
      mainWrapper.classList.remove('show-sidebar');
    }
  };

  return (
    <>
      <aside className="left-sidebar top-0">
        <div>
          {/* Brand Logo */}
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link to="/" className="text-nowrap logo-img">
              <img src={logo} alt="logo" />
            </Link>

            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
              onClick={handleCloseSidebar}
            >
              <i className="ti ti-x fs-6"></i>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Home</span>
              </li>

              {/* Dashboard */}
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/" aria-expanded="false">
                  <i className="ti ti-atom"></i>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>

              {/* Courses */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  to="/Courses"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-aperture"></i>
                    </span>
                    <span className="hide-menu">Courses</span>
                  </div>
                </Link>
              </li>

              {/* My Registration */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  to="/my-registrations"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-shopping-cart"></i>
                    </span>
                    <span className="hide-menu">My Registration</span>
                  </div>
                </Link>
              </li>

              {/* Profile */}
              <li className="sidebar-item">
                <Link className="sidebar-link justify-content-between" to="/profile">
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-layout-grid"></i>
                    </span>
                    <span className="hide-menu">Profile</span>
                  </div>
                </Link>
              </li>

              {/* Logout */}
              <li className="sidebar-item">
                <button
                  className="sidebar-link justify-content-between bg-transparent border-0 w-100 text-start"
                  onClick={handleLogout}
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="hide-menu">Log out</span>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
