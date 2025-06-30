'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does sword.lol work?",
      answer: "sword.lol is an all-in-one platform that lets you create stunning bio pages, host files securely, and manage your online presence. Simply sign up, customize your profile, add your links, and share your unique sword.lol URL with the world.",
      category: "Getting Started"
    },
    {
      question: "Is there a free plan available?",
      answer: "Absolutely! We offer a generous free plan with essential features including custom bio links, basic customization, social media integration, and 100MB file hosting. Perfect for getting started with your online presence.",
      category: "Pricing"
    },
    {
      question: "What features are included in the premium plan?",
      answer: "Our premium plan unlocks exclusive features like advanced profile layouts, custom fonts & colors, typewriter animations, special effects, unlimited file hosting, priority support, custom domain support, and exclusive premium badges.",
      category: "Premium Features"
    },
    {
      question: "How secure is your platform?",
      answer: "Security is our top priority. We use industry-leading encryption, secure file storage, regular security audits, and follow best practices to ensure your data and files remain completely safe and private.",
      category: "Security"
    },
    {
      question: "How long does it take to set up a profile?",
      answer: "Creating your profile takes just a few minutes! Sign up, choose your username, customize your page with our intuitive tools, add your links, and you're ready to share your professional bio page.",
      category: "Setup"
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! Premium users can connect their own custom domain to their sword.lol profile. This gives you a professional branded URL while keeping all the powerful features of our platform.",
      category: "Customization"
    },
    {
      question: "Do you offer analytics?",
      answer: "Yes! All users get access to our analytics dashboard showing profile views, link clicks, visitor demographics, and more. Premium users get advanced analytics with detailed insights and export capabilities.",
      category: "Analytics"
    },
    {
      question: "What file types can I host?",
      answer: "We support all major file types including images, videos, documents, music, and more. Free users get 100MB storage, while premium users enjoy unlimited file hosting with no restrictions.",
      category: "File Hosting"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-black text-white py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 via-black to-gray-800/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-white/10 to-gray-400/10 border border-white/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <HelpCircle className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-gray-300">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need to know about sword.lol. Can't find the answer you're looking for? 
            Join our Discord community for support.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-white/10 border border-white/30 shadow-lg shadow-white/10' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/8'
              }`}
            >
              <motion.button
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none transition-all duration-300 group"
                onClick={() => toggleFAQ(index)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-xs font-medium text-white uppercase tracking-wide">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 text-gray-400 group-hover:text-white transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-white/10 to-gray-400/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-bold text-white">
                Still Have Questions?
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Join our Discord community to get help from our team and connect with other creators.
            </p>
            <motion.a
              href="https://discord.gg/pwQaFQuRpN"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 rounded-xl font-semibold text-black transition-all duration-300 shadow-lg hover:shadow-white/25"
            >
              <span>Join Discord Community</span>
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
