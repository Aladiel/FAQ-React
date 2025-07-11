import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import "./homepage.css"

export default function HomePage() {
    return (
        <div className="home-page">
            <div className="welcome-card">
                <FontAwesomeIcon icon={faRobot} className="robot-icon" />
                <h1>Welcome to <span>AI FAQs</span></h1>
                <p>Your central place to manage Frequently Asked Questions powered by AI.</p>
            </div>
        </div>        
    )
}