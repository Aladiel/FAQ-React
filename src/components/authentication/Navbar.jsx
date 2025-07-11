import LogoutButton from "./LogoutButton.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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
export default function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/user/", {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setUsername(null);
      });
  }, []);

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
        <a href="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          Logout
        </a>
      </nav>
    </div>
  );
}
