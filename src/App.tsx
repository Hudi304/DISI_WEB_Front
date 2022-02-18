import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "pages/auth/auth";
import { Main } from "pages/main/main";

export const App = (props: any) => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/main" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};
