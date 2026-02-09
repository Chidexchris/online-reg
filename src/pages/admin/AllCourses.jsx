import React, { useState } from "react";
import Header from '../../includes/Header'
import SideBar from '../../components/SideBar'

function MyRegistration() {
  const [registered, setRegistered] = useState([
    { id: 1, code: "CST101", title: "Intro to Computer Science", unit: 3 },
    { id: 2, code: "MTH102", title: "Calculus I", unit: 4 },
  ]);

  const handleDrop = (id) => {
    setRegistered(registered.filter((course) => course.id !== id));
    console.log("Dropped course with ID:", id);

  };

  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
        data-sidebar-position="fixed" data-header-position="fixed">
        <SideBar />

        <div className="body-wrapper">
          <Header />

          <div class="body-wrapper-inner" >
            <div className="container-fluid">
              <h4 className="mb-3">My Registered Courses</h4>

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Unit</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {registered.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          You have not registered for any course.
                        </td>
                      </tr>
                    ) : (
                      registered.map((course, index) => (
                        <tr key={course.id}>
                          <td>{index + 1}</td>
                          <td>{course.code}</td>
                          <td>{course.title}</td>
                          <td>{course.unit}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDrop(course.id)}
                            >
                              Drop
                            </button>
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
    </div >
    </>
  )
}

export default MyRegistration
