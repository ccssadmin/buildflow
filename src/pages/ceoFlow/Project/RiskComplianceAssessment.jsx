import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Spinner } from "react-bootstrap";
import { GoAlertFill } from "react-icons/go";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { uploadRiskData } from "../../../store/slice/Ceo/riskSlice";
import { useNavigate } from "react-router-dom";

const RiskComplianceAssessment = ({ formData, handleAddColumn, setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.risk);
  const { data } = useSelector((state) => state.auth.activeUser);
  const token = data?.accessToken;
  const isAuthenticated = !!token;

  const [uploadingForId, setUploadingForId] = useState(null);
  const [localProjectId, setLocalProjectId] = useState(null);
  const [uploadedRisks, setUploadedRisks] = useState({});

  useEffect(() => {
    if (!isAuthenticated || !token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "You need to be logged in to access this feature.",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  }, [isAuthenticated, token, navigate]);

  useEffect(() => {
    const getProjectId = () => {
      if (formData && formData.projectId) {
        setLocalProjectId(formData.projectId);
        return formData.projectId;
      }
      const storedId = localStorage.getItem("projectId");
      if (storedId) {
        setLocalProjectId(parseInt(storedId));
        if (!formData.projectId) {
          setFormData((prev) => ({
            ...prev,
            projectId: parseInt(storedId),
          }));
        }
        return parseInt(storedId);
      }
      console.error("No project ID found");
      return null;
    };
    getProjectId();
  }, [formData, setFormData]);

  const handleFileChange = async (riskId, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedRisks = formData.risks.map((risk) => {
        if (risk.id === riskId) {
          return { ...risk, file };
        }
        return risk;
      });
      setFormData((prev) => ({ ...prev, risks: updatedRisks }));
      setUploadingForId(null);
      const risk = updatedRisks.find((r) => r.id === riskId);
      await handleUpload(risk);
    }
  };

  const handleStatusChange = async (riskId, newStatus) => {
    const updatedRisks = formData.risks.map((risk) => {
      if (risk.id === riskId) {
        return { ...risk, status: newStatus };
      }
      return risk;
    });
    setFormData((prev) => ({ ...prev, risks: updatedRisks }));


  };

  const handleUpload = async (risk) => {
    if (!isAuthenticated || !token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in first.",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (!risk.category?.trim()) {
      Swal.fire({ icon: "warning", title: "Category Name is required." });
      return;
    }

    if (!risk.status?.trim()) {
      Swal.fire({ icon: "warning", title: "Status is required." });
      return;
    }

    if (!risk.file) {
      Swal.fire({ icon: "warning", title: "File is missing." });
      return;
    }

    if (!localProjectId) {
      Swal.fire({ icon: "warning", title: "Project ID missing." });
      return;
    }

    try {
      Swal.fire({
        title: 'Uploading...',
        text: `Uploading ${risk.category} file`,
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      // Add more explicit validation and logging here
      console.log("Before Upload - Risk Data:", {
        id: risk.id,
        category: risk.category,
        status: risk.status,
        file: risk.file ? { name: risk.file.name, size: risk.file.size, type: risk.file.type } : null,
        projectId: localProjectId
      });

      // Validate file
      if (!risk.file || !(risk.file instanceof File) || risk.file.size === 0) {
        Swal.close();
        Swal.fire({ icon: "warning", title: "Invalid file. Please select a valid file." });
        return;
      }

      // Create payload with explicit typing
      const riskData = {
        riskId: risk.dbId || 0,
        category: String(risk.category).trim(),
        status: String(risk.status).trim(),
        projectId: parseInt(localProjectId),
        file: risk.file,
        id: risk.id
      };

      console.log("Final payload being sent to dispatch:", riskData);

      const resultAction = await dispatch(uploadRiskData(riskData));
      Swal.close();

      // Rest of the function...
    } catch (error) {
      // Error handling...
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Risk & Compliance Assessment</h2>
      <table className="tbl mt-4 w-100 table table-bordered">
        <thead>
          <tr>
            <th className="text-center text-dark fs-18-500">S. No</th>
            <th className="text-center text-dark fs-18-500">Category</th>
            <th className="text-center text-dark fs-18-500">Status</th>
            <th className="text-center text-dark fs-18-500">File</th>
            {/* <th>Upload</th> */}
          </tr>
        </thead>
        <tbody>
          {formData.risks.map((risk) => (
            <tr key={risk.id}>
              <td className="text-center text-dark-gray fs-16-400 ">{String(risk.id).padStart(2, "0")}</td>
              <td className="text-center text-dark-gray fs-16-500">
                <Form.Control
                  type="text"
                  value={risk.category}
                  onChange={(e) => {
                    const updatedRisks = formData.risks.map((r) =>
                      r.id === risk.id ? { ...r, category: e.target.value } : r
                    );
                    setFormData((prev) => ({ ...prev, risks: updatedRisks }));
                  }}
                  size="sm"
                />
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <Form.Select
                  value={risk.status}
                  onChange={(e) => handleStatusChange(risk.id, e.target.value)}
                  size="sm"
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </td>
              <td>
                <input
                  type="file"
                  id={`file-input-${risk.id}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(risk.id, e)}
                />
                <Button
                  variant="link"
                  onClick={() => {
                    document.getElementById(`file-input-${risk.id}`).click();
                  }}
                >
                  {risk.file ? risk.file.name : "Upload"}
                </Button>
              </td>
              {/* <td>
                {uploadedRisks[risk.id] ? (
                  <Button variant="success" disabled className="btn-sm">
                    <FaCheckCircle /> Done
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="btn-sm"
                    disabled={loading === risk.id || !risk.file}
                    onClick={() => handleUpload(risk)}
                  >
                    {loading === risk.id ? (
                      <><Spinner size="sm" animation="border" /> Uploading...</>
                    ) : (
                      <><FaUpload /> Upload</>
                    )}
                  </Button>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end mt-3">
        <Button className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto" onClick={handleAddColumn}>
          + Add Row
        </Button>
      </div>
    </div>
  );
};

export default RiskComplianceAssessment;
