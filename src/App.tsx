import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "pages/main/main";
import { SignUp } from "pages/sign-up/sign-up";
import { Admin } from "pages/admin/admin";
import { Doctor } from "pages/doctor/doctor";
import { User } from "pages/user/user";
import { ResetPassword } from "pages/reset-password/reset-password";
import { Login } from 'pages/login/login';

export const App = (props: any) => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/user" element={<User />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
};
