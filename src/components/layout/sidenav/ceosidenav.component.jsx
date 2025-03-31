import { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconProjects from "../../../assets/images/menu/icon-projects.svg";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";
import IconDepartments from "../../../assets/images/menu/icon-departments.svg";
import IconResources from "../../../assets/images/menu/icon-resources.svg";
import IconFinance from "../../../assets/images/menu/icon-finance.svg";

const CeoSidenav = ({ onChange }) => {
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
  const location = useLocation();
  const isProjectActive =
    location.pathname === "/ceo/projects" ||
    location.pathname === "/ceo/projectdetails" ||
    location.pathname === "/ceo/createproject";
  const isApprovelActive =
    location.pathname === "/ceo/approvals" ||
    location.pathname.startsWith("/ceo/ticketdetails");
  const isReportviewlActive =
    location.pathname === "/ceo/report" ||
    location.pathname.startsWith("/ceo/reportview");
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
              <NavLink to="/ceo/dashboard" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconDashboard} alt={"Kanban"} />
                    <span>Dashboard </span>
                    {collaps && "Kanban"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Projects"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/project"
                className={`link-tag ${isProjectActive ? "active" : ""}`}
              >
                {({ isActive, isPending }) => (
                  <>
                    <img src={menu.IconProjects} alt={"Projects"} />
                    <span>Projects</span>
                    {collaps && "Projects"}
                  </>
                )}
              </NavLink>
            </h5>
            {/* TEAM */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/approvals"
                className={`link-tag ${isApprovelActive ? "active" : ""}`}
              >
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconProjects} alt={"Projects"} />
                    <span>Approvals</span>
                    {collaps && "Projects"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Chats"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/ceo/chats" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconChat} alt={"Approval"} />
                    <span>Chats</span>
                    {collaps && "Chats"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Finance"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/ceo/finance" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconFinance} alt={"Chat"} className="d-block" />
                    <span>Finance</span>
                    {collaps && "Finance"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Resources"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/ceo/resources" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconResources} alt={"Chat"} className="d-block" />
                    <span>Resources</span>
                    {collaps && "Resources"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Departments"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/ceo/departments" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconDepartments} alt={"Chat"} className="d-block" />
                    <span>Departments</span>
                    {collaps && "Departments"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Reports"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/ceo/reports" className={`link-tag ${isReportviewlActive ? "active" : ""}`}>
                {({ isActive, isPending }) => (
                  <>
                    <img src={menu.IconReports} alt={"Chat"} className="d-block" />
                    <span>Reports</span>
                    {collaps && "Reports"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/ceo/settings" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconSettings} alt={"Chat"} className="d-block" />
                    <span>Settings</span>
                    {collaps && "Settings"}
                  </>
                )}
              </NavLink>
            </h5>
          </div>
        </div>
        <div
          className={!collaps ? "others__options collaps" : "others__options"}
        >
          <div className="setting__info">            
            {/* CONTACT US */}
            {auth.activeWorkSpace === 3 && (
              <p
                className="setting__info-contact"
                title="Contact us"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <button onClick={handleContactUs}>
                  <img src={menu.ContactUs} />
                  {collaps && "Contact us"}
                </button>
              </p>
            )}
            
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

export default CeoSidenav;
