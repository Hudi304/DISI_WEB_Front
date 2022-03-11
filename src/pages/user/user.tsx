import { ICONS } from "components/icon/icon";
import { NavBar, NavBarBtn } from "components/nav-bar/nav-bar";
import { Navigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MyProfile } from "./my-profile/my-profile";
import { NewsBoard } from "./news-board/news-board";
import "./user.scss";

// pages
// user profile
// news board

const navButtons: NavBarBtn[] = [
  { icon: ICONS.USER, name: "My Profile", path: "/main/user/my-profile" },
  { icon: ICONS.NEWS, name: "News Board", path: "/main/user/news-board" },
  // { icon: ICONS.HOME, name: "Donations History", path: "/main/user/donations" },
];

export const User = () => {
  const location = useLocation();

  return (
    <div className="user-page-container">
      <NavBar buttons={navButtons} />
      <Routes>
        <Route path="/" element={<Navigate replace to={`${location.pathname}/my-profile`} />} />
        <Route path="/my-profile" element={<MyProfile />} /> //? asta nu exista
        <Route path="/news-board" element={<NewsBoard />} />
        {/* <Route path="/donations" element={<AdminDonations />} /> */}
      </Routes>
    </div>
  );
};
