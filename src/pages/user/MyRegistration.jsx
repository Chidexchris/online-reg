import React, { useEffect, useState } from "react";
import Sidebar from "../../includes/Sidebar";
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";

function MyRegistration() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/courses/my",
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load registered courses");
    } finally {
      setLoading(false);
    }
  };

  const dropCourse = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw from this course? This action cannot be undone.")) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/courses/${id}/drop`,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      fetchMyCourses();
    } catch (err) {
      alert("Error dropping course.");
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
      data-sidebar-position="fixed" data-header-position="fixed" >
      <Sidebar role="student" />
      <div className="body-wrapper">
        <Header />
        <div className="body-wrapper-inner p-4">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <div>
                <h2 className="fw-bold text-gradient mb-1">My Registrations</h2>
                <p className="text-muted">Monitor and manage your enrolled academic units</p>
              </div>
              <div className="d-flex gap-3">
                <div className="premium-card px-4 py-2 border-0 bg-white shadow-sm rounded-pill d-flex align-items-center gap-2">
                  <span className="small text-muted fw-bold">TOTAL UNITS:</span>
                  <span className="fw-bold text-primary">{courses.reduce((acc, curr) => acc + (curr.status === 'approved' ? Number(curr.unit) : 0), 0)}</span>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-3 text-muted fw-semibold">Loading your registration history...</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="col-12">
                  <div className="premium-card p-5 text-center">
                    <div className="mb-3">
                      <i className="ti ti-notes-off fs-10 text-muted opacity-25"></i>
                    </div>
                    <h4 className="text-dark fw-bold">No Registrations Found</h4>
                    <p className="text-muted">You haven't registered for any courses yet. Go to "Find Courses" to get started.</p>
                  </div>
                </div>
              ) : (
                courses.map((c, i) => (
                  <div className="col-md-6 col-lg-6" key={c.id}>
                    <div className={`premium-card h-100 border-0 shadow-sm hover-shadow transition-all overflow-hidden d-flex flex-column position-relative ${c.status === 'approved' ? 'border-start border-5 border-success' : 'border-start border-5 border-warning'}`}>
                      <div className="p-4 d-flex justify-content-between align-items-start bg-light bg-opacity-25">
                        <div>
                          <span className="badge bg-white text-dark shadow-sm border fw-bold mb-2">{c.code}</span>
                          <h5 className="fw-bold text-dark lh-base mb-1">{c.title}</h5>
                          <span className="small text-muted fw-bold">
                            <i className="ti ti-layout-grid me-1"></i>{c.unit} Units
                          </span>
                        </div>
                        <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm ${c.status === 'approved' ? 'bg-success text-white' : 'bg-warning text-white'}`} style={{ width: 40, height: 40 }}>
                          <i className={`ti ${c.status === 'approved' ? 'ti-check' : 'ti-clock'} fs-5`}></i>
                        </div>
                      </div>

                      <div className="p-4 d-flex align-items-center justify-content-between mt-auto border-top border-light">
                        <div>
                          <small className="text-uppercase fw-bold text-muted small d-block mb-1">Status</small>
                          <span className={`badge px-3 py-1 rounded-pill fw-bold small ${c.status === "approved" ? "bg-success bg-opacity-10 text-success" : "bg-warning bg-opacity-10 text-warning"}`}>
                            {c.status.toUpperCase()}
                          </span>
                        </div>
                        <button
                          className="btn btn-outline-danger py-2 px-3 shadow-none rounded-pill small fw-bold border-0 bg-danger bg-opacity-10 text-danger hover-bg-danger"
                          onClick={() => dropCourse(c.id)}
                        >
                          <i className="ti ti-trash me-2"></i>Drop
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRegistration;
