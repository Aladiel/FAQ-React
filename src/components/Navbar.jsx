import LogoutButton from "./LogoutButton.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Navbar() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/auth/user/", {
            withCredentials: true,
        })
            .then(res => {
                setUsername(res.data.username);
            })
            .catch(() => {
                setUsername(null);
            });
    }, []);


    return (
        <nav style={{display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#f0f0f0"}}>
            <div>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/protected" style={{marginLeft: "1rem"}}>Test protégé</Link>
            </div>
            <div>
                {username && <span style={{marginRight: "1rem"}}>Bonjour {username}</span>}
                <LogoutButton />
            </div>
        </nav>
    )


}