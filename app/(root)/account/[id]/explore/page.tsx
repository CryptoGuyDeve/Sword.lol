"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  username: string;
  profile_pic: string;
  bio: string;
}

const ExplorePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, profile_pic, bio");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };

    const fetchCurrentUser = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) return;

      const userId = sessionData.session.user.id;
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, username")
        .eq("id", userId)
        .single();

      if (!userError && userData) {
        setCurrentUser(userData);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar username={currentUser?.username || "Guest"} id={currentUser?.id || "0"} />

      {/* Main Content */}
      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Explore Users
          </h1>

          {/* Search Bar */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Input
              type="text"
              placeholder="Search users..."
              className="w-full p-3 bg-black/40 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          {/* User List */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-40 w-full bg-gray-800 rounded-lg"
                  />
                ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Link
                    key={user.id}
                    href={`/users/${user.username}`}
                    target="_blank"
                    className="block rounded-lg p-4 bg-black/50 border border-gray-800 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <motion.div
                      className="flex flex-col items-center glassmorphism-card p-4 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={user.profile_pic}
                        alt={user.username}
                        className="w-20 h-20 rounded-full border-4 border-gray-700 shadow-md"
                      />
                      <h2 className="mt-3 font-semibold text-lg">{user.username}</h2>
                      <p className="text-xs text-gray-400 text-center mt-1">
                        {user.bio}
                      </p>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-400 col-span-full">No users found.</p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExplorePage;
