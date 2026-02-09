import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../includes/Header";
import { getToken } from "../../utils/auth";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin form state
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [error, setError] = useState("");

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/courses", {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Add new course (ADMIN)
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setError("");

    if (!code || !title || !unit) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ code, title, unit })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add course");
        return;
      }

      // Update UI
      setCourses((prev) => [...prev, data]);
      setShowForm(false);
      setCode("");
      setTitle("");
      setUnit("");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
      data-sidebar-position="fixed" data-header-position="fixed">
      <SideBar role="admin" />

      <div className="body-wrapper">
        <Header />

        <div className="body-wrapper-inner p-4">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold text-gradient mb-1">Course Catalog</h2>
                <p className="text-muted">Manage academic offerings and course units</p>
              </div>

              <button
                className="btn-premium py-2 px-4 shadow-sm rounded-pill"
                onClick={() => setShowForm(!showForm)}
              >
                <i className={`ti ${showForm ? 'ti-x' : 'ti-plus'} me-2`}></i>
                {showForm ? 'Cancel' : 'Add New Course'}
              </button>
            </div>

            {/* ADD COURSE FORM */}
            {showForm && (
              <div className="premium-card mb-5 border-0 shadow-lg animate-up">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-primary-light p-2 rounded-3 text-primary">
                      <i className="ti ti-book-upload fs-6"></i>
                    </div>
                    <h4 className="fw-bold mb-0">Define New Course</h4>
                  </div>

                  {error && <div className="alert alert-danger border-0 shadow-sm mb-4">{error}</div>}

                  <form onSubmit={handleAddCourse}>
                    <div className="row g-4">
                      <div className="col-md-4">
                        <label className="form-label small fw-bold text-uppercase text-muted px-1">Course Code</label>
                        <input
                          className="form-control rounded-3 border-0 bg-light p-3"
                          placeholder="e.g. CS101"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        <label className="form-label small fw-bold text-uppercase text-muted px-1">Course Title</label>
                        <input
                          className="form-control rounded-3 border-0 bg-light p-3"
                          placeholder="e.g. Introduction to Programming"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label small fw-bold text-uppercase text-muted px-1">Credit Units</label>
                        <input
                          type="number"
                          className="form-control rounded-3 border-0 bg-light p-3"
                          placeholder="3"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-5 d-flex justify-content-end">
                      <button className="btn-premium px-5 py-3 shadow-none">Save Course Configuration</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* COURSES TABLE */}
            <div className="premium-card border-0 overflow-hidden">
              <div className="p-4 border-bottom bg-light bg-opacity-50">
                <h5 className="fw-bold mb-0">Academic Inventory</h5>
              </div>
              <div className="table-responsive">
                <table className="table mb-0 align-middle">
                  <thead className="bg-white">
                    <tr>
                      <th className="ps-4 py-4 text-muted small fw-bold text-uppercase border-0">#</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Code</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Title</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0 text-center">Unit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="py-5 text-center">
                          <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                          <span className="text-muted">Loading inventory...</span>
                        </td>
                      </tr>
                    ) : courses.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-5 text-center">
                          <i className="ti ti-database-off d-block fs-8 text-muted opacity-25 mb-2"></i>
                          <p className="text-muted mb-0">No courses registered yet</p>
                        </td>
                      </tr>
                    ) : (
                      courses.map((course, index) => (
                        <tr key={course.id} className="border-bottom hover-bg-light transition-all">
                          <td className="ps-4 py-4 fw-bold text-muted">{index + 1}</td>
                          <td className="py-4">
                            <span className="badge bg-primary-light text-primary px-3 py-2 rounded-3 fw-bold">{course.code}</span>
                          </td>
                          <td className="py-4 fw-bold">{course.title}</td>
                          <td className="py-4 text-center">
                            <span className="fw-bold text-secondary">{course.unit}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
