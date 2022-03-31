import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "pages/main/main";
import { SignUp } from "pages/sign-up/sign-up";
import { ForgotPassword } from "pages/reset-password/forgot-password";
import { Login } from 'pages/login/login';
import { ResetPassword } from "pages/reset-password/reset-password";

export const App = (props: any) => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
};
