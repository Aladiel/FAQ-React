import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  function fetchUser() {
    axios
      .get(`${apiUrl}/auth/user/`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
