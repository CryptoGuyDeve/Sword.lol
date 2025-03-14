"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaUserEdit, FaEye, FaSignOutAlt } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AccountPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/signup");
        return;
      }
      if (data.user.id !== id) {
        router.push("/");
        return;
      }
      setLoading(true);
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username, id, profile_views")
        .eq("id", id)
        .single();

      if (userError) {
        setError("Error fetching user data");
      } else {
        setUserData(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, [id, router]);

  const handleUsernameChange = async () => {
    if (!newUsername.trim()) return;
    const { error } = await supabase
      .from("users")
      .update({ username: newUsername })
      .eq("id", id);
    if (error) {
      alert("Failed to update username");
    } else {
      setUserData((prev: any) => ({ ...prev, username: newUsername }));
      setNewUsername("");
      alert("Username updated successfully!");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white">
      <Sidebar username={userData.username} id={userData.id} />

      {/* Main Content */}
      <motion.main
        className="flex-1 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Account Overview
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Username Card */}
          <motion.div
            className="glassmorphism-card w-full md:max-w-md p-6 rounded-xl"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-lg mb-4 flex items-center gap-2">
              <FaUserEdit className="text-purple-400" /> Username: {userData.username}
            </p>
            <input
              type="text"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-3 rounded-md bg-black/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleUsernameChange}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md transition"
            >
              Update Username
            </button>
          </motion.div>

          {/* Profile Views Card */}
          <motion.div
            className="glassmorphism-card w-full md:w-64 p-6 text-center rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-300">
              <FaEye className="inline-block text-purple-400 mr-2" /> Profile Views
            </h3>
            <p className="text-5xl font-extrabold text-purple-500">
              SOON WILL BE ADDED
            </p>
          </motion.div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 text-gray-300 hover:text-red-500 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </motion.main>
    </div>
  );
};

export default AccountPage;
