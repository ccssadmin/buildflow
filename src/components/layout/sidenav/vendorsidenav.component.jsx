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
import IconVendor from "../../../assets/images/menu/icon-vendor.svg";

const VendorsideNav = ({ onChange }) => {
  const [collaps, setCollaps] = useState(false);
  const [{ data: auth }] = useAuth();
  const [contactUsForm, setContactUsForm] = useState(false);

  const expandCollaps = () => {
    setCollaps(!collaps);
    onChange(!collaps);
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
          <div className={collaps ? "sidenav-content_headings-lists" : "sidenav-content_headings-lists collaps"}>
            <NavLink to="/vendor/dashboard" className="link-tag">
              {({ isActive }) => (
                <h5 className="sidenav-content__headings-lists--title" title="Dashboard">
                  <img src={IconDashboard} alt="Dashboard" />
                  <span>Dashboard</span>
                  {collaps && "Kanban"}
                </h5>
              )}
            </NavLink>

            <NavLink to="/vendor/po" className="link-tag">
              {({ isActive }) => (
                <h5 className="sidenav-content__headings-lists--title" title="Purchase Orders">
                  <img src={IconChat} alt="PO" />
                  <span>Pos</span>
                  {collaps && "Team"}
                </h5>
              )}
            </NavLink>

            <NavLink to="/vendor/approvals" className="link-tag">
              {({ isActive }) => (
                <h5 className="sidenav-content__headings-lists--title" title="Approvals">
                  <img src={IconProjects} alt="Projects" />
                  <span>Approvals</span>
                  {collaps && "Projects"}
                </h5>
              )}
            </NavLink>

            <NavLink to="/vendor/chats" className="link-tag">
              {({ isActive }) => (
                <h5 className="sidenav-content__headings-lists--title" title="Chat">
                  <img src={IconApprovals} alt="Approval" />
                  <span>Chat</span>
                  {collaps && "Team"}
                </h5>
              )}
            </NavLink>

            <NavLink to="/vendor/settings" className="link-tag">
              {({ isActive }) => (
                <h5 className="sidenav-content__headings-lists--title" title="Settings">
                  <img src={IconSettings} alt="Settings" />
                  <span>Settings</span>
                  {collaps && "Team"}
                </h5>
              )}
            </NavLink>
          </div>
        </div>

        {/* Contact Us */}
        {auth.activeWorkSpace === 3 && (
          <div className="setting__info">
            <p className="setting__info-contact" title="Contact Us">
              <button onClick={handleContactUs}>
                <img src={menu.ContactUs} />
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