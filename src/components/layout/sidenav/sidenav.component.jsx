import { useEffect, useState } from "react";
import { chevronLeftDuo, chevronRightDuo } from "../../../assets/images";

import { NavLink } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";

const SideNav = ({ onChange }) => {
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
            {/* <h5 className="sidenav-content__headings-lists--title" title="Dashboard"> 
              <NavLink to="/" className="link-tag" >
                  {({ isActive, isPending }) => (
                    <><img src={ isActive ? menu.Dashboard : menu.inactiveDashboard} />{collaps && 'Dashboard'}</>
                  )}
              </NavLink>
            </h5> */}
            {/* HOME */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Home"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/home" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={isActive ? menu.icon_dashboard : menu.icon_dashboard}
                      alt={"Kanban"}
                    />
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
              <NavLink to="/teams" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={isActive ? menu.Teams : menu.inactiveTeams}
                      alt={"Teams"}
                    />
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
            {auth.activeWorkSpace !== 3 && (
              <p
                className="setting__info-settings"
                title="Settings"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <NavLink to="/settings" className="link-tag">
                  {({ isActive, isPending }) => (
                    <>
                      <img
                        src={isActive ? menu.Settings : menu.inactiveSettings}
                      />
                      {collaps && "Settings"}
                    </>
                  )}
                </NavLink>
              </p>
            )}
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

export default SideNav;
