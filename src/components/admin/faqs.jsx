import axios from "axios";
import "./faqs.css";
import { useEffect, useState } from "react";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  function fetchFaqs() {
    axios
      .get(`${apiUrl}/faqs/`, {
        withCredentials: true,
      })
      .then((res) => {
        setFaqs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteFaq(id) {
    axios
      .delete(`${apiUrl}/faqs/${id}/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        fetchFaqs();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function SaveFaq(question, answer, fileid) {
    const faq = {
      question: question,
      answer: answer,
      file_id: fileid,
      generation: "Manual",
    };
    axios
      .post(`${apiUrl}/faqs/`, faq, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        fetchFaqs();
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    fetchFaqs();
    fetchPdfs();
  }, []);
  return (
    // Generate a table that displays FAQs with these columns Question, Answer, generation, Modify and delete buttons,
    <div className="page-card">
      <h1>Liste des FAQs</h1>
      <div className="form-group">
        <label htmlFor="question">Question</label>
        <input type="text" id="question" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="answer">Answer</label>
        <textarea id="answer" className="form-control"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="pdf-file">Choose a PDF file</label>
        <select id="pdf-file" className="form-control">
          <option selected disabled>
            Please choose a PDF file
          </option>
          {pdfs.map((pdf) => (
            <option key={pdf.id} value={pdf.id}>
              {pdf.file_name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={() =>
          SaveFaq(
            document.getElementById("question").value,
            document.getElementById("answer").value,
            document.getElementById("pdf-file").value
          )
        }
      >
        Add FAQ
      </button>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Generation mode</th>
            <th>File</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>{faq.generation}</td>
              <td>{faq.file ? faq.file.file_name : "None"}</td>
              <td>
                <button>Modify</button>
              </td>
              <td>
                <button onClick={() => deleteFaq(faq.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
