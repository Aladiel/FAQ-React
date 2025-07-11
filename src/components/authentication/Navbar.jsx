import LogoutButton from "./LogoutButton.jsx";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faQuestionCircle,
  faFilePdf,
  faSignOutAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="navbar">
      <div className="logo">Admin Panel</div>
      <nav className="nav-links">
        <a href="/">
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          Home
        </a>
        <a href="/faqs">
          <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" />
          Faqs
        </a>
        {user && user.is_staff ? (
          <>
            <a href="/admin">
              <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
              Dashboard
            </a>
            <a href="/admin/users">
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              Users
            </a>
            <a href="/admin/faqs">
              <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" />
              FAQs
            </a>
            <a href="/admin/pdfs">
              <FontAwesomeIcon icon={faFilePdf} className="nav-icon" />
              PDFs
            </a>
          </>
        ) : null}
        {user ? (
          <a href="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            Logout
          </a>
        ) : (
          <a href={`${apiUrl}/auth/login/google-oauth2/`}>
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            Login
          </a>
        )}
      </nav>
    </div>
  );
}
