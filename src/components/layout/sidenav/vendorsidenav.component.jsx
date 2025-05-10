import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconProjects from "../../../assets/images/menu/icon-projects.svg";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";

const VendorsideNav = ({ onChange }) => {
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
          <div className={!collaps ? "sidenav-content__headings-lists collaps" : "sidenav-content__headings-lists"}>
            {/* DASHBOARD */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Dashboard"
            >
              <NavLink 
                to="/vendor/dashboard" 
                className="link-tag"
                activeClassName="active"
              >
                <img src={IconDashboard} alt={"Dashboard"} />
                <span>Dashboard</span>
                {collaps && "Dashboard"}
              </NavLink>
            </h5>

            {/* PO */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="POs"
            >
              <NavLink 
                to="/vendor/po" 
                className="link-tag"
                activeClassName="active"
              >
                <img src={IconChat} alt={"POs"} className="d-block" />
                <span>POs</span>
                {collaps && "POs"}
              </NavLink>
            </h5>

            {/* APPROVALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
            >
              <NavLink 
                to="/vendor/approvals" 
                className="link-tag"
                activeClassName="active"
              >
                <img src={IconApprovals} alt={"Approvals"} />
                <span>Approvals</span>
                {collaps && "Approvals"}
              </NavLink>
            </h5>

            {/* CHAT */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Chat"
            >
              <NavLink 
                to="/vendor/chats" 
                className="link-tag"
                activeClassName="active"
              >
                <img src={IconProjects} alt={"Chat"} className="d-block" />
                <span>Chat</span>
                {collaps && "Chat"}
              </NavLink>
            </h5>

            {/* SETTINGS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
            >
              <NavLink 
                to="/vendor/settings" 
                className="link-tag"
                activeClassName="active"
              >
                <img src={IconSettings} alt={"Settings"} />
                <span>Settings</span>
                {collaps && "Settings"}
              </NavLink>
            </h5>
          </div>
        </div>

        {/* Contact Us */}
        {auth?.activeWorkSpace === 3 && (
          <div className="setting__info">
            <p className="setting__info-contact" title="Contact Us">
              <button onClick={handleContactUs}>
                <img src={menu.ContactUs} alt="Contact Us" />
                {collaps && "Contact us"}
              </button>
            </p>
          </div>
        )}
      </div>

      {contactUsForm && (
        <PopupModal closeModal={closeModal} headerText="" customClass="contact-us-form">
          <ContactUsForm closePopup={closeModal} />
        </PopupModal>
      )}
    </>
  );
};

export default VendorsideNav;