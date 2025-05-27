import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getVendorsAndSubcontractors } from "../../../store/actions/vendor/getvendoraction";
import { fetchRoles } from "../../../store/actions/hr/designationaction";
import MultipleSelect from "../../../components/DropDown/MultipleSelect";
import {
  getEmployeeRoles,
  getNewBoqId,
  upsertBoq,
} from "../../../store/actions/Engineer/upsertboqaction";
import { toast } from "react-toastify";
import { useTicket } from "../../../hooks/Ceo/useTicket";
import { getAllEmployeesByRolesAction } from "../../../store/actions/Ceo/RoleBasedEmpAction";
import { getticketbyidAction } from "../../../store/actions/Ceo/TicketCreateAction";
import { useNotification } from "../../../hooks/Ceo/useNotification";
import { fetchProjects } from "../../../store/actions/hr/projectaction";

const MaterialCreateScreen = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    { itemName: "", unit: "", rate: "", quantity: "", total: "" },
  ]);
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.role);
  const [title, setTitle] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [selectedApprover, setSelectedApprover] = useState([]);
    const { projects = [] } = useSelector((state) => state.project);
  const { boqId } = useSelector((state) => state.boq);
  const { createTicket } = useTicket();
  const { createNotify } = useNotification();
  const [initialApproverArray, setInitialApproverArray] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    title: false,
    vendor: false,
    approver: false
  });
  const { vendors, loading, error } = useSelector((state) => state.vendor);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { itemName: "", unit: "", rate: "", quantity: "", total: "" },
    ]);
  };
  const [approvedBy, setApprovedBy] = useState([]);

  const handleApproverChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setApprovedBy(selectedOptions);
  };
  const getProjectIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("userData"); // Assuming key is 'userDetails'
  
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
  
        // Ensure projects array exists
        if (parsedData.projects && Array.isArray(parsedData.projects)) {
          return parsedData.projects[0]?.projectId || null; // Get projectId of the first project
        } else {
          console.error("No projects found in local storage");
          return null;
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        return null;
      }
    } else {
      console.error("No data found in local storage for key 'userDetails'");
      return null;
    }


  };


    useEffect(() => {
      dispatch(fetchProjects());
    }, [dispatch]);
     // Retrieve projectId dynamically from local storage
   const projectId = getProjectIdFromLocalStorage();

