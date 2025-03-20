"use client";

import React from "react";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#090909] via-[#121212] to-[#1a1a1a] text-white flex items-center justify-center px-6 mt-15">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-500 opacity-20 blur-[250px]" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-500 opacity-15 blur-[200px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl w-full bg-[#181818]/80 p-8 md:p-12 rounded-xl shadow-lg backdrop-blur-lg"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text text-center"
        >
          Privacy Policy
        </motion.h1>

        {/* Last Updated */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center text-gray-400 text-sm mt-2"
        >
          Last Updated: {new Date().toLocaleDateString()}
        </motion.p>

        {/* Sections */}
        <div className="mt-6 space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              1. Introduction
            </h2>
            <p>
              Welcome to **sward.lol**. Your privacy is important to us, and we are committed to
              protecting your personal data. This policy outlines how we collect, use, and
              safeguard your information.
            </p>
          </motion.div>

          {/* Data We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              2. What Data We Collect
            </h2>
            <p>We may collect the following data:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Name and contact details</li>
              <li>Username and profile information</li>
              <li>Email address</li>
              <li>IP address and device details</li>
              <li>Usage behavior and interactions</li>
            </ul>
          </motion.div>

          {/* How We Use Your Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              3. How We Use Your Data
            </h2>
            <p>Your data is used to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and personalize your experience</li>
              <li>Improve website security and performance</li>
              <li>Communicate updates and promotional content</li>
              <li>Prevent fraud and unauthorized access</li>
            </ul>
          </motion.div>

          {/* Cookies and Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              4. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience. You can adjust cookie settings in your browser
              preferences.
            </p>
          </motion.div>

          {/* Third-Party Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              5. Third-Party Services
            </h2>
            <p>
              We may share data with trusted third-party services for hosting,
              analytics, and customer support. We ensure that these services
              comply with strict privacy regulations.
            </p>
          </motion.div>

          {/* Security Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              6. Data Protection & Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              personal data. However, no online service is 100% secure.
            </p>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access and request a copy of your data</li>
              <li>Correct or delete personal data</li>
              <li>Withdraw consent for certain data usage</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <h2 className="text-lg font-semibold text-purple-400">
              8. Contact Us
            </h2>
            <p>
              If you have any privacy concerns, contact us at:
              <br />
              📧 <span className="text-purple-300">m.faizurrehman.business@gmail.com</span>
            </p>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold text-white transition-shadow shadow-md hover:shadow-purple-500/50"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Privacy;
