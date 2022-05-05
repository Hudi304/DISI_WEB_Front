import { ICONS } from "components/icon/icon";
import { NavBar, NavBarBtn } from "components/nav-bar/nav-bar";
import { AdminDonations } from "pages/admin/admin-donations/admin-donations";
import { Navigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { DonationHistory } from "./donation-history/donation-history";
import { MyProfile } from "./my-profile/my-profile";
import { NewsBoard } from "./news-board/news-board";
import { QrCode } from "./qr-code/qrcode";
import "./user.scss";

const navButtons: NavBarBtn[] = [
  { icon: ICONS.USER, name: "My Profile", path: "/main/user/my-profile" },
  { icon: ICONS.NEWS, name: "News Board", path: "/main/user/news-board" },
  { icon: ICONS.VIEW, name: "QrCodes", path: "/main/user/qr-code" },
  { icon: ICONS.BELL, name: "Donation History", path: "/main/user/donation-history" },
];

export const User = () => {
  const location = useLocation();

  return (
    <div className="user-page-container">
      <NavBar buttons={navButtons} />
      <Routes>
        <Route path="/" element={<Navigate replace to={`${location.pathname}/my-profile`} />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/news-board" element={<NewsBoard />} />
        <Route path="/qr-code" element={<QrCode />} />
        <Route path="/donation-history" element={<DonationHistory />} />
      </Routes>
    </div>
  );
};
