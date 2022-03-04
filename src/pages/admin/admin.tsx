import { Card } from "components/card/card";
import { Checkbox } from "components/form-components/checkbox/checkbox";
import { Grid } from "components/grid/grid";
import { ICONS } from "components/icon/icon";
import { NavBar, NavBarBtn } from "components/nav-bar/nav-bar";
import { Route, Routes } from "react-router-dom";
import { AdminDoctors } from "./admin-doctors/admin-doctors";
import { AdminDonations } from "./admin-donations/admin-donations";
import { AdminUsers } from "./admin-users/admdin-users";
import "./admin.scss";

const navButtons: NavBarBtn[] = [
  { icon: ICONS.USER, name: "Users", path: "/main/admin/users" },
  { icon: ICONS.USER, name: "Doctors", path: "/main/admin/doctors" },
  { icon: ICONS.USER, name: "Donations", path: "/main/admin/donations" },
];



export const Admin = () => (
  <div className="admin-page">
    <NavBar buttons={navButtons} />
    ADMIN PAGE
    <Routes>
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/doctors" element={<AdminDoctors />} />
      <Route path="/donations" element={<AdminDonations />} />
    </Routes>
  </div>
);
