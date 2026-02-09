import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
      data-sidebar-position="fixed" data-header-position="fixed">
      <SideBar role="admin" />

      <div className="body-wrapper">
        <Header />

        <div className="body-wrapper-inner p-4">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <div>
                <h2 className="fw-bold text-gradient mb-1">Student Management</h2>
                <p className="text-muted">Overview of all registered users and their academic status</p>
              </div>
              <div className="d-flex gap-3">
                <div className="premium-card px-4 py-2 border-0 bg-white shadow-sm rounded-pill d-flex align-items-center gap-2">
                  <span className="small text-muted fw-bold text-uppercase">Total Users:</span>
                  <span className="fw-bold text-primary">{users.length}</span>
                </div>
              </div>
            </div>

            <div className="premium-card border-0 overflow-hidden shadow-lg animate-up">
              <div className="p-4 border-bottom bg-light bg-opacity-50">
                <h5 className="fw-bold mb-0 text-dark">User Directory</h5>
              </div>

              <div className="table-responsive">
                <table className="table mb-0 align-middle">
                  <thead className="bg-white">
                    <tr>
                      <th className="ps-4 py-4 text-muted small fw-bold text-uppercase border-0">Identity</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Contact Info</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Role</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0 text-center">Registrations</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="py-5 text-center">
                          <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                          <span className="text-muted">Loading student directory...</span>
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-5 text-center">
                          <i className="ti ti-users-off fs-10 text-muted opacity-25 mb-2 d-block"></i>
                          <p className="text-muted mb-0">No users found in the system</p>
                        </td>
                      </tr>
                    ) : (
                      users.map((u, index) => (
                        <tr key={u.id} className="border-bottom hover-bg-light transition-all border-light">
                          <td className="ps-4 py-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="rounded-circle bg-primary-light text-primary d-flex align-items-center justify-content-center fw-bold" style={{ width: 38, height: 38, fontSize: '13px' }}>
                                {u.name.charAt(0)}
                              </div>
                              <span className="fw-bold text-dark">{u.name}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="small text-muted font-monospace">{u.email}</span>
                          </td>
                          <td className="py-4">
                            <span className={`badge px-3 py-2 rounded-pill fw-bold small ${u.role === "admin" ? "bg-danger bg-opacity-10 text-danger" : "bg-primary bg-opacity-10 text-primary"}`}>
                              {u.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className="badge bg-success-light text-success px-3 py-1 rounded-pill fw-bold">
                              {u.course_count} Courses
                            </span>
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

export default Users;
