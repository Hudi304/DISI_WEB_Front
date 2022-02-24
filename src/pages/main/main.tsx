import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import "./main.scss";
import { Login } from "pages/login/login";

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const MainComponent: FC<Props> = ({}: Props) => {
  return (
    <div className="main">
      Mare aplicatie la DISI
      <Routes>
        <Route path="./login" element={<Login />} />
      </Routes>
    </div>
  );
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const Main = connect(mapProps, mapDispatch)(MainComponent);
