"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Docs = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: `
        Welcome to sword.lol! This guide will help you get started with creating your personalized bio link page.

        ## Quick Start
        1. Sign up for a free account
        2. Choose your username
        3. Customize your profile
        4. Add your social media links
        5. Share your sword.lol URL

        ## Features Overview
        - Custom Bio Links
        - File Hosting
        - Analytics Dashboard
        - Social Media Integration
        - Custom Domain Support
        - Priority Support
      `
    },
    {
      id: "customization",
      title: "Customization",
      content: `
        Learn how to customize your sword.lol profile to match your brand and style.

        ## Profile Settings
        - Profile Picture: Upload a high-quality image (recommended: 400x400px)
        - Bio: Write a compelling description about yourself
        - Theme: Choose from various color schemes and layouts
        - Background: Add custom backgrounds or videos

        ## Link Management
        - Add unlimited social media links
        - Customize link titles and icons
        - Set link priorities
        - Enable/disable specific links
      `
    },
    {
      id: "analytics",
      title: "Analytics",
      content: `
        Track your profile performance with our comprehensive analytics dashboard.

        ## Available Metrics
        - Profile Views
        - Link Clicks
        - Visitor Demographics
        - Traffic Sources
        - Peak Activity Times

        ## Understanding Your Data
        - Views: Total number of profile visits
        - Clicks: Number of link interactions
        - Conversion Rate: Percentage of visitors who click links
        - Geographic Data: Where your visitors are located
      `
    },
    {
      id: "file-hosting",
      title: "File Hosting",
      content: `
        Host and share files securely with sword.lol's file hosting service.

        ## Supported File Types
        - Images (JPG, PNG, GIF, WebP)
        - Videos (MP4, WebM, MOV)
        - Documents (PDF, DOC, TXT)
        - Audio (MP3, WAV, OGG)
        - Archives (ZIP, RAR)

        ## File Limits
        - Free Plan: 100MB per file
        - Premium Plan: Unlimited file size
        - Total Storage: Varies by plan

        ## Sharing Options
        - Direct download links
        - Embed codes for websites
        - Password protection
        - Expiration dates
      `
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-10">
            Documentation
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about using sword.lol to create your perfect bio link page.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? "text-white font-semibold" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50"
            >
              <h2 className="text-2xl font-bold mb-6">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {sections.find(s => s.id === activeSection)?.content}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
