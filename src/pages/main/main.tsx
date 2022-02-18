import { FC } from "react";
import { Routes } from "react-router-dom";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import "./main.scss";

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const MainComponent: FC<Props> = ({}: Props) => {
  return (
    <div className="main">
      Mare aplicatie la DISI
      <Routes></Routes>
    </div>
  );
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const Main = connect(mapProps, mapDispatch)(MainComponent);
