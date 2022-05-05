import { ICONS } from "components/icon/icon";
import { NavBar, NavBarBtn } from "components/nav-bar/nav-bar";
import { ReqDonation } from "./requirements-for-donation/requirements-for-donation";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminDoctors } from "./admin-doctors/admin-doctors";
import { AdminDonations } from "./admin-donations/admin-donations";
import { AdminNewsFeed } from "./admin-newsfeed/admin-newsfeed";
import { AdminUsers } from "./admin-users/admin-users";
import { AdminDonationCenters } from "./admin-dontion-centers/admin-donation-centers";
import "./admin.scss";

const navButtons: NavBarBtn[] = [
  { icon: ICONS.USER, name: "Users", path: "/main/admin/users" },
  // { icon: ICONS.USER, name: "Doctors", path: "/main/admin/doctors" },
  // { icon: ICONS.USER, name: "Donations", path: "/main/admin/donations" },
  { icon: ICONS.USER, name: "Newsfeed", path: "/main/admin/newsfeed" },
  { icon: ICONS.CLIPBOARD_LIST, name: "Centers", path: "/main/admin/centers" },
  { icon: ICONS.CLIPBOARD_LIST, name: "Donation Requirements", path: "/main/admin/requirements-for-donation" },
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
      ADMIN PAGE
      <Routes>
        <Route path={`${location.pathname}`} element={<Navigate replace to={`${location.pathname}/users`} />} />
        <Route path="/users" element={<AdminUsers />} /> //? asta nu exista
        <Route path="/doctors" element={<AdminDoctors />} />
        <Route path="/donations" element={<AdminDonations />} />
        <Route path="/centers" element={<AdminDonationCenters />} />
        <Route path="/requirements-for-donation" element={<ReqDonation />} />
        <Route path="/newsfeed" element={<AdminNewsFeed />} />
        <Route path="/requirements-donation" element={<ReqDonation />} />
        {/* <Route path="/charts" element={<AdminDataCharts />} /> */}
      </Routes>
    </div>
  );
};
