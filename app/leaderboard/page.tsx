"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FaCrown, FaEye, FaUsers, FaBolt } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const tabs = [
  { id: "views", label: "Top Views", icon: <FaEye className="text-purple-400" /> },
  { id: "followers", label: "Top Followers", icon: <FaUsers className="text-green-400" /> },
  { id: "engagement", label: "Top Engagement", icon: <FaBolt className="text-yellow-400" /> },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("views");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      let { data } = await supabase
        .from("users")
        .select("id, username, profile_pic, profile_views, badges")
        .order("profile_views", { ascending: false })
        .limit(50);
      // Fetch followers count for each user
      if (data) {
        for (let i = 0; i < data.length; i++) {
          const user = data[i];
          const { count } = await supabase
            .from("follows")
            .select("id", { count: "exact", head: true })
            .eq("following_id", user.id);
          data[i] = { ...user, followers: count || 0 } as any;
        }
      }
      setUsers(data || []);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  // Sort users for each tab
  let sortedUsers = [...users];
  if (activeTab === "views") {
    sortedUsers.sort((a, b) => (b.profile_views || 0) - (a.profile_views || 0));
  } else if (activeTab === "followers") {
    sortedUsers.sort((a, b) => (b.followers || 0) - (a.followers || 0));
  } else if (activeTab === "engagement") {
    sortedUsers.sort((a, b) => ((b.profile_views || 0) + (b.followers || 0)) - ((a.profile_views || 0) + (a.followers || 0)));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#23233a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          <FaCrown className="inline-block mr-2 text-yellow-400 animate-bounce" /> Leaderboard
        </h1>
        <div className="flex justify-center gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-full font-semibold flex items-center gap-2 transition ${activeTab === tab.id ? "bg-purple-600 text-white" : "bg-black/30 text-gray-300"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-black/30 rounded-2xl shadow-lg p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-purple-300 text-sm">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">User</th>
                <th className="py-2 px-3">Views</th>
                <th className="py-2 px-3">Followers</th>
                <th className="py-2 px-3">Badges</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
              ) : sortedUsers.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No users found.</td></tr>
              ) : (
                sortedUsers.map((user, idx) => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-purple-900/10 transition">
                    <td className="py-2 px-3 font-bold text-lg text-purple-400">{idx + 1}</td>
                    <td className="py-2 px-3 flex items-center gap-3">
                      <img src={user.profile_pic} alt={user.username} className="w-9 h-9 rounded-full border-2 border-purple-400" />
                      <Link href={`/${user.username}`} className="hover:underline text-blue-400">{user.username}</Link>
                    </td>
                    <td className="py-2 px-3">{user.profile_views || 0}</td>
                    <td className="py-2 px-3">{user.followers || 0}</td>
                    <td className="py-2 px-3">
                      {user.badges && user.badges.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.badges.slice(0, 3).map((badge: string, i: number) => (
                            <span key={i} className="bg-purple-700 text-xs px-2 py-1 rounded-full text-white font-semibold">{badge}</span>
                          ))}
                          {user.badges.length > 3 && <span className="text-xs text-gray-400">+{user.badges.length - 3} more</span>}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 