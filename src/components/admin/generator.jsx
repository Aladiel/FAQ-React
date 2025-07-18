import { use, useContext, useEffect, useState } from "react";
import "./generator.css";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function FAQsGenerator() {
  const { user, setUser } = useContext(UserContext);
  const [pdfs, setPdfs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [pdfid, setPdfid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedFaqs, setSavedFaqs] = useState([]);
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

  function fetchGeneratedFaqs(pdf_id) {
    setLoading(true);
    axios
      .get(`${apiUrl}/faqs/${pdf_id}/generate/`, {
        withCredentials: true,
      })
      .then((res) => {
        setFaqs(res.data);
        setSavedFaqs(Array(res.data.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function saveFaq(new_faq, index) {
    new_faq.generation = "AI";
    new_faq.file_id = pdfid;
    axios
      .post(`${apiUrl}/faqs/`, new_faq, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const updatedSavedFaqs = [...savedFaqs];
        updatedSavedFaqs[index] = true;
        setSavedFaqs(updatedSavedFaqs);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchPdfs();
  }, []);
  return (
    <>
      <div className="page-card">
        <h1>FAQs AI Generator</h1>
        <div className="form-group">
          <label htmlFor="pdf-select">Choose a PDF file</label>
          <select
            id="pdf-select"
            className="form-control"
            onChange={(e) => {
              setPdfid(e.target.value);
            }}
          >
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
          onClick={() => fetchGeneratedFaqs(pdfid)}
        >
          Generate FAQs
        </button>
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Generating FAQs...</p>
          </div>
        )}
      </div>
      {faqs.length > 0 ? (
        <div className="faqs-display">
          <h2>Generated FAQs</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="form-group">
                <label htmlFor={`question-${index}`}>Question</label>
                <input
                  type="text"
                  id={`question-${index}`}
                  className="form-control"
                  value={faq.question}
                  onChange={(e) => {
                    const newFaqs = [...faqs];
                    newFaqs[index].question = e.target.value;
                    setFaqs(newFaqs);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`answer-${index}`}>Answer</label>
                <textarea
                  id={`answer-${index}`}
                  className="form-control"
                  value={faq.answer}
                  onChange={(e) => {
                    const newFaqs = [...faqs];
                    newFaqs[index].answer = e.target.value;
                    setFaqs(newFaqs);
                  }}
                ></textarea>
              </div>
              <button
                className="btn"
                disabled={savedFaqs[index]}
                onClick={() => saveFaq(faq, index)}
              >
                {savedFaqs[index] ? "Saved" : "Save"}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
