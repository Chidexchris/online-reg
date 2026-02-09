import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/images/logos/logo.svg";
import Courses from "../pages/user/Courses";

function Sidebar() {
  return (
    <>
      <aside className="left-sidebar top-0">
        <div>
          {/* Brand Logo */}
          <div className="brand-logo d-flex align-items-center justify-content-between p-4 px-9 mt-2">
            <Link to="/" className="text-nowrap logo-img d-flex align-items-center gap-2 text-decoration-none">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center shadow-soft" style={{ width: 38, height: 38 }}>
                <i className="ti ti-school text-white fs-5"></i>
              </div>
              <h3 className="mb-0 text-gradient fw-bolder tracking-tight">RegPortal</h3>
            </Link>

            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
              <i className="ti ti-x fs-6"></i>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav scroll-sidebar p-3" data-simplebar="">
            <ul id="sidebarnav" className="list-unstyled">
              <li className="nav-small-cap px-4 py-2 text-uppercase fw-bold small text-muted opacity-75">
                <span className="hide-menu">Main Menu</span>
              </li>

              {/* Dashboard */}
              <li className="sidebar-item mb-1">
                <Link className="sidebar-link d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition-all active-link" to="/admin/dashboard" aria-expanded="false">
                  <i className="ti ti-layout-dashboard fs-5"></i>
                  <span className="hide-menu">Overview</span>
                </Link>
              </li>

              <li className="nav-small-cap px-4 py-2 mt-3 text-uppercase fw-bold small text-muted opacity-75">
                <span className="hide-menu">Course Management</span>
              </li>

              {/* Courses */}
              <li className="sidebar-item mb-1">
                <Link
                  className="sidebar-link d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none transition-all"
                  to="/admin/courses"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <i className="ti ti-books fs-5"></i>
                    <span className="hide-menu">Course Catalog</span>
                  </div>
                </Link>
              </li>

              <li className="sidebar-item mb-1">
                <Link
                  className="sidebar-link d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none transition-all"
                  to="/admin/pending"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <i className="ti ti-clipboard-check fs-5"></i>
                    <span className="hide-menu">Registration Approvals</span>
                  </div>
                </Link>
              </li>

              <li className="nav-small-cap px-4 py-2 mt-3 text-uppercase fw-bold small text-muted opacity-75">
                <span className="hide-menu">Administrative</span>
              </li>

              <li className="sidebar-item mb-1">
                <Link
                  className="sidebar-link d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none transition-all"
                  to="/admin/students"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <i className="ti ti-user-plus fs-5"></i>
                    <span className="hide-menu">Student Database</span>
                  </div>
                </Link>
              </li>

              <li className="nav-small-cap px-4 py-2 mt-4 text-uppercase fw-bold small text-muted opacity-75">
                <span className="hide-menu">User Account</span>
              </li>

              {/* Logout */}
              <li className="sidebar-item">
                <Link className="sidebar-link d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition-all text-danger" to="/login" onClick={() => localStorage.clear()}>
                  <i className="ti ti-power fs-5"></i>
                  <span className="hide-menu">Sign Out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
