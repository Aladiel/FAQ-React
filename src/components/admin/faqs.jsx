import axios from "axios";
import "./faqs.css";
import { useEffect, useState } from "react";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
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
        console.log(res.data);
        fetchFaqs();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchFaqs();
  }, []);
  return (
    // Generate a table that displays FAQs with these columns Question, Answer, generation, Modify and delete buttons,
    <div className="page-card">
      <h1>Liste des FAQs</h1>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Generation</th>
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
