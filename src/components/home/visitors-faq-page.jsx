import { useEffect, useState } from "react";
import "./visitors-faq-page.css";
import axios from "axios";

export default function FaqVisitorPage() {
  const [pdfs, setPdfs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  function fetchPdfs() {
    axios
      .get(`${apiUrl}/uploadedfiles/`)
      .then((res) => {
        console.log(res.data);
        setPdfs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchFaqs(pdf_id) {
    axios
      .get(`${apiUrl}/faqs/`, {
        params: {
          file_id: pdf_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFaqs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div className="faq-visitor-page">
      <h1>Choose a file to view FAQs</h1>
      <div className="pdf-list-container">
        <select
          className="pdf-list"
          onChange={(e) => {
            fetchFaqs(e.target.value);
          }}
        >
          <option selected disabled>Select a file</option>
          {pdfs.map((pdf) => (
            <option key={pdf.id} value={pdf.id}>
              {pdf.file_name}
            </option>
          ))}
        </select>
      </div>
      <div className="faq-list">
        <h2>Questions & Answers</h2>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3>Q: {faq.question}</h3>
            <p>A: {faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
