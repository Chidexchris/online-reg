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
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link to="/" className="text-nowrap logo-img">
              <img src={logo} alt="logo" />
            </Link>

            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
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
                <Link className="sidebar-link" to="/admin/dashboard  " aria-expanded="false">
                  <i className="ti ti-atom"></i>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>

              {/* Courses */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between has-arrow"
                  to="#"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-layout-grid"></i>
                    </span>
                    <span className="hide-menu">Courses</span>
                  </div>
                </Link>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <Link
                      className="sidebar-link justify-content-between"
                      to="/admin/registered"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="round-16 d-flex align-items-center justify-content-center">
                          <i className="ti ti-circle"></i>
                        </div>
                        <span className="hide-menu">Registrated</span>
                      </div>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link
                      className="sidebar-link justify-content-between"
                      to="/admin/pending"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="round-16 d-flex align-items-center justify-content-center">
                          <i className="ti ti-circle"></i>
                        </div>
                        <span className="hide-menu">Pending</span>
                      </div>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link
                      className="sidebar-link justify-content-between"
                      to="/admin/courses"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="round-16 d-flex align-items-center justify-content-center">
                          <i className="ti ti-circle"></i>
                        </div>
                        <span className="hide-menu">All Courses</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* My Registration */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  to="/MyRegistration"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-shopping-cart"></i>
                    </span>
                    <span className="hide-menu">Students</span>
                  </div>
                </Link>
              </li>

              

              {/* Logout */}
              <li className="sidebar-item">
                <Link className="sidebar-link justify-content-between" to="#">
                  <div className="d-flex align-items-center gap-3">
                    <span className="hide-menu">Log out</span>
                  </div>
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
