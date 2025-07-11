import { useEffect, useState } from "react";
import axios from "axios";

export default function TestProtected() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(
      "Tentative de requête vers api/protected/ == TestProtected.jsx"
    );
    const token = localStorage.getItem("access_token");

    if (!token) {
      setMessage(
        "Pas de token trouvé dans le localStorage. == TestProtected.jsx"
      );
      return;
    }

    console.log(token);
    axios
      .get("http://localhost:8000/api/auth/protected/", {
        withCredentials: true, // autorise l'envoi de cookies
        // headers: {               // version qui permet d'effectuer une requête en insérant le token access dans le header
        //     Authorization: `Bearer ${token}`
        // }
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        setMessage("Accès refusé : token invalide ou expiré.");
        console.error("Erreur d'accès : ", err);
      });
  }, []);

  return (
    <div>
      <h2>Test d’accès protégé</h2>
      <p>{message}</p>
    </div>
  );
}
