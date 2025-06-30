"use client";

import React, { useState, useEffect } from 'react';
import { FaEye, FaUsers, FaBolt, FaCrown } from 'react-icons/fa';
import Link from 'next/link';

const tabs = [
  { id: "views", label: "Top Views", icon: <FaEye className="text-white" /> },
  { id: "followers", label: "Top Followers", icon: <FaUsers className="text-gray-300" /> },
  { id: "engagement", label: "Top Engagement", icon: <FaBolt className="text-gray-400" /> },
];

const mockData = {
  views: [
    { id: 1, username: "alex_creator", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", views: 15420, followers: 1200, badges: ["Verified", "Top Creator"] },
    { id: 2, username: "sarah_artist", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", views: 12850, followers: 980, badges: ["Artist"] },
    { id: 3, username: "mike_tech", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", views: 11230, followers: 850, badges: ["Tech", "Innovator"] },
    { id: 4, username: "emma_design", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", views: 9870, followers: 720, badges: ["Designer"] },
    { id: 5, username: "john_gaming", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", views: 8650, followers: 650, badges: ["Gamer", "Streamer"] },
  ],
  followers: [
    { id: 1, username: "alex_creator", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", views: 15420, followers: 1200, badges: ["Verified", "Top Creator"] },
    { id: 2, username: "sarah_artist", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", views: 12850, followers: 980, badges: ["Artist"] },
    { id: 3, username: "mike_tech", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", views: 11230, followers: 850, badges: ["Tech", "Innovator"] },
    { id: 4, username: "emma_design", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", views: 9870, followers: 720, badges: ["Designer"] },
    { id: 5, username: "john_gaming", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", views: 8650, followers: 650, badges: ["Gamer", "Streamer"] },
  ],
  engagement: [
    { id: 1, username: "alex_creator", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", views: 15420, followers: 1200, badges: ["Verified", "Top Creator"] },
    { id: 2, username: "sarah_artist", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", views: 12850, followers: 980, badges: ["Artist"] },
    { id: 3, username: "mike_tech", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", views: 11230, followers: 850, badges: ["Tech", "Innovator"] },
    { id: 4, username: "emma_design", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", views: 9870, followers: 720, badges: ["Designer"] },
    { id: 5, username: "john_gaming", profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", views: 8650, followers: 650, badges: ["Gamer", "Streamer"] },
  ],
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("views");
  const [data, setData] = useState(mockData.views);

  useEffect(() => {
    setData(mockData[activeTab as keyof typeof mockData]);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            <FaCrown className="inline-block mr-2 text-white animate-bounce" /> Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">Discover the top creators on sword.lol</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-900/50 p-2 rounded-2xl backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full font-semibold flex items-center gap-2 transition ${activeTab === tab.id ? "bg-white text-black" : "bg-black/30 text-gray-300"}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
          <table className="w-full">
            <thead>
              <tr className="text-white text-sm">
                <th className="text-left py-4 px-3">Rank</th>
                <th className="text-left py-4 px-3">Creator</th>
                <th className="text-right py-4 px-3">Views</th>
                <th className="text-right py-4 px-3">Followers</th>
                <th className="text-left py-4 px-3">Badges</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, idx) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-white/5 transition">
                  <td className="py-2 px-3 font-bold text-lg text-white">{idx + 1}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-3">
                      <img src={user.profile_pic} alt={user.username} className="w-9 h-9 rounded-full border-2 border-white" />
                      <Link href={`/${user.username}`} className="hover:underline text-gray-300">{user.username}</Link>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right text-gray-300">{user.views.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-gray-300">{user.followers.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    <div className="flex gap-1 flex-wrap">
                      {user.badges.map((badge, i) => (
                        <span key={i} className="bg-white text-black text-xs px-2 py-1 rounded-full font-semibold">{badge}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 