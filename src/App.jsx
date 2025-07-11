import "./App.css";
import Navbar from "./components/authentication/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/authentication/LoginPage.jsx";
import Users from "./components/admin/users.jsx";
import { useEffect, useState } from "react";
import DashboardPage from "./components/authentication/DashboardPage.jsx";
import Faqs from "./components/admin/faqs.jsx";
import HomePage from "./components/home/homepage.jsx";
import Pdfs from "./components/admin/pdfs.jsx";
import FaqVisitorPage from "./components/home/visitors-faq-page.jsx";

function App() {
  const [access_token, setAccess_token] = useState(null);
  const [refresh_token, setRefresh_token] = useState(null);
  const [user, setUser] = useState(null);

  function getAccess_token() {
    setAccess_token(localStorage.getItem("access_token"));
  }
  function getRefresh_token() {
    setRefresh_token(localStorage.getItem("refresh_token"));
  }
  function getUser() {
    setUser(localStorage.getItem("user"));
  }

  useEffect(() => {
    getAccess_token();
    getRefresh_token();
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/faqs" element={<Faqs />} />
        <Route path="/admin/pdfs" element={<Pdfs />} />
        <Route path="/faqs" element={<FaqVisitorPage /> } />
      </Routes>
    </>
  );
}

export default App;
