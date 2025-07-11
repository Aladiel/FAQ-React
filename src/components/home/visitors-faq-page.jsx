import { useEffect, useState } from "react";
import "./visitors-faq-page.css";
import axios from "axios";

export default function FaqVisitorPage() {
  const [faqs, setfaqs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  function fetchPdfs() {
    axios
      .get(`${apiUrl}/faqs/`, {
        withCredentials: true,
      })
      .then((res) => {
        setfaqs(res.data);
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
      <h1>FAQs</h1>
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
