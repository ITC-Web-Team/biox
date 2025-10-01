import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is BioX?",
      answer: "BioX is the biotechnology club of IIT Bombay, bringing together students passionate about the intersection of biology, technology, and engineering."
    },
    {
      question: "Why should I choose biotechnology?",
      answer: "Biotechnology is at the forefront of solving global challenges in healthcare, agriculture, and environmental sustainability. It offers endless opportunities for innovation and impact."
    },
    {
      question: "What is our flagship event?",
      answer: "Our flagship event is the New Frontiers of Biotech symposium, where we collaborate with leading institutions to explore cutting-edge biotechnology research and innovations."
    },
    {
      question: "What are the prerequisites to join?",
      answer: "No specific prerequisites! We welcome students from all departments who are curious about biotechnology and eager to learn and contribute to our community."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-accordion">
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.question}</span>
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <div className={`faq-answer ${activeIndex === index ? 'expanded' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;