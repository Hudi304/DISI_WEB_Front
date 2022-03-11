import { ICONS } from "components/icon/icon";
import { NavBar, NavBarBtn } from "components/nav-bar/nav-bar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminDoctors } from "./admin-doctors/admin-doctors";
import { AdminDonations } from "./admin-donations/admin-donations";
import { AdminDonationCenters } from "./admin-dontion-centers/admin-donation-centers";
import { AdminUsers } from "./admin-users/admdin-users";
import "./admin.scss";

const navButtons: NavBarBtn[] = [
  { icon: ICONS.USER, name: "Users", path: "/main/admin/users" },
  { icon: ICONS.USER, name: "Doctors", path: "/main/admin/doctors" },
  { icon: ICONS.USER, name: "Donations", path: "/main/admin/donations" },
  { icon: ICONS.CLIPBOARD_LIST, name: "Centers", path: "/main/admin/centers" },
];

// Donation center list  👙
// Add center  🧮
// minimum requirements update  👙
// news page donors guide etc   👙
// add doctor 👙
// data chats 👙

export const Admin = () => {
  const location = useLocation();

  return (
    <div className="admin-page">
      <NavBar buttons={navButtons} />
      <Routes>
        <Route path={`${location.pathname}`} element={<Navigate replace to={`${location.pathname}/users`} />} />
        <Route path="/users" element={<AdminUsers />} /> //? asta nu exista
        <Route path="/doctors" element={<AdminDoctors />} />
        <Route path="/donations" element={<AdminDonations />} />
        <Route path="/centers" element={<AdminDonationCenters />} />
        {/* <Route path="/charts" element={<AdminDataCharts />} /> */}
        {/* <Route path="/news" element={<AdminNews />} /> */}
        {/* <Route path="/requirements" element={<AdminRequirements />} /> */}
      </Routes>
    </div>
  );
};
