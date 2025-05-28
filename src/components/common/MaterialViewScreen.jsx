//D:\ccs\Project\React JS\latest\buildflow\src\components\common\MaterialViewScreen.jsx
import React, { useEffect, useState } from "react";
import { Form, Table, Dropdown } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { getBoqDetails } from "../../services";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";  // Import the xlsx library
import MultipleSelect from "../DropDown/MultipleSelect";


const MaterialViewScreen = () => {
  const navigate = useNavigate();
  const route = useParams();
  const location = useLocation();
  const [boqDetails, setboqDetails] = useState("");
  const { ticket } = location.state || {};
  const [boqApprovers, setBoqApprovers] = useState([]);

  const boqData = [
    {
      id: "01",
      name: "Dalmia Cements",
      unit: "Bag",
      rate: 321,
      quantity: 12,
      total: 3852,
    },
    {
      id: "02",
      name: "MTR TMT Rod",
      unit: "Piece",
      rate: 86,
      quantity: 54,
      total: 4644,
    },
    {
      id: "03",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "04",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "05",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "06",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "07",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "08",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "09",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
  ];



  const handleDownloadExcel = () => {
    const items = boqDetails?.boqItems || []; // Ensure that boqItems are present
    const formattedData = items.map(item => ({
      "S. No": item.boqItemsId,
      "Item Name": item.itemName,
      "Unit": item.unit,
      "Rate ₹": item.price,
      "Quantity": item.quantity,
      "Total": item.total,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData); // Convert to sheet format
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BOQ Data");

    // Generate and download the Excel file
    XLSX.writeFile(wb, "BOQ_Data.xlsx");
  };


    // Generates a random color
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33B5E5",
      "#8E44AD",
      "#16A085",
      "#E67E22",
      "#2ECC71",
      "#3498DB",
      "#F39C12",
      "#1ABC9C",
      "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

    const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };



  useEffect(() => {
    if (route?.boqId) {
      getBOQDetails(route.boqId);
    }
    console.log("route_route", route);
  }, [route]);

  console.log("boqDetails", boqDetails);
  console.log("location", location);

 const getBOQDetails = async (boqId) => {
  console.log("boqId", typeof boqId, boqId);
  const response = await getBoqDetails(Number(boqId));
  if (response?.status === 204 || response?.status === 500) {
    toast.warning("No Data Found");
    return;
  }

  if (response?.data) {
    console.log("response.data", response.data);
    setboqDetails(response.data);

    // ✅ Extract approvers and map for display
    const approversMapped = (response.data.approvers || []).map((emp) => ({
      ...emp,
      label: emp.roleName,
      value: emp.roleName,
    }));
    setBoqApprovers(approversMapped);  // <-- This line adds approver data
  }

  console.log("response:", response);
};


  const isValidforApproval = () => {
    const path = location.pathname.split("/").slice(1);
    console.log("path", path);
    if (path.includes("purchasemanager")) {
      return true;
    }
  };
  const handleConvertToPO = () => {
    // Navigate to PO create page with boqDetails and ticket data
    if (boqDetails) {
      navigate("/purchasemanager/pocreateautogenrate", {
        state: {
          boqData: {
            ...boqDetails,
            boqCode: boqDetails.boqCode || `boq#${boqDetails.boqId}` // Ensure boqCode is available
          },
          ticket: ticket,
        },
      });
    } else {
      toast.warning("No BOQ details available to convert");
    }
  };


  return (
    <div className="container mt-4">
      <div
        style={{
     
          paddingBottom: "15px",
          borderBottom: "1px solid #ddd",
          marginBottom: "40px",
          marginTop:"-10px"
        }}
      >
        <h2 style={{ margin: 0, fontSize: "16px", color: "#333", }}>
          <span
            onClick={() => navigate("#")}
            style={{ cursor: "pointer",  }}
          >
         
            BOQ
          </span>{" "}
          &gt; <span style={{ color: "#FF6F00" ,paddingLeft:"10px" }}>Open BOQ</span>
        </h2>
      </div>

      <h3 className="mt-3">New BOQ</h3>

      {/* Form Section */}
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className="text-black fs-5">BOQ ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="BOQ ID"
              value={boqDetails?.boqCode}
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
            <Form.Control disabled
              type="text"
              placeholder="BOQ TITLE"
              value={boqDetails?.boqName}
            />
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
      <Form.Group className="mb-3">
  <Form.Label className="text-black fs-5">Vendor</Form.Label>
  <div className="d-flex align-items-center gap-2 position-relative mb-3">
    <div
      className="rounded-circle text-white d-flex align-items-center justify-content-center"
      style={{
         width: "30px",
                height: "30px",
                fontSize: "16px",
                flexShrink: 0,
                backgroundColor: getRandomColor(), // random color
                position: "absolute",
                left: "10px",   
               
                marginTop:"-5px"
      }}
    >
      {getInitials(boqDetails?.vendorName)}
    </div>
    <Form.Control
      className="ps-5"
      type="text"
      disabled
      value={boqDetails?.vendorName}
    />
  </div>
</Form.Group>

        </div>
        <div className="col-md-6">
  <Form.Group className="mb-3">
  <Form.Label className="text-black fs-5">Approved By</Form.Label>
  <div className=" flex-wrap gap-2 mb-2">
    {boqApprovers.map((approver, index) => (
      <div key={index} className="d-flex align-items-center gap-2 position-relative mb-3">
        <div
          className="rounded-circle text-white d-flex align-items-center justify-content-center"
          style={{
           width: "30px",
            height: "30px",
            fontSize: "14px",
            flexShrink: 0,
            backgroundColor: getRandomColor(),
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
              marginTop:"-3px"
        
            
          }}
        >
          {getInitials(approver?.roleName)}
          
        </div>
                   <Form.Control
      className="ps-5"
      type="text"
      disabled
      value={approver?.roleName}
    />

      </div>
    ))}
  </div>
</Form.Group>


        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <Table bordered className="mt-3">
          <thead className="table-light">
            <tr>
              <th style={{ textAlign: "center" }}>S. No</th>
              <th style={{ textAlign: "center" }}>Item Name</th>
              <th style={{ textAlign: "center" }}>Unit</th>
              <th style={{ textAlign: "center" }}>Rate ₹</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {boqDetails?.boqItems?.length > 0 &&
              boqDetails.boqItems.map((item, index) => {
                const sno = index + 1;
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{sno}</td>
                    <td style={{ textAlign: "center" }}>{item.itemName}</td>
                    <td style={{ textAlign: "center" }}>{item.unit}</td>
                    <td style={{ textAlign: "center" }}>{item.price}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ textAlign: "center" }}>{item.total}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      {/* Total & Action Buttons Section */}
      <div className="d-flex justify-content-between align-items-center text-white p-3"
        style={{ backgroundColor: "#ff6600" }}
      >
        <div className="text-white">Total</div>
        <div className="text-white">
          {(boqDetails?.boqItems?.length > 0
            ? boqDetails.boqItems.reduce((acc, item) => acc + (item.total || 0), 0)
            : boqData.reduce((acc, item) => acc + (item.total || 0), 0)
          ).toLocaleString()}
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center mt-3 gap-2">
        {(() => {
          const userRoleId = parseInt(localStorage.getItem("userRoleId"));
          const isRole1 = userRoleId === 17;

          return isValidforApproval && (
            <button
              className={`btn text-white d-flex align-items-center ${isRole1 ? "d-block" : "d-none"}`}
              style={{ backgroundColor: "#ff6600" }}
              onClick={handleConvertToPO}
            >
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="me-2"
                color="black"
              />
              Convert To PO
            </button>);
        })()}
        <button
          className="btn btn-secondary text-white d-flex align-items-center"
          
        >
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className="me-2"
            color="white"
          />
          Go Approval
        </button>
        <button
          className="btn text-white d-flex align-items-center"
          style={{ backgroundColor: "#ff6600" }}
          onClick={handleDownloadExcel}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className="me-2"
            style={{ color: "white" }}
          />
          Download .xlsx
        </button>
      </div>
    </div>
  );
};

export default MaterialViewScreen;
