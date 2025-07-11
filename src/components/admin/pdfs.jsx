import { useEffect, useState } from "react";
import "./pdfs.css";
import axios from "axios";

export default function Pdfs() {
  const [pdfs, setPdfs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  function fetchPdfs() {
    
    axios
      .get(`${apiUrl}/uploadedfiles/`, {
        withCredentials: true,
      })
      .then((res) => {
        setPdfs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div className="page-card">
      <h1>Liste des PDFs</h1>
      <table>
        <thead>
          <tr>
            <th>Nom du fichier</th>
            <th>Chemin du fichier</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf) => (
            <tr key={pdf.id}>
              <td>{pdf.file_name || "Null"}</td>
              <td>{pdf.file_path}</td>
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
