import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar"
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { API_URL } from "../../config";

function Pending() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/pending`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      setPending(res.data);
    } catch (err) {
      console.error("Failed to load pending courses", err);
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      fetchPending();
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  useEffect(() => {
    fetchPending();
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
                <h2 className="fw-bold text-gradient mb-1">Pending Approvals</h2>
                <p className="text-muted">Review and authorize student course enrollments</p>
              </div>
              <div className="bg-primary-light text-primary px-4 py-2 rounded-pill fw-bold shadow-sm">
                <i className="ti ti-history me-2"></i>Queue Status: {pending.length} Requests
              </div>
            </div>

            <div className="row g-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-3 text-muted fw-semibold">Loading enrollment requests...</p>
                </div>
              ) : pending.length === 0 ? (
                <div className="col-12">
                  <div className="premium-card p-5 text-center">
                    <div className="mb-3">
                      <i className="ti ti-circle-check fs-10 text-success opacity-25"></i>
                    </div>
                    <h4 className="text-dark fw-bold">All Caught Up!</h4>
                    <p className="text-muted">There are no pending enrollment requests at this time.</p>
                  </div>
                </div>
              ) : (
                pending.map((p) => (
                  <div className="col-md-6 col-lg-4" key={p.id}>
                    <div className="premium-card p-4 h-100 d-flex flex-column border-0 shadow-sm hover-shadow transition-all">
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: 48, height: 48, fontSize: '18px' }}>
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">{p.name}</h6>
                          <p className="mb-0 small text-muted">{p.email}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-light rounded-3 mb-4">
                        <label className="text-uppercase small fw-bold text-muted mb-2 d-block">Requesting Enrollment</label>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="fw-bold mb-0 text-primary">{p.title}</h6>
                            <span className="small text-muted fw-bold">Unit Load: {p.unit}</span>
                          </div>
                          <span className="badge bg-white text-primary shadow-sm border">{p.code}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <button
                          className="btn btn-premium w-100 rounded-pill py-2 shadow-sm"
                          onClick={() => approveCourse(p.id)}
                        >
                          <i className="ti ti-check me-2"></i>Authorize
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

export default Pending;
