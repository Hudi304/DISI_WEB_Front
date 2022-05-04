import { ICONS } from "components/icon/icon";
import { NavBar, NavBarBtn } from "components/nav-bar/nav-bar";
import { Route, Routes } from "react-router-dom";
import { ConfirmationDonation } from "./confirm-donation/confirm-donation";
import "./doctor.scss";

const navButtons: NavBarBtn[] = [
  { icon: ICONS.USER, name: "ConfirmationDonation", path: "/main/doctor/confirm_donation" },
];

export const Doctor = () => {
  return <div className="h-full">
    <NavBar buttons={navButtons} />
    DOCTOR PAGE
      <Routes>
        <Route path="/confirm_donation" element={<ConfirmationDonation />} />
      </Routes>
  </div>;
};
