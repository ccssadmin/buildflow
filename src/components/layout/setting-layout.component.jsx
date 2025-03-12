import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import SettingNav from "./settingnav/settingnav.component";

const SettingLayout = () => {
  
  return (
    <Fragment>

      <div className={`setting-layout-container`}>
        <SettingNav />
        <div className="body-content">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default SettingLayout;