useEffect(() => {
  if (projectId) {
    dispatch(getEmployeeRoles(projectId))
      .unwrap()
      .then(result => {
        // The API response seems to have the roles directly, not under employeesByRole
        const employeesByRole = result; // Changed this line

        const APPROVER_ROLE_CODES = ["CEO", "HEADFINANCE", "MD", "PROJECTMANAGER", "AQS"];

        const approverList = [];

        for (const roleGroup of Object.values(employeesByRole)) {
          if (Array.isArray(roleGroup)) {
            roleGroup.forEach((employee) => {
              if (APPROVER_ROLE_CODES.includes(employee.role_code)) {
                approverList.push({
                  value: employee.emp_id,
                  label: `${employee.emp_name} - ${employee.role_code}`,
                  empId: employee.emp_id,
                });
              }
            });
          }
        }

        setInitialApproverArray(approverList);
      })
      .catch(error => {
        console.error("Failed to fetch employees:", error);
      });
  }
}, [dispatch, projectId]);



  useEffect(() => {
    dispatch(getNewBoqId());
  }, [dispatch]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;

    // Auto-update total if rate or quantity changes
    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(updatedRows[index].rate) || 0;
      const quantity = parseFloat(updatedRows[index].quantity) || 0;
      updatedRows[index].total = rate * quantity;
    }

    setRows(updatedRows);
  };
  const handleVendorSelect = (e) => {
    const value = e.target.value;
    setSelectedVendorId(value);
    if (value) {
      setValidationErrors({ ...validationErrors, vendor: false });
    }
  }

  // Function to handle title change and clear validation error
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (value.trim()) {
      setValidationErrors({ ...validationErrors, title: false });
    }
  }
  const validateForm = () => {
    const errors = {
      title: !title.trim(),
      vendor: !selectedVendorId,
      approver: !selectedApprover.length
    };

    setValidationErrors(errors);

    // Return true if no errors
    return !Object.values(errors).some(error => error);
  };
  const handleApproverSelect = (selectedOptions) => {
    setSelectedApprover(selectedOptions);
    if (selectedOptions && selectedOptions.length > 0) {
      setValidationErrors({ ...validationErrors, approver: false });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (!validateForm()) {
      // If validation fails, show appropriate toast messages
      if (validationErrors.title) toast.warn("Please enter a title.");
      if (validationErrors.vendor) toast.warn("Please select a vendor.");
      if (validationErrors.approver) toast.warn("Please select at least one approver.");
      return;
    }
    let empData = JSON.parse(localStorage.getItem("userData"));

    if (!selectedVendorId) {
      toast.warn("Please select a vendor.");
      return;
    }

    const boqPayload = {
      empId: empData?.empId,
      boqId: 0,
      boqName: title,
      boqCode: boqId.toString(),
      boqDescription: "",
      boqItems: rows.map((row) => ({
        boqItemsId: 0,
        itemName: row.itemName,
        unit: row.unit,
        price: parseFloat(row.rate) || 0,
        quantity: parseFloat(row.quantity) || 0,
      })),
      assignTo: selectedApprover.map((emp) => emp.empId),
      ticketType: "BOQ_APPROVAL",
      vendorId: parseInt(selectedVendorId),
    };

    // Step 1: Create BOQ
    const boqResponse = await dispatch(upsertBoq(boqPayload));

    if (boqResponse?.payload?.success) {
      toast.success("BOQ created successfully.");

      // Step 2: Create Ticket
      const ticketResponse = await createTicket({
        boqId: boqResponse?.payload?.data?.boqId,
        ticketType: "BOQ_APPROVAL",
        assignTo: selectedApprover.map((emp) => emp.empId),
        createdBy: empData?.empId,
      });

      if (ticketResponse?.data?.success) {
        toast.success("Ticket created successfully.");

        const ticketId = ticketResponse?.data?.data?.ticketId;
        const projectName = ticketResponse?.data?.data?.projectName;

        // Step 3: Send Notification with ticketId
        try {
          await createNotify({
            empId: selectedApprover.map((emp) => emp.empId),
            notificationType: "Material Requirement(BOQ)",
            sourceEntityId: ticketId,
            message: `We would like to update you that we are currently awaiting BOQ on the material requirement submitted for ${projectName} Project. Kindly review and provide BOQ at the earliest to avoid any delays in the process.`,
          });
          toast.success("Notification sent.");
        } catch (error) {
          console.warn("Notification failed:", error);
        }

        // Step 4: Navigate to Ticket Details
        const ticketDetails = await dispatch(getticketbyidAction(ticketId)).unwrap();

        setTimeout(() => {
          navigate(`../ticket/${ticketId}`, {
            state: {
              ticket: ticketDetails,
              from: "kanban",
              boqId: boqResponse?.payload?.data?.boqId,
            },
          });
        }, 500);

        // Reset form
        setRows([{ itemName: "", unit: "", rate: "", quantity: "", total: "" }]);
        setTitle("");
        setSelectedVendorId("");
        setSelectedApprover([]);
      } else {
        toast.error("Ticket creation failed.");
      }
    } else {
      toast.error("BOQ creation failed.");
    }
  };


  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVendorsAndSubcontractors());
  }, [dispatch]);

  return (
    <div className="container boq-form">
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
          <span
            onClick={() => navigate("/admin/engineermaterial")}
            style={{ cursor: "pointer" }}
          >
            Material
          </span>{" "}
          &gt; <span style={{ color: "#FF6F00" }}>Create</span>
        </h2>
      </div>

      <h2 className="form-title">New BOQ</h2>

<div className="">
      <Form onSubmit={handleSubmit} className="boq-form-css" >
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">BOQ ID</Form.Label>
              <Form.Control
                style={{ backgroundColor: "white" }}
                type="text"
                placeholder="BOQ ID"
                value={boqId}
                // onChange={(e) => setBoqId(e.target.value)}
                required
                disabled
              />{" "}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">
                Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="BOQ TITLE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />{" "}
            </Form.Group>
          </div>
          {/* <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />{" "}
            </Form.Group>
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Vendor</Form.Label>
              <Form.Select
              className="form-control"
                style={{ backgroundColor: "white" }}
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value)}
              >
                {" "}
                <option>Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.vendorName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className={validationErrors.approver ? "col-md-6 is-invalid" : "col-md-6"}>
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Approved By</Form.Label>
              
<MultipleSelect
  required
  
  
  selectedOptions={selectedApprover}
  handleSelected={setSelectedApprover}
  data={initialApproverArray}
  isSearchable={true}
  placeholder={"Select Approver"}
  isMulti={true}
/>
              {validationErrors.approver && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  Please select at least one approver.
                </div>
              )}
            </Form.Group>
          </div>
        </div>

      <table className="boq-table clean-inputs">
      <thead className="bg-orange">
        <tr>
          <th className="text-center text-white">S. No</th>
          <th className="text-center text-white">Item Name</th>
          <th className="text-center text-white">Unit</th>
          <th className="text-center text-white">Rate</th>
          <th className="text-center text-white">Quantity</th>
          <th className="text-center text-white">Total</th>
        </tr>
      </thead>
      <tbody className="tbl">
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="text-center">{index + 1}</td>
            <td className="cell-no-border">
              <input
                type="text"
                name="itemName"
                value={row.itemName}
                onChange={(e) => handleInputChange(index, e)}
                className="input-no-border"
              />
            </td>
            <td className="cell-no-border">
              <input
                type="text"
                name="unit"
                value={row.unit}
                onChange={(e) => handleInputChange(index, e)}
                className="input-no-border"
              />
            </td>
            <td className="cell-no-border">
              <input
                type="number"
                name="rate"
                value={row.rate}
                onChange={(e) => handleInputChange(index, e)}
                className="input-no-border"
              />
            </td>
            <td className="cell-no-border">
              <input
                type="number"
                name="quantity"
                value={row.quantity}
                onChange={(e) => handleInputChange(index, e)}
                className="input-no-border"
              />
            </td>
            <td className="text-center">{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>

        <div className="d-flex flex-column align-items-end mt-3">
         <Button
  variant=""
  className="text-orange bg-orange add-column-btn p-0 mb-3"
  onClick={handleAddRow}
>
  + Add Row
</Button>

          <Button
            type="submit"
            className="submit-btn"
            style={{
              backgroundColor: "#FF6F00",
              borderColor: "#FF6F00",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{
                color: "white",
                fill: "white", // Add this
                filter: "brightness(100%)",
              }}
            />

            <span style={{ color: "white" }}>Submit</span>
          </Button>

        </div>
      </Form>
      </div>
    </div>
  );
};

export default MaterialCreateScreen;
