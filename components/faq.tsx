'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "How does our platform work?", answer: "Our platform allows users to create customizable bio pages, link socials, and securely store and share files." },
    { question: "Is there a free plan available?", answer: "Yes! We offer a free plan with essential features, and a premium plan for those who want advanced customization." },
    { question: "What features are included in the premium plan?", answer: "The premium plan includes exclusive badges, custom profile layouts, advanced effects, metadata SEO customization, and much more." },
    { question: "How secure is our platform?", answer: "We use industry-leading encryption and security protocols to ensure your data and files remain safe and private." },
    { question: "How long does it take to set up a profile?", answer: "Creating a profile takes only a few minutes! Just sign up, customize your page, and start sharing your links." },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-16 px-6 text-center">

      
      <h2 className="text-2xl md:text-3xl font-bold mb-10">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden ${openIndex === index ? 'bg-[#1a1a1a] border border-blue-500 shadow-blue-500/20' : 'bg-[#121212]'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none hover:bg-[#1a1a1a] transition-all duration-300"
              onClick={() => toggleFAQ(index)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400"
              >
                ▼
              </motion.span>
            </motion.button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-5 text-gray-300 overflow-hidden"
            >
              <p className="py-3">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
