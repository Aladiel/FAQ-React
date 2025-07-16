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

  function SavePdfFile(file){
    const formData = new FormData();
    formData.append('file_path', file);
    axios
      .post(`${apiUrl}/uploadedfiles/`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        fetchPdfs();
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div className="page-card">
      <h1>Liste des PDFs</h1>
      
      <div className="form-group">
        <label htmlFor="pdf-file">Ajouter un nouveau PDF</label>
        <input type="file" id="pdf-file" className="form-control"/>
      </div>
      <button onClick={() => SavePdfFile(document.getElementById("pdf-file").files[0])} className="btn btn-primary">
        Ajouter
      </button>
      
      <table>
        <thead>
          <tr>
            <th>Nom du fichier</th>
            <th>Chemin du fichier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf) => (
            <tr key={pdf.id}>
              <td>{pdf.file_name || "Null"}</td>
              <td>{pdf.file_path}</td>
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
