"use client"
import { useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVendorsAndSubcontractors } from "../../../store/actions/vendor/getvendoraction";
import { getNewPoId, upsertPurchaseOrder } from "../../../store/actions/Purchase/purcharseorderidaction";
import { Dropdown, Form } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import MultipleSelect from "../../../components/DropDown/MultipleSelect";
import { fetchRoles } from "../../../store/actions/hr/designationaction";
import { getAllEmployeesByRolesAction } from "../../../store/actions/Ceo/RoleBasedEmpAction";

import { fetchProjects } from "../../../store/actions/hr/projectaction";
import { toast } from "react-toastify";
import { useTicket } from "../../../hooks/Ceo/useTicket";

export default function POViewPage({ params }) {
  
  const location = useLocation();
const { createTicket } = useTicket();
   const navigate = useNavigate();
   const { poId, loading } = useSelector((state) => state.purchase);
   const dispatch = useDispatch();
   const { vendors } = useSelector((state) => state.vendor);
   const [selectedProjectId, setSelectedProjectId] = useState("");
     const { projects = [] } = useSelector((state) => state.project);
   
  const [selectedVendorId, setSelectedVendorId] = useState("");
    const [selectedApprover, setSelectedApprover] = useState([]);
   const [initialApproverArray, setInitialApproverArray] = useState([]);
  const { boqData, ticket } = location.state || {};
 const [poData, setPoData] = useState({
    poNumber: "",
    poDate: new Date().toISOString().split("T")[0],
    vendorName: boqData?.vendorName || "",
    items: [],
  });
  

   useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const result = await dispatch(getAllEmployeesByRolesAction()).unwrap();
          const firstEmployees = Object.entries(result.employeesByRole).map(
            ([role, employees]) => ({
              role,
              employee: employees[0], // Only the first employee
            })
          );
          const approverRoles = firstEmployees
            ?.filter((role) =>
              [
                "CEO",
                "Head Finance",
                "Managing Director",
              
              ].includes(role.role)
            )
            .map((role) => ({
              ...role.employee,
              value: role.role,
              label: role.role,
            }));
  
          setInitialApproverArray(approverRoles);
        } catch (error) {
          console.error("Failed to fetch employees:", error);
        }
      };
  
      fetchEmployees();
    }, [dispatch]);



    useEffect(() => {
      dispatch(upsertPurchaseOrder());

    }, [dispatch]);
    

      useEffect(() => {
        dispatch(fetchProjects());
      }, [dispatch]);
      

      const handleProjectChange = (e) => {
        const selected = projects.find(
          (proj) => proj.project_id === parseInt(e.target.value)
        );
        setSelectedProjectId(selected);
      };

    useEffect(() => {
      dispatch(fetchRoles());
    }, [dispatch]);

   useEffect(() => {
    dispatch(getNewPoId());
  }, [dispatch]);

  // Sample line items data
  const [lineItems, setLineItems] = useState([]);


  const handleInputChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
  
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const quantity = parseFloat(updatedItems[index].quantity) || 0;
  
    updatedItems[index].total = rate * quantity;
  
    setLineItems(updatedItems);
  };
  

  useEffect(() => {
    dispatch(getVendorsAndSubcontractors());
  }, [dispatch]);




  const handleCreatePO = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const empId = userData?.empId;
      const payload = {
        purchaseOrderId: 0,
        poId: poData.poNumber, // Ensure this is the correct name expected by the API
        poDate: poData.poDate,
        vendorName: poData.vendorName,
        boqId: parseInt(boqData?.boqId) || 47,
        boqTitle: boqData?.boqName || "",
        createdBy: empId,
        Items: poData.items.map((item) => ({
          // itemId: item.itemId,
          itemName: item.itemName,
          unit: item.unit,
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
      };
  
      const response = await dispatch(upsertPurchaseOrder(payload));
      if (response?.payload?.success) {
        toast.success("PO Created Successfully");
        const ticketResponse = await createTicket({
          poId: response?.payload?.data?.purchaseOrderId,
          ticketType: "PO_APPROVAL",
          assignTo: [1,2,7], // ✅ array of empIds
          createdBy: userData?.empId, // replace with actual logged-in user ID
        });
  
        console.log("ticketResponse", ticketResponse);
      }
      console.log("response", response);
    };
  
  
  const handleAddRow = () => {
    const newId = lineItems.length + 1;
    const newRow = {
      id: newId,
      name: "",
      unit: "",
      rate: "",
      quantity: "",
      total: "",
    };
    setLineItems([...lineItems, newRow]);
  };

  
  return (
    <div className="container mt-4 mb-5">
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#333", marginBottom: "24px" }}>Purchase Order</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
        <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              PO Id <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={loading ? "Loading..." : poId || ""}
              readOnly
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>

        </div>
        <div className="form-group">
  <label>
    Projects <span className="addemployee-required">*</span>
  </label>
  <select
    className="form-control"
    name="project"
    value={selectedProjectId}
    onChange={(e) => setSelectedProjectId(e.target.value)}
  >
    <option value="">Select Project</option>
    {projects.map((proj) => (
      <option key={proj.project_id} value={proj.project_id}>
        {proj.project_name}
      </option>
    ))}
  </select>
</div>
</div>
    
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={boqData?.boqName || ""}
            
              style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>Attach BOQ</label>
            <input  type="text"
              className="form-control"
               
              style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px", minHeight: "38px" }}
            />
          </div>
        </div>
      </div>

      <div className="row mb-4">
      <div className="col-md-6 mb-3">
        <div className="form-group">
          <label style={{ fontWeight: "500", marginBottom: "8px" }}>Vendor</label>
          <select
            className="form-control"
            value={selectedVendorId}
            onChange={(e) => setSelectedVendorId(e.target.value)}
            style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Approved By</Form.Label>
              <MultipleSelect
                selectedOptions={selectedApprover}
                handleSelected={setSelectedApprover}
                data={initialApproverArray}
                isSearchable={true}
                placeholder={"Select Approver"}
                isMulti={true}
              />
            </Form.Group>
          </div>
        </div>
        
       
     

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "80px" }}>S. No</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Item Name</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Unit</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Rate ₹</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Quantity</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
  {lineItems.map((item, index) => (
    <tr key={item.id} style={{ borderBottom: "1px solid #dee2e6" }}>
      <td className="text-center" style={{ padding: "12px 16px" }}>{item.id}</td>

      <td className="text-center">
        <input
          type="text"
          className="form-control"
          value={item.name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
        />
      </td>

      <td className="text-center">
        <input
          type="text"
          className="form-control"
          value={item.unit}
          onChange={(e) => handleInputChange(index, "unit", e.target.value)}
        />
      </td>

      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={item.rate}
          onChange={(e) => handleInputChange(index, "rate", e.target.value)}
        />
      </td>

      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={item.quantity}
          onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
        />
      </td>

      <td className="text-center" style={{ padding: "12px 16px" }}>
        ₹ {(item.total || 0).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>

      </table>
      
      <button
        className="btn"
        onClick={handleAddRow}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        + Add New Row
      </button>
      </div>

      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={() => navigate('../po')} style={{ padding: "8px 16px" }}>
            Back
          </button>
          <button className="btn" onClick={handleCreatePO}  style={{ backgroundColor: "#ff6600", color: "white", padding: "8px 16px" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
