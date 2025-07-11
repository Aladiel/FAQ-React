import "./App.css";
import Navbar from "./components/authentication/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/authentication/LoginPage.jsx";
import Users from "./components/admin/users.jsx";
import { useContext, useEffect } from "react";
import DashboardPage from "./components/authentication/DashboardPage.jsx";
import Faqs from "./components/admin/faqs.jsx";
import HomePage from "./components/home/homepage.jsx";
import Pdfs from "./components/admin/pdfs.jsx";
import FaqVisitorPage from "./components/home/visitors-faq-page.jsx";
import LogoutButton from "./components/authentication/LogoutButton.jsx";
import { UserContext } from "./contexts/UserContext.jsx";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        {user && user.is_staff ? (
          <>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/faqs" element={<Faqs />} />
          <Route path="/admin/pdfs" element={<Pdfs />} />
          </>
        ) : null}
        <Route path="/faqs" element={<FaqVisitorPage />} />
      </Routes>
    </>
  );
}
export default App;
