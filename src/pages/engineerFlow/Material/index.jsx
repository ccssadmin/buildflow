import React, { useEffect, useState } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getBoqItemsSelector } from "../../../store/selector/masterSelector";
import { useDispatch, useSelector } from "react-redux";
import { getBoqItemsAction } from "../../../store/actions/masterAction";

const Material = () => {
  const [selectedSite, setSelectedSite] = useState('MRM Site');

  const {data,loading,error} = useSelector(getBoqItemsSelector);
  const dispatch = useDispatch();
  const projectID = 221;

  const [boqItems, setBoqItems] = useState(data);

  const sites = ['MRM Site', 'ABC Site', 'XYZ Site'];

  const navigate = useNavigate();

  const getLevelBadge = (level) => {
    const levelColors = {
      High: "#D00416",
      Medium: "#F1C300",
      Low: "#30A335",
      Urgent: "#D00416",
    };
    return (
      <span className="level-badge" style={{ backgroundColor: levelColors[level], padding: "2px", borderRadius: "3px", color: "white" }}>
        {level}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "#F1C300",
      Approval: "#30A335",
      "Low Stock": "#606060",
      Rejected: "#D00416",
    };
    return (
      <span className="status-badge" style={{ color: statusColors[status] || "black" }}>
        {status}
      </span>
    );
  };

useEffect(()=>{
  const userData = JSON.parse(localStorage.getItem("userData"));
  const ProjectID = userData?.projects?.[0]?.projectId;

  if(ProjectID){
    dispatch(getBoqItemsAction(ProjectID));
  }
},[dispatch]);

useEffect(() => {
  setBoqItems(data);
  console.log("BOQ ITEMS DATA", data);
}, [data]); 


if (loading) return <p>Loading...</p>;
if (error) return <p className="text-danger">Error: {error}</p>;


  return (
    <div className="container mt-4">
      <div className="header-section">
        <div className="site-dropdown-container" style={{ marginLeft: '15px' }}>
          <select
            className="form-select select-custom"
            style={{ backgroundColor: '#E8E8E8' }}
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            {sites.map((site, index) => (
              <option key={index} value={site}>{site}</option>
            ))}
          </select>
        </div>
        <Button className="create-button"
          onClick={() => navigate('/admin/materialview',{state:{boqId:123}})}
        >Create</Button>
      </div>

      <div className="table-responsive">
        <Table bordered className="material-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Material List</th>
              <th>In Stock Quantity</th>
              <th>Required Quantity</th>
              <th>Level</th>
              <th>Request Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {boqItems.map((material, index) => (
              <tr key={index}>
                <td>{material.id}</td>
                <td>{material.name}</td>
                <td>{material.stock}</td>
                <td>{material.required}</td>
                <td>{getLevelBadge(material.level)}</td>
                <td>{getStatusBadge(material.status)}</td>
                <td>
                  <a
                    href=""
                    style={{ color: material.action === "View" ? "#0456D0" : "#0456D0" }}
                    onClick={() => navigate(`/admin/materialview/${material.boqId}`)}
                  >
                    {material.action}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Material;
