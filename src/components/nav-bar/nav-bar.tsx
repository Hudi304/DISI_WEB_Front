import { Button } from "components/button/button";
import { Icon, ICONS } from "components/icon/icon";
import { useLocation, useNavigate } from "react-router-dom";

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
  return (
    <div className="navbar-container">
      <div className="appBar">
        <button className="logOut-btn">Logout</button>
      </div>
      <div className="navbar">
        {buttons.map((btn, index) => (
          <Button
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
