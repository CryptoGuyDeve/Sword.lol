"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { FaBan, FaTrash, FaUserSlash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AdminPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (!error) setUsers(data || []);
  };

  const handleBanUser = async (userId: string) => {
    await supabase.from("users").update({ is_banned: true }).eq("id", userId);
    fetchUsers();
  };

  const handleUnbanUser = async (userId: string) => {
    await supabase.from("users").update({ is_banned: false }).eq("id", userId);
    fetchUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    await supabase.from("users").delete().eq("id", userId);
    fetchUsers();
  };

  const handleEditUser = (user: any) => {
    setEditingUserId(user.id);
    setEditData({ ...user });
  };

  const handleUpdateUser = async () => {
    await supabase.from("users").update(editData).eq("id", editingUserId);
    setEditingUserId(null);
    fetchUsers();
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {users.map((user) => (
          <motion.div
            key={user.id}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <div className="flex gap-4">
                <button onClick={() => handleEditUser(user)} className="text-blue-400">
                  <FaEdit />
                </button>
                <button onClick={() => handleBanUser(user.id)} className="text-yellow-400">
                  <FaBan />
                </button>
                <button onClick={() => handleUnbanUser(user.id)} className="text-green-400">
                  <FaUserSlash />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-400">
                  <FaTrash />
                </button>
              </div>
            </div>

            {editingUserId === user.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full bg-gray-700 p-2 rounded-md text-white"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full bg-gray-700 p-2 rounded-md text-white"
                  placeholder="Bio"
                />
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full bg-gray-700 p-2 rounded-md text-white"
                  placeholder="Location"
                />
                <button
                  onClick={handleUpdateUser}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  <FaSave className="inline mr-2" />
                  Save
                </button>
                <button
                  onClick={() => setEditingUserId(null)}
                  className="bg-red-500 text-white px-4 py-2 ml-4 rounded-md"
                >
                  <FaTimes className="inline mr-2" />
                  Cancel
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <p>Email: <span className="font-medium text-white">{user.email}</span></p>
                <p>Bio: <span className="font-medium text-white">{user.bio || "N/A"}</span></p>
                <p>Location: <span className="font-medium text-white">{user.location || "N/A"}</span></p>
                <p>Theme: <span className="font-medium text-white">{user.theme || "Default"}</span></p>
                <p>Background Video: <span className="font-medium text-white">{user.background_video || "None"}</span></p>
                <p>Profile Views: <span className="font-medium text-white">{user.profile_views || 0}</span></p>
                <p>Social Links: <span className="font-medium text-white">{JSON.stringify(user.social_links || {})}</span></p>
                <p>Badges: <span className="font-medium text-white">{JSON.stringify(user.badges || [])}</span></p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;
