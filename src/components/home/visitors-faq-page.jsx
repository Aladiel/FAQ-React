import { useState } from "react";
import "./visitors-faq-page.css";

export default function FaqVisitorPage() {
    const [selectedPdf, setSelectedPdf] = useState('Document 1');
    const pdfData = {
    'Document 1': [
        { question: 'What is the capital of France?', answer: 'The capital of France is Paris.' },
        { question: 'What is the currency of Japan?', answer: 'The currency of Japan is Yen.' }
    ],
    'Document 2': [
        { question: 'How does photosynthesis work?', answer: 'Photosynthesis uses sunlight to produce food in plants.' },
        { question: 'What is H2O?', answer: 'H2O is the chemical formula for water.' }
    ],
    'Document 3': [
        { question: 'What is the highest mountain?', answer: 'Mount Everest is the highest mountain in the world.' },
        { question: 'What is gravity?', answer: 'Gravity is the force that attracts objects toward the center of the Earth.' }
    ]
};
  return (
    <div className="faq-visitor-page">
      <h1>FAQs</h1>

      <div className="faq-select-container">
        <label htmlFor="pdf-select">Select a PDF:</label>
        <select
          id="pdf-select"
          value={selectedPdf}
          onChange={(e) => setSelectedPdf(e.target.value)}
        >
          {Object.keys(pdfData).map((pdf) => (
            <option key={pdf} value={pdf}>
              {pdf}
            </option>
          ))}
        </select>
      </div>

      <div className="faq-list">
        <h2>Questions & Answers</h2>
        {pdfData[selectedPdf].map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3>Q: {faq.question}</h3>
            <p>A: {faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
