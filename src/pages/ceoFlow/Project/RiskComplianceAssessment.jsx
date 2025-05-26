import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Spinner } from "react-bootstrap";

import Swal from "sweetalert2";
import { uploadRiskData } from "../../../store/slice/Ceo/riskSlice";
import { useNavigate } from "react-router-dom";
import { getProjectDetailsAction } from "../../../store/actions/Ceo/ceoprojectAction";

const RiskComplianceAssessment = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.risk);
  const { data } = useSelector((state) => state.auth.activeUser);
  const token = data?.accessToken;
  const isAuthenticated = !!token;

  const [uploadingForId, setUploadingForId] = useState(null);
  const [localProjectId, setLocalProjectId] = useState(null);
  const [uploadedRisks, setUploadedRisks] = useState({});

  const projectId = localStorage.getItem("projectId");

  // Initial risk data
  const initialRisks = [
    {
      id: 1,
      category: "Complete excavation and concrete laying",
      status: "Pending",
      file: null,
    },
    {
      id: 2,
      category: "Environmental Clearance",
      status: "Pending",
      file: null,
    },
    {
      id: 3,
      category: "Labor Safety Measures",
      status: "Pending",
      file: null,
    },
    {
      id: 4,
      category: "PPE Compliance Checklists",
      status: "Pending",
      file: null,
    },
    {
      id: 5,
      category: "Legal Dispute Files",
      status: "Pending",
      file: null,
    },
  ];

  // Initialize formData.risks with initial data if not already present
  useEffect(() => {
    if (!formData.risks || formData.risks.length === 0) {
      setFormData((prev) => ({
        ...prev,
        risks: initialRisks,
      }));
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      getProjectsData(projectId);
    }
  }, [projectId]);

  const getProjectsData = async (projectId) => {
    try {
      const result = await dispatch(getProjectDetailsAction(projectId));
      const riskDetails = result?.payload?.value?.risk_management_data;
      console.log("Risk Details===>", riskDetails);

      if (Array.isArray(riskDetails) && riskDetails.length > 0) {
        const risks = riskDetails.map((item) => ({
          riskId: item.risk_id,
          category: item.category_name,
          status: item.risk_status,
          file: { name: item.image_url }, // simulate file with name
          id: item.risk_id,
          dbId: item.risk_id,
        }));
        console.log("Processed risks =>", risks);

        setFormData((prev) => ({
          ...prev,
          risks, // Use backend data if available
        }));
      } else {
        // If no backend data, keep initial risks
        console.warn("No valid risk details found, using initial data.");
        setFormData((prev) => ({
          ...prev,
          risks: prev.risks || initialRisks,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error);
      // On error, ensure we have initial data
      setFormData((prev) => ({
        ...prev,
        risks: prev.risks || initialRisks,
      }));
    }
  };

  const handleAddRow = () => {
    const newRisk = {
      id:
        formData.risks.length > 0
          ? Math.max(...formData.risks.map(r => r.id)) + 1
          : 1,
      category: "",
      status: "",
      file: null,
    };

    setFormData((prev) => ({
      ...prev,
      risks: [...prev.risks, newRisk],
    }));
  };

  useEffect(() => {
    if (!isAuthenticated || !token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "You need to be logged in to access this feature.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
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
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in first.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
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
        title: "Uploading...",
        text: `Uploading ${risk.category} file`,
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      if (!risk.file || !(risk.file instanceof File) || risk.file.size === 0) {
        Swal.close();
        Swal.fire({
          icon: "warning",
          title: "Invalid file. Please select a valid file.",
        });
        return;
      }

      const riskData = {
        riskId: risk.dbId || 0,
        category: String(risk.category).trim(),
        status: String(risk.status).trim(),
        projectId: parseInt(localProjectId),
        file: risk.file,
        id: risk.id,
      };

      const resultAction = await dispatch(uploadRiskData(riskData));
      Swal.close();
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.close();
      Swal.fire({ icon: "error", title: "Upload Failed" });
    }
  };

  return (
    <div className="form-section risk-container">
      <h2 className="section-title">Risk & Compliance Assessment</h2>
      <table className="tbl mt-4 w-100 table table-bordered">
        <thead>
          <tr>
            <th className="text-center text-dark fs-18-500">S. No</th>
            <th className="text-center text-dark fs-18-500">Category</th>
            <th className="text-center text-dark fs-18-500">Status</th>
            <th className="text-center text-dark fs-18-500 w280">File</th>
          </tr>
        </thead>
        <tbody>
          {(formData.risks || []).map((risk, index) => (
            <tr key={risk.id}>
              <td className="text-center text-dark-gray fs-16-400 ">
                {index + 1}
              </td>
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
              <td className="text-center text-dark-gray fs-16-500 w180">
                <Form.Select
                  value={risk.status}
                  onChange={(e) => handleStatusChange(risk.id, e.target.value)}
                  size="sm"
                >
                  <option value="">Select Status</option>
                  <option value="Completed">✅ Completed</option>
                  <option value="Pending">⚠ Pending</option>
                </Form.Select>
              </td>
              <td className="text-center w280">
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
                  {risk.file?.name || risk.file || "Upload"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end mt-3">
        <Button
          className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          onClick={handleAddRow}
        >
          + Add Row
        </Button>
      </div>
    </div>
  );
};

export default RiskComplianceAssessment;