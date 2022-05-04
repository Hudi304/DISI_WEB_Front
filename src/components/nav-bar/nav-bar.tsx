import { Button } from "components/button/button";
import { Icon, ICONS } from "components/icon/icon";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootDispatch, RootState } from "store";

import "./nav-bar.scss";

export type NavBarBtn = {
  name: string;
  icon: any;
  path: string;
};

export type NavBarProps = {
  buttons: NavBarBtn[];
};

export const NavBar = ({ buttons }: NavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = useDispatch<RootDispatch>().login.logout;

  const setLoggingOutFalseRed = useDispatch<RootDispatch>().login.setLoggingOutFalseRed;

  const loggingOut = useSelector((state: RootState) => state.login.loggingOut);

  useEffect(() => {
    if (loggingOut) {
      navigate("/login");
      setLoggingOutFalseRed();
    }
  }, [loggingOut]);

  return (
    <div className="navbar-container">
      <div className="appBar">
        <button className="logOut-btn" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="navbar">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            className={`navbar-btn ${location.pathname.includes(btn.path) ? "active" : ""}`}
            variant="icon-btn"
            onClick={() => {
              navigate(btn.path);
            }}
          >
            <Icon icon={btn.icon} size={6} />
            {btn.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
