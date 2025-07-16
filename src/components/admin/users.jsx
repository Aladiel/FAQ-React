import axios from "axios";
import "./users.css";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    first_name: "",
    last_name: "",
    is_staff: false,
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  function fetchUsers() {
    axios
      .get(`${apiUrl}/users/`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function modifyUser(id, first_name, last_name, is_staff) {
    const modifiedUser = {
      first_name: first_name,
      last_name: last_name,
      is_staff: is_staff,
    };
    axios
      .put(`${apiUrl}/users/${id}/`, modifiedUser, {
        withCredentials: true,
      })
      .then((res) => {
        fetchUsers();
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
              <td>
                {editId === user.id ? (
                  <input
                    value={editData.first_name}
                    onChange={(e) =>
                      setEditData({ ...editData, first_name: e.target.value })
                    }
                  />
                ) : (
                  user.first_name || "Null"
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    value={editData.last_name}
                    onChange={(e) =>
                      setEditData({ ...editData, last_name: e.target.value })
                    }
                  />
                ) : (
                  user.last_name || "Null"
                )}
              </td>
              <td>{user.username}</td>
              <td>{user.email || "Null"}</td>
              <td>
                {editId === user.id ? (
                  <select
                    name="is_staff"
                    defaultValue={editData.is_staff}
                    value={editData.is_staff}
                    onChange={(e) => {
                      setEditData({ ...editData, is_staff: e.target.value });
                    }}
                  >
                    <option value="true" >Admin</option>
                    <option value="false" >User</option>
                  </select>
                ) : user.is_staff ? (
                  "Admin"
                ) : (
                  "User"
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <button
                    onClick={() => {
                      modifyUser(
                        user.id,
                        editData.first_name,
                        editData.last_name,
                        editData.is_staff
                      );
                      setEditId(null);
                      setEditData({
                        first_name: "",
                        last_name: "",
                        is_staff: false,
                      });
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(user.id);
                      setEditData({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        is_staff: user.is_staff,
                      });
                    }}
                  >
                    Modify
                  </button>
                )}
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
