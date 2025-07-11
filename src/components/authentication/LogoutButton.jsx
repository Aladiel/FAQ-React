import axios from "axios";
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
export default function LogoutButton() {
  const { user, setUser } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleLogout = () => {
    axios
      .post(
        `${apiUrl}/auth/logout/`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        window.location.href = "/";
        console.log("Déconnexion réussie :", response.data);
      })
      .catch((err) => {
        console.error("Erreur pendant la déconnexion :", err);
      });
  };

  useEffect(() => {
    if (user) {
      setUser(null);
      handleLogout();
    }
  }, [user, setUser]);
}
