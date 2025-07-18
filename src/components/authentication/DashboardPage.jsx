import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./dashboard.css";
import axios from "axios";

export default function DashboardPage() {
  const { user, setUser } = useContext(UserContext);
  const [usersCount, setUsersCount] = useState(0);
  const [faqsCount, setFaqsCount] = useState(0);
  const [pdfsCount, setPdfsCount] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  function fetchAllCounts() {
    axios
      .get(`${apiUrl}/users/count/`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsersCount(res.data.count);
      })
      .catch((error) => {console.error("Error fetching users count:", error)});

    axios
      .get(`${apiUrl}/uploadedfiles/count/`, {
        withCredentials: true,
      })
      .then((res) => {
        setPdfsCount(res.data.count);
      })
      .catch((error) => {console.error(error)});

    axios
      .get(`${apiUrl}/faqs/count/`, {
        withCredentials: true,
      })
      .then((res) => {
        setFaqsCount(res.data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchAllCounts();
  }, []);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Number of users</h2>
          <p>{usersCount} user</p>
        </div>
        <div className="card">
          <h2>Number of Faqs</h2>
          <p>{faqsCount} faq</p>
        </div>
        <div className="card">
          <h2>Number of Pdf files</h2>
          <p>{pdfsCount} file</p>
        </div>
      </div>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Users</h2>
          <p>Manage users</p>
          <a href="/admin/users">Go to Users</a>
        </div>
        <div className="card">
          <h2>FAQs</h2>
          <p>Manage FAQs</p>
          <a href="/admin/faqs">Go to FAQs</a>
        </div>
        <div className="card">
          <h2>PDF Files</h2>
          <p>Manage PDF files</p>
          <a href="/admin/pdfs">Go to PDF Files</a>
        </div>
        <div className="card">
          <h2>FAQs Generator</h2>
          <p>Generate FAQs from PDFs files</p>
          <a href="/admin/generator">Go to Generator</a>
        </div>
      </div>
    </div>
  );
}
