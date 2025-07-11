"use client"; // Mark this as a Client Component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext"
import "./homepage.css";
import { useContext } from "react";

export default function HomePage() { 
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="home-page">
      <div className="welcome-card">
        <FontAwesomeIcon icon={faRobot} className="robot-icon" />
        <h1>
          Welcome to <span>AI FAQs</span>
        </h1>
        <p>
          Your central place to manage Frequently Asked Questions powered by AI.
        </p>
        <p>Hi {user ? user.first_name : "Guest"}</p>
      </div>
    </div>
  );
}
