import axios from "axios";
import "./faqs.css";
import { useEffect, useState } from "react";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    question: "",
    answer: "",
    generation: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  function fetchFaqs() {
    axios
      .get(`${apiUrl}/faqs/`, {
        withCredentials: true,
      })
      .then((res) => {
        setFaqs(res.data);
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

  function modifyFaq(id, question, answer, generation) {
    const modifiedFaq = {
      question: question,
      answer: answer,
      generation: generation,
    };
    axios
      .put(`${apiUrl}/faqs/${id}/`, modifiedFaq, {
        withCredentials: true,
      })
      .then((res) => {
        fetchFaqs();
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
    <div className="page-card">
      <h1>FAQs List</h1>
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
              <td>
                {editId === faq.id ? (
                  <input
                    value={editData.question}
                    onChange={(e) =>
                      setEditData({ ...editData, question: e.target.value })
                    }
                  />
                ) : (
                  faq.question
                )}
              </td>
              <td>
                {editId === faq.id ? (
                  <input
                    value={editData.answer}
                    onChange={(e) =>
                      setEditData({ ...editData, answer: e.target.value })
                    }
                  />
                ) : (
                  faq.answer
                )}
              </td>
              <td>
                {editId === faq.id ? (
                  <select value={editData.generation} onChange={(e) => {
                    setEditData({ ...editData, generation: e.target.value })
                  }}>
                    <option value="Manual">Manual</option>
                    <option value="AI">AI</option>
                  </select>
                ) : (
                  faq.generation
                )}
              </td>
              <td>{faq.file ? faq.file.file_name : "None"}</td>
              <td>
                {editId === faq.id ? (
                  <button
                    onClick={() => {
                      modifyFaq(
                        faq.id,
                        editData.question,
                        editData.answer,
                        editData.generation
                      );
                      setEditId(null);
                      setEditData({ question: "", answer: "", generation: "" });
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(faq.id);
                      setEditData({
                        question: faq.question,
                        answer: faq.answer,
                        generation: faq.generation,
                      });
                    }}
                  >
                    Modify
                  </button>
                )}
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
