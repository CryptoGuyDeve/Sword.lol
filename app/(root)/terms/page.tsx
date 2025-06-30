"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from 'next/link';

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-white opacity-10 blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-400 opacity-5 blur-[150px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text text-center"
          >
            Terms of Service
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              By accessing and using sword.lol, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              2. Use License
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on sword.lol's website 
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under 
              this license you may not:
            </p>
            <ul className="text-gray-300 mt-2 ml-6 list-disc space-y-1">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on sword.lol's website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              3. User Content
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Users may upload, post, or otherwise contribute content to sword.lol. By doing so, you grant sword.lol a worldwide, 
              non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with the service.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              4. Privacy Policy
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
              to understand our practices regarding the collection and use of your personal information.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              5. Disclaimer
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              The materials on sword.lol's website are provided on an 'as is' basis. sword.lol makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of 
              merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              6. Limitations
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              In no event shall sword.lol or its suppliers be liable for any damages (including, without limitation, damages for loss 
              of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 
              sword.lol's website, even if sword.lol or a sword.lol authorized representative has been notified orally or in writing 
              of the possibility of such damage.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <Link 
            href="/"
            className="px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-full font-semibold transition-shadow shadow-md hover:shadow-white/50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
