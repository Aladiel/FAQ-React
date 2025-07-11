import axios from "axios";
import "./users.css";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  function fetchUsers() {
    axios
      .get(`${apiUrl}/users/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-card">
      <h1>Liste des Utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name || "Null"}</td>
              <td>{user.last_name || "Null"}</td>
              <td>{user.username}</td>
              <td>{user.email || "Null"}</td>
              <td>{user.is_staff ? "Admin" : "User"}</td>
              <td>
                <button>Modifier</button>
              </td>
              <td>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
