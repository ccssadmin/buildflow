import { useState } from "react";

import { NavLink } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";

const EngineersideNav = ({ onChange }) => {
  const [collaps, setCollaps] = useState(false);
  const [{ data: auth }] = useAuth();
  const [contactUsForm, setContactUsForm] = useState(false);
  const expandCollaps = (e) => {
    let showTitle = collaps ? !collaps : true;
    setCollaps(showTitle);
    onChange(showTitle);
  };

  const handleContactUs = () => {
    setContactUsForm(!contactUsForm);
  };
  const closeModal = () => {
    setContactUsForm(false);
  };

  return (
    <>
      <div className="sidenav-content">
        <div className="sidenav-content__headings">
          <div
            className={
              !collaps
                ? "sidenav-content__headings-lists collaps"
                : "sidenav-content__headings-lists"
            }
          >
            {/* DASHBOARD */}
           
            <h5
              className="sidenav-content__headings-lists--title"
              title="Home"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineerdashboard" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconDashboard}
                      alt={"Kanban"}
                    />                    
                    <span>Dashboard</span>
                    {collaps && "Kanban"}
                  </>
                  
                )}
              </NavLink>
            </h5>
            {/* TEAM */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineerproject" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconProjects}
                      alt={"Projects"}
                    />
                    <span>Projects</span>
                    {collaps && "Projects"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineerapprovals" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconApprovals}
                      alt={"Approval"}
                    />
                    <span>Approvals</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineerchats" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Chat</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineermaterial" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconMaterial}
                      alt={"Material"} className="d-block"
                    />
                    <span>Material</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>
  <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineertask" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconTasks}
                      alt={"Task"} className="d-block"
                    />
                    <span>Task</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineerreport" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconReports}
                      alt={"Report"} className="d-block"
                    />
                    <span>Report</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Team"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/admin/engineersetting" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconSettings}
                      alt={"Settings"}
                    />
                    <span>Settings</span>
                    {collaps && "Settings"}
                  </>
                )}
              </NavLink>
            </h5> 
          </div>
        </div>
      </div>
      {contactUsForm && (
        <PopupModal
          closeModal={closeModal}
          headerText=""
          children={<ContactUsForm closePopup={closeModal} />}
          customClass={"contact-us-form"}
        />
      )}
    </>
  );
};

export default EngineersideNav;
