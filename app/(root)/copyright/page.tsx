"use client";

import React from "react";
import { motion } from "framer-motion";

const Copyright = () => {
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
            Copyright Policy
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
              Copyright Notice
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              All content on sword.lol, including but not limited to text, graphics, logos, images, 
              audio clips, digital downloads, data compilations, and software, is the property of 
              sword.lol or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              User-Generated Content
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Users retain ownership of their uploaded content. By uploading content to sword.lol, 
              users grant sword.lol a worldwide, non-exclusive license to host and display their 
              content in connection with the service. Users are responsible for ensuring they have 
              the rights to upload any content they share.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              Copyright Infringement
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              If you believe that your copyrighted work has been copied in a way that constitutes 
              copyright infringement, please contact us with the following information:
            </p>
            <ul className="text-gray-300 mt-2 ml-6 list-disc space-y-1">
              <li>A description of the copyrighted work that you claim has been infringed</li>
              <li>A description of where the material is located on sword.lol</li>
              <li>Your contact information (name, address, phone number, email)</li>
              <li>A statement that you have a good faith belief that the use is not authorized</li>
              <li>A statement that the information is accurate and that you are the copyright owner</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              Counter-Notification
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              If you believe your content was removed in error, you may file a counter-notification 
              with the same information as above, plus a statement that you consent to the jurisdiction 
              of the federal district court for the judicial district in which you are located.
            </p>
          </section>

          <section>
            <h2 
              className="text-lg font-semibold text-white"
            >
              Repeat Infringers
            </h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              sword.lol has a policy of terminating accounts of users who are repeat infringers of 
              copyright or other intellectual property rights. We reserve the right to remove content 
              and terminate accounts at our sole discretion.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            For copyright inquiries, please contact us at:{" "}
            <a href="mailto:legal@sword.lol" className="text-white hover:underline">
              legal@sword.lol
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
