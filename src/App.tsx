import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "pages/main/main";
import { Login } from "pages/login/login";
import { SignUp } from "pages/sign-up/sign-up";

export const App = (props: any) => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </Router>
  );
};
