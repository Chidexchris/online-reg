import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { API_URL } from "../../config";

function Registered() {
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistered = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/registered`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      setRegistered(res.data);
    } catch (err) {
      console.error("Failed to load registered students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistered();
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
                <h2 className="fw-bold text-gradient mb-1">Approved Enrollments</h2>
                <p className="text-muted">Comprehensive list of all authorized course registrations</p>
              </div>
              <div className="bg-success-light text-success px-4 py-2 rounded-pill fw-bold shadow-sm">
                <i className="ti ti-checklist me-2"></i>Total Approved: {registered.length}
              </div>
            </div>

            <div className="premium-card border-0 overflow-hidden shadow-lg animate-up">
              <div className="p-4 border-bottom bg-light bg-opacity-50">
                <h5 className="fw-bold mb-0 text-dark">Enrollment Master List</h5>
              </div>

              <div className="table-responsive">
                <table className="table mb-0 align-middle">
                  <thead className="bg-white">
                    <tr>
                      <th className="ps-4 py-4 text-muted small fw-bold text-uppercase border-0">Student</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Email</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Course Code</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0">Course Title</th>
                      <th className="py-4 text-muted small fw-bold text-uppercase border-0 text-center">Unit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="py-5 text-center">
                          <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                          <span className="text-muted">Loading authorized records...</span>
                        </td>
                      </tr>
                    ) : registered.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-5 text-center">
                          <div className="p-5">
                            <i className="ti ti-folder-off fs-10 text-muted opacity-25 mb-2 d-block"></i>
                            <h5 className="text-muted">No approved enrollments found.</h5>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      registered.map((r, i) => (
                        <tr key={i} className="border-bottom hover-bg-light transition-all border-light">
                          <td className="ps-4 py-4">
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-primary text-white rounded-circle p-1 d-flex align-items-center justify-content-center fw-bold" style={{ width: 30, height: 30, fontSize: '11px' }}>{r.name.charAt(0)}</div>
                              <span className="fw-bold text-dark">{r.name}</span>
                            </div>
                          </td>
                          <td className="py-4 font-monospace small text-muted">
                            {r.email}
                          </td>
                          <td className="py-4">
                            <span className="badge bg-primary-light text-primary fw-bold px-2 py-1">{r.code}</span>
                          </td>
                          <td className="py-4 fw-bold">
                            {r.title}
                          </td>
                          <td className="py-4 text-center fw-bold text-secondary">
                            {r.unit}
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

export default Registered;
