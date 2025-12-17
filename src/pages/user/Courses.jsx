import React, { useEffect, useState } from "react";
import Sidebar from "../../includes/Sidebar";
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch courses created by admin
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/courses",
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

  // 2️⃣ Register for course
  const registerCourse = async (courseId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/registrations",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      alert("Course registered. Waiting for approval.");
    } catch (err) {
      alert("You already registered for this course.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />

        <div class="body-wrapper">
          <Header />
          <div class="body-wrapper-inner" >
            <div className="container-fluid">
              <h4>Available Courses</h4>

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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
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
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => registerCourse(course.id)}
                        >
                          Register
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
      </div>
    </>
  )
}

export default Courses