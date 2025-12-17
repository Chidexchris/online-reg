import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar"
import Header from "../../includes/Header";
import axios from "axios";
import { getToken } from "../../utils/auth";

function Pending() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/pending",
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
        `http://localhost:5000/api/admin/approve/${id}`,
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
    <div className="page-wrapper" id="main-wrapper">
      <SideBar />
      <div className="body-wrapper">
        <Header />

        <div className="body-wrapper-inner">
          <div className="container-fluid">
            <h4 className="mb-3">Pending Course Registrations</h4>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Unit</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pending.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No pending registrations
                      </td>
                    </tr>
                  ) : (
                    pending.map((p, i) => (
                      <tr key={p.id}>
                        <td>{i + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.title}</td>
                        <td>{p.unit}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => approveCourse(p.id)}
                          >
                            Approve
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
  );
}

export default Pending;
