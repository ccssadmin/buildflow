import { useState } from "react";

import { NavLink } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";

const FinancesideNav = ({ onChange }) => {
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
              <NavLink to="/finance/dashboard" className="link-tag">
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
              <NavLink to="/finance/budget" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconProjects}
                      alt={"Projects"}
                    />
                    <span>Budget</span>
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
              <NavLink to="/finance/approvals" className="link-tag">
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
              <NavLink to="/finance/chats" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconChat}
                      alt={"Chat"} className="d-block"
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
              <NavLink to="/finance/invoice" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconMaterial}
                      alt={"Material"} className="d-block"
                    />
                    <span>Invoices</span>
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
              <NavLink to="/finance/cashflow" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconTasks}
                      alt={"CashFlow"} className="d-block"
                    />
                    <span>Cash Flow</span>
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
              <NavLink to="/finance/vendorandpo" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconReports}
                      alt={"Vendor"} className="d-block"
                    />
                    <span>Vendor & PO</span>
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
              <NavLink to="/finance/tax" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconReports}
                      alt={"Report"} className="d-block"
                    />
                    <span>Tax</span>
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
              <NavLink to="/finance/report" className="link-tag">
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
              <NavLink to="/finance/settings" className="link-tag">
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

export default FinancesideNav;
