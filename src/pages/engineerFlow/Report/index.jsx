import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { profile , icon_dropdown_arrow } from '../../../assets/images';
import { Dropdown } from "react-bootstrap";
export const roleCheck = { role: "admin" };


const Report = () => {

  const navigate = useNavigate();
  
  
    const reports = Array.from({ length: 13 }, (_, index) => ({
      id: index + 1,
      reportId: "Daily Report - DPR2025",
      projectName: "MAA - A Block",
      date: "14-03-2025",
      time: "06:00 pm",
      reportedBy: "Darrell",
      avatar: profile, 
    }));
  return (
    <Fragment>
      <main className="page-engineer-material d-flex">
        <div className="left-container left-container-100">
          <div className="row mt-4">
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
              <Dropdown>
                <Dropdown.Toggle className="dropdown-toggle fs-24-700">
                  MRM Site <img src={icon_dropdown_arrow} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>MRM Site 1</Dropdown.Item>
                  <Dropdown.Item>MRM Site 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="text-end btn-remove-add-group d-flex justify-content-end">
                <button className="btn btn-primary bg-primary text-light border-0 border-radius-2 fs-14-600 me-0" onClick={() => navigate('/admin/engineerreportcreate')} >Create</button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="tbl-container table-responsive">
                <table  className="text-center tbl-report">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-dark text-center h-44">S.No</th>
                      <th className="fs-16-500 text-dark text-center h-44">Material List</th>
                      <th className="fs-16-500 text-dark text-center h-44">In Stock Quantity</th>
                      <th className="fs-16-500 text-dark text-center h-44">Required Quantity</th>
                      <th className="fs-16-500 text-dark text-center h-44">Level</th>
                      <th className="fs-16-500 text-dark text-center h-44">Request Status</th>
                      <th className="fs-16-500 text-dark text-center h-44">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td  className="fs-16-500 text-dark text-center h-44 text-dark-gray">{report.id.toString().padStart(2, "0")}</td>
                        <td className="fs-16-500 text-dark text-center h-44 text-dark-gray">{report.reportId}</td>
                        <td className="fs-16-500 text-dark text-center h-44 text-dark-gray">{report.projectName}</td>
                        <td className="fs-16-500 text-dark text-center h-44 text-dark-gray">{report.date}</td>
                        <td className="fs-16-500 text-dark text-center h-44 text-dark-gray">{report.time}</td>
                        <td className="fs-16-500 text-dark text-center h-44 text-dark-gray">
                          <div className="d-flex justify-content-center text-dark-gray">
                            <img src={report.avatar} alt="Avatar" className="me-2" />
                            {report.reportedBy}
                          </div>
                        </td>
                        <td className="fs-16-500 text-dark text-center h-44">
                          <a href="#" className="text-bright-royal-blue"  onClick={ () => navigate('/admin/engineerreportview')}>
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Report;
