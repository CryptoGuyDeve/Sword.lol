"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const sections = [
  {
    title: "Introduction",
    id: "introduction",
    content: `
      This website is built with Next.js, TailwindCSS, Supabase, and Framer Motion. 
      It aims to deliver a modern, aesthetic UI/UX experience with smooth animations, Discord API integration, and advanced customization features.
    `,
  },
  {
    title: "Setup & Installation",
    id: "setup",
    content: `
      1. Install Node.js and npm/yarn.
      2. Run \`npx create-next-app@latest\`.
      3. Install dependencies: \`npm install tailwindcss framer-motion @supabase/supabase-js\`.
      4. Configure TailwindCSS: \`npx tailwindcss init -p\`.
      5. Set up Supabase project and get your API keys.
    `,
  },
  {
    title: "Authentication",
    id: "authentication",
    content: `
      We're using Supabase OAuth for Discord authentication:
      1. Create an OAuth app on Discord Developer Portal.
      2. Add the client ID and secret to your Supabase dashboard.
      3. Use Supabase's built-in auth functions for login and sign-out.
      4. Store user data (e.g., bio, profile picture, and YouTube URL) directly in the \`users\` table.
    `,
  },
  {
    title: "UI/UX Design",
    id: "uiux",
    content: `
      - TailwindCSS for rapid styling.
      - Framer Motion for smooth animations and hover effects.
      - React Icons for modern iconography.
      - Custom sidebar and modern design inspired by guns.lol.
    `,
  },
  {
    title: "API Integration",
    id: "api",
    content: `
      - Fetch Discord live game status via Discord's API.
      - Supabase REST API for user data.
      - YouTube API for background video support.
      - Real-time updates with Supabase's \`onSnapshot\` feature.
    `,
  },
  {
    title: "Database Structure",
    id: "database",
    content: `
      - Supabase Database Schema:
      - Users Table: Store user ID, bio, profile picture, theme, and YouTube URL.
      - Links Table: Social media links for each user.
      - OAuth Table: Store Discord tokens for authentication.
    `,
  },
  {
    title: "Deployment",
    id: "deployment",
    content: `
      1. Connect your GitHub repo to Vercel.
      2. Add environment variables (Supabase API URL and anon key).
      3. Deploy with one click.
      4. Automatic CI/CD for future updates.
    `,
  },
];

const Page = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0e0e0e] text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-700 fixed h-full">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-10">
          Documentation
        </h1>
        <ul className="space-y-6">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`cursor-pointer flex items-center gap-3 ${
                activeSection === section.id
                  ? "text-purple-500 font-semibold"
                  : "text-gray-400"
              } hover:text-white transition`}
              onClick={() => handleScrollTo(section.id)}
            >
              <FaCheckCircle size={18} />
              {section.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-12 space-y-24 mt-17">
        {sections.map((section) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-purple-400">
              {section.title}
            </h2>
            <p className="text-gray-300 leading-7 whitespace-pre-line">
              {section.content}
            </p>
          </motion.section>
        ))}
      </main>
    </div>
  );
};

export default Page;
