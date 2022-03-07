import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import "./main.scss";
import { Admin } from "pages/admin/admin";
import { Doctor } from "pages/doctor/doctor";
import { User } from "pages/user/user";

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const MainComponent: FC<Props> = ({}: Props) => {
  return (
    <div className="main">
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/doctor/*" element={<Doctor />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const Main = connect(mapProps, mapDispatch)(MainComponent);
