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
        "http://localhost:5000/api/registrations/my",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
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
    if (!window.confirm("Drop this course?")) return;

    await axios.delete(
      `http://localhost:5000/api/registrations/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    fetchMyCourses();
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  
  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />

        <div className="body-wrapper">
          <Header />

          <div class="body-wrapper-inner" >
            <div className="container-fluid">
              <h4 className="mb-3">My Registered Courses</h4>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No registered courses
                    </td>
                  </tr>
                ) : (
                  courses.map((c, i) => (
                    <tr key={c.id}>
                      <td>{i + 1}</td>
                      <td>{c.code}</td>
                      <td>{c.title}</td>
                      <td>{c.unit}</td>
                      <td>
                        <span
                          className={`badge ${
                            c.status === "approved"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => dropCourse(c.id)}
                        >
                          Drop
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
            </div>
          </div>
      </div>
    </div >
    </>
  )
}

export default MyRegistration