import { useState } from "react";

import { NavLink } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconProjects from "../../../assets/images/menu/icon-projects.svg"
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg"
import IconSettings from "../../../assets/images/menu/icon-settings.svg"
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg"
import IconChat from "../../../assets/images/menu/icon-chat.svg"


const AqssideNav = ({ onChange }) => {
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
              <NavLink to="/aqs/aqsdashboard" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconDashboard}
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
              <NavLink to="/aqs/aqsapprovals" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconProjects}
                      alt={"Projects"}
                    />
                    <span>Approvals</span>
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
              <NavLink to="/aqs/aqschats" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconApprovals}
                      alt={"Approval"}
                    />
                    <span>Chats</span>
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
              <NavLink to="/aqs/aqsmaterial" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Materials</span>
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
              <NavLink to="/aqs/aqsinventory" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Inventory</span>
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
              <NavLink to="/aqs/aqsboq" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>BOQ</span>
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
              <NavLink to="/aqs/aqscostestimation" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Cost Estimation</span>
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
              <NavLink to="/aqs/aqsvendor" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Vendors</span>
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
              <NavLink to="/aqs/aqssetting" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Settings</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>            
          
            
            {auth.activeWorkSpace !== 3 && (
              <>
                {/* PRODUCTS */}
                {/* <h5
                  className="sidenav-content__headings-lists--title"
                  title="Products"
                  disabled={auth?.details?.roleName == null ? true : false}
                >
                  <NavLink to="/products" className="link-tag">
                    {({ isActive, isPending }) => (
                      <>
                        <img
                          src={isActive ? menu.Products : menu.inactiveProducts}
                          alt={"Products"}
                        />
                        {collaps && "Products"}
                      </>
                    )}
                  </NavLink>
                </h5> */}

                {/* CUSTOMERS */}
                {/* <h5
                  className="sidenav-content__headings-lists--title"
                  title="Customers"
                  disabled={auth?.details?.roleName == null ? true : false}
                >
                  <NavLink to="/customers" className="link-tag">
                    {({ isActive, isPending }) => (
                      <>
                        <img
                          src={isActive ? menu.Company : menu.inactiveCompany}
                          alt={"Customers"}
                        />
                        {collaps && "Customers"}
                      </>
                    )}
                  </NavLink>
                </h5> */}
              </>
            )}
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

export default AqssideNav;
