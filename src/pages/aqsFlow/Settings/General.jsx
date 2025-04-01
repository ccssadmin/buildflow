import profile from "../../../assets/images/Profile-pic.png";
import logout from "../../../assets/images/Logout.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { setAuthToken, setAuthType, setExpiresOn } from "../../../utils/storage";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const GeneralSettings = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [showWPSwitch, setShowWPSwitch] = useState(false);
    const [{ data }, { setAuth, getUserInfo }] = useAuth();
    const popupRef = useRef(null);
    const [currentStatus, setCurrentStatus] = useState();
      const dispatch = useDispatch();
      const { t } = useTranslation();
      const navigate = useNavigate();
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          // If the click is outside the popup, close it
          if (
            ((popupRef.current && !popupRef.current.contains(event.target)) ||
              popupRef.current == null) &&
            event.target.id !== "show_more_boards"
          ) {
            setShowInfo(false);
          }
        };
        // Attach the event listener to the document body
        document.addEventListener("click", handleClickOutside);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);

     /** CLEARS TOKEN & LOGOUT USER */
      const userLogout = () => {
        setShowInfo(false);
        setShowNotify(false);
        // setAuth("");
        setAuthToken("");
        setExpiresOn("");
        setAuthType("");
      };
    return (
        <>
        <div className="profile-details">
            <h2 className="">Profile Details</h2>
            <div className="d-flex align-items-center mb-4">
                <img src={profile} alt="profile" className="img-profile" />
                <div className="">
                    <h4 className="mb-1">AQS</h4>
                    <p className="">Assistant Quantity Surveyor</p>
                </div>
            </div>
            <div className="d-flex align-items-center">                
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4.06L10.87 9.95C10.94 10.01 11.06 10.01 11.13 9.95L18 4.06M2.2 1H19.8C20.46 1 21 1.54 21 2.2V14.6C21 15.92 19.92 17 18.6 17H3.4C2.08 17 1 15.92 1 14.6V2.2C1 1.54 1.54 1 2.2 1Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h6 className="title-3 mb-0 ms-2">aqs@construction.com</h6>
            </div>
            <div className="d-flex align-items-center mt-4">
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.84008 6.85616C4.63115 10.7544 7.8128 13.8437 11.7621 15.5192L11.7741 15.5242L12.5381 15.8642C13.01 16.0746 13.5399 16.1162 14.0389 15.982C14.5379 15.8478 14.9754 15.5459 15.2781 15.1272L16.5521 13.3642C16.5895 13.3122 16.6056 13.2479 16.5971 13.1845C16.5885 13.121 16.5559 13.0633 16.5061 13.0232L14.2821 11.2282C14.2558 11.207 14.2256 11.1913 14.1931 11.1822C14.1607 11.173 14.1267 11.1705 14.0933 11.1748C14.0598 11.1791 14.0276 11.1901 13.9985 11.2072C13.9694 11.2243 13.9441 11.247 13.9241 11.2742L13.0581 12.4422C12.9561 12.58 12.8099 12.6786 12.6439 12.7218C12.478 12.7649 12.3023 12.7499 12.1461 12.6792C9.18782 11.3377 6.81751 8.96742 5.47608 6.00916C5.40538 5.85295 5.39035 5.67724 5.43347 5.51129C5.47659 5.34534 5.57528 5.19918 5.71308 5.09716L6.88008 4.23016C6.90719 4.21012 6.92998 4.1848 6.94705 4.15572C6.96413 4.12665 6.97515 4.09442 6.97945 4.06097C6.98374 4.02753 6.98123 3.99356 6.97206 3.96111C6.96289 3.92866 6.94725 3.8984 6.92608 3.87216L5.13208 1.64816C5.09194 1.59829 5.03419 1.56572 4.97075 1.55716C4.90731 1.5486 4.843 1.56471 4.79108 1.60216L3.01808 2.88216C2.59647 3.18627 2.29318 3.62698 2.15974 4.12939C2.0263 4.63181 2.07094 5.16493 2.28608 5.63816L2.84008 6.85616ZM11.1701 16.8972C6.8794 15.0748 3.423 11.7172 1.47708 7.48116L1.47508 7.47916L0.921076 6.25916C0.562496 5.47059 0.487985 4.5822 0.710201 3.74493C0.932418 2.90765 1.43766 2.17313 2.14008 1.66616L3.91308 0.386158C4.27621 0.124079 4.72599 0.0111834 5.16984 0.070711C5.61369 0.130239 6.01784 0.357659 6.29908 0.706158L8.09408 2.93116C8.24221 3.11473 8.3517 3.32636 8.41597 3.55332C8.48024 3.78028 8.49796 4.01789 8.46807 4.25187C8.43818 4.48586 8.36129 4.71138 8.24203 4.9149C8.12277 5.11841 7.9636 5.29572 7.77408 5.43616L7.10408 5.93216C8.23729 8.12818 10.0261 9.91695 12.2221 11.0502L12.7191 10.3802C12.8595 10.1908 13.0368 10.0317 13.2402 9.91257C13.4436 9.7934 13.669 9.71657 13.9029 9.68668C14.1368 9.6568 14.3743 9.67447 14.6011 9.73865C14.828 9.80283 15.0395 9.91219 15.2231 10.0602L17.4481 11.8552C17.7969 12.1364 18.0245 12.5408 18.084 12.9849C18.1435 13.4289 18.0305 13.879 17.7681 14.2422L16.4941 16.0062C15.9898 16.7041 15.2607 17.2072 14.4292 17.431C13.5977 17.6548 12.7146 17.5857 11.9281 17.2352L11.1701 16.8972Z" fill="black"/>
                </svg>

                <h6 className="title-3 mb-0 ms-2">+91 89756 325416</h6>
            </div>
        </div>
        {/* <Link to="/" className="btn btn-logut"><img className="me-3" src={logout} alt="" />Logout</Link> */}
        <Link to="/" className="btn btn-logut" onClick={userLogout}><img className="me-3" src={logout} alt="" />{" "}{t("layout.header.logout")}{" "}</Link>
        </>
    );
};

export default GeneralSettings;
