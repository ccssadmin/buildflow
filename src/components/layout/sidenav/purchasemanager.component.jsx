import { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconPO from "../../../assets/images/menu/icon-po.svg";
import IconVendor from "../../../assets/images/menu/icon-vendor.svg";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";

const PurchasemanagersideNav = ({ onChange }) => {
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
  const isApprovelActive =
    location.pathname === "/purchasemanager/approvals" ||
    location.pathname.startsWith("/purchasemanager/ticketdetails");
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
              title="Dashboard"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/purchasemanager/dashboard" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconDashboard} alt={"Dashboard"} />
                    <span>Dashboard </span>
                    {collaps && "Dashboard"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Vendors"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/purchasemanager/vendors" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconVendor} alt={"Vendors"} />
                    <span>Vendors </span>
                    {collaps && "Vendors"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="POs"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/purchasemanager/po" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconPO} alt={"POs"} />
                    <span>PO </span>
                    {collaps && "POs"}
                  </>
                )}
              </NavLink>
            </h5>

            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/purchasemanager/approvals"
                className={`link-tag ${isApprovelActive ? "active" : ""}`}
              >
                {({ isActive, isPending }) => (
                  <>
                    <img src={IconApprovals} alt={"Projects"} />
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
              <NavLink to="/purchasemanager/chats" className="link-tag">
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
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/purchasemanager/settings" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconSettings}
                      alt={"Settings"}
                      className="d-block"
                    />
                    <span>Settings</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>

            {auth.activeWorkSpace == 2 && (
              <h5
                className="sidenav-content__headings-lists--title"
                title="Team"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <NavLink to="/calendar" className="link-tag">
                  {({ isActive, isPending }) => (
                    <>
                      <img
                        src={
                          isActive ? menu.calenderActive : menu.calenderInActive
                        }
                        alt={"calenderActive"}
                      />
                      {collaps && "Calendar"}
                    </>
                  )}
                </NavLink>
              </h5>
            )}
          </div>
        </div>
        <div
          className={!collaps ? "others__options collaps" : "others__options"}
        >
          {/* <h6
            className={
              !collaps
                ? "others__options--title collaps"
                : "others__options--title"
            }
          >
            {collaps && "OTHERS"}
          </h6> */}
          <div className="setting__info">
            {/* SETTINGS */}{" "}
            {/* {auth.activeWorkSpace !== 3 && (
              <p
                className="setting__info-settings"
                title="Settings"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <NavLink to="/settings" className="link-tag">
                  {({ isActive, isPending }) => (
                    <>
                      <img
                        src={IconSettings}
                      />
                      <span>Settings</span>
                      {collaps && "Settings"}
                    </>
                  )}
                </NavLink>
              </p>
            )} */}
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
            {/* About Us */}
            {/* {auth.activeWorkSpace !== 3 && (
              <p className="setting__info-aboutus" title="About Us">
                <NavLink to="/aboutus" className="link-tag">
                  {({ isActive, isPending }) => (
                    <>
                      <img
                        src={isActive ? menu.aboutUs : menu.aboutUsInactive}
                      />
                      {collaps && "About Us"}
                    </>
                  )}
                </NavLink>
              </p>
            )} */}
            {/* HELP */}
            {/* <p
              className="setting__info-help"
              title="Help"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/help" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img src={isActive ? menu.Help : menu.inactiveHelp} />
                    {collaps && "Help"}
                  </>
                )}
              </NavLink>
            </p> */}
          </div>
        </div>
        {/* <div className="expand__arrow" onClick={expandCollaps}>
          <img
            src={collaps ? chevronLeftDuo : chevronRightDuo}
            alt="arrow-icon"
          />
        </div> */}
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

export default PurchasemanagersideNav;
