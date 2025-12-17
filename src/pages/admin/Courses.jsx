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

  // 🔹 Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses", {
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

  // 🔹 Add new course (ADMIN)
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setError("");

    if (!code || !title || !unit) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
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
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <SideBar />

      <div className="body-wrapper">
        <Header />

        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Courses</h4>

            {/* ADMIN BUTTON */}
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              Add Course
            </button>
          </div>

          {/* ADD COURSE FORM */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="mb-3">Add New Course</h5>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleAddCourse}>
                  <div className="mb-3">
                    <label>Course Code</label>
                    <input
                      className="form-control"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Course Title</label>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Unit</label>
                    <input
                      type="number"
                      className="form-control"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-success">Save Course</button>
                </form>
              </div>
            </div>
          )}

          {/* COURSES TABLE */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Unit</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No courses available
                    </td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <tr key={course.id}>
                      <td>{index + 1}</td>
                      <td>{course.code}</td>
                      <td>{course.title}</td>
                      <td>{course.unit}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
