import axios from "axios";

export default function LogoutButton() {

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/auth/logout/", {}, {
            withCredentials: true,
        })
            .then(() => {
                window.location.href = "/login";
            })
            .catch((err) => {
                console.error("Erreur pendant la déconnexion :", err);
            })
    };

    return (
        <button onClick={handleLogout}>Se déconnecter</button>
    );
}