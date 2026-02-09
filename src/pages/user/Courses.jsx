import React, { useEffect, useState } from "react";
import Sidebar from "../../includes/Sidebar";
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses created by admin
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/courses",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Register for course
  const registerCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5001/api/courses/${courseId}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      alert("Registration request submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Error during registration");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
                  <h2 className="fw-bold text-gradient mb-1">Available Courses</h2>
                  <p className="text-muted">Enroll in available units for the current semester</p>
                </div>
                <div className="bg-light p-1 rounded-pill d-flex gap-2 pe-3 align-items-center shadow-sm">
                  <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold">SEM 2</span>
                  <span className="text-muted small fw-bold">2025 ACADEMIC YEAR</span>
                </div>
              </div>

              <div className="row g-4">
                {loading ? (
                  <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-3 text-muted fw-semibold">Loading course catalog...</p>
                  </div>
                ) : courses.length === 0 ? (
                  <div className="col-12">
                    <div className="premium-card p-5 text-center">
                      <div className="mb-3">
                        <i className="ti ti-mood-empty fs-10 text-muted opacity-25"></i>
                      </div>
                      <h4 className="text-dark fw-bold">No Courses Available</h4>
                      <p className="text-muted">There are no courses open for registration at the moment.</p>
                    </div>
                  </div>
                ) : (
                  courses.map((course, index) => (
                    <div className="col-md-6 col-lg-4" key={course.id}>
                      <div className="premium-card h-100 border-0 shadow-sm hover-shadow transition-all overflow-hidden d-flex flex-column">
                        <div className="p-4 bg-light bg-opacity-50 border-bottom d-flex justify-content-between align-items-center">
                          <span className="badge bg-white text-primary shadow-sm border fw-bold">{course.code}</span>
                          <span className="small text-muted fw-bold">
                            <i className="ti ti-layout-grid me-1"></i>{course.unit} Units
                          </span>
                        </div>
                        <div className="p-4 d-flex flex-column flex-grow-1">
                          <div className="mb-4">
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <i className="ti ti-book text-primary opacity-50"></i>
                              <span className="text-uppercase small fw-bold text-muted tracking-wide">Course Title</span>
                            </div>
                            <h5 className="fw-bold text-dark lh-base">{course.title}</h5>
                          </div>

                          <div className="mt-auto">
                            <button
                              className="btn btn-premium w-100 rounded-pill py-2 shadow-sm"
                              onClick={() => registerCourse(course.id)}
                            >
                              <i className="ti ti-circle-plus me-2"></i>Enroll Now
                            </button>
                          </div>
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
    </>
  );
}

export default Courses;
