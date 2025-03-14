"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ParamsType = {
  id?: string;
};

const Customize = () => {
  const params = useParams() as ParamsType; // Explicitly type the params
  const id = params?.id || ""; // Fallback to an empty string if undefined

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // ✅ Move this here

  // ✅ Fetch user data
  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      const { data } = await supabase
        .from("users")
        .select("profile_pic, bio, theme, background_video, location, username")
        .eq("id", id)
        .single();

      if (data) {
        setProfilePic(data.profile_pic);
        setBio(data.bio || "");
        setTheme(data.theme || "dark");
        setVideoUrl(data.background_video || "");
        setLocation(data.location || "");
        setUsername(data.username || ""); // ✅ Set the username here
      }
    };

    fetchUserData();
  }, [id]);

  // ✅ Save Changes to Supabase
  const handleSave = async () => {
    if (!id) return alert("User ID not found!");

    const { error } = await supabase
      .from("users")
      .update({
        profile_pic: profilePic,
        bio,
        theme,
        background_video: videoUrl,
        location,
      })
      .eq("id", id);

    if (error) {
      alert("Failed to update profile.");
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white">
      <Sidebar id={id} username={username || "Loading..."} /> {/* ✅ No more error here */}

      {/* Main Content */}
      <motion.main
        className="flex-1 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Customize Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Picture Input */}
          <motion.div className="glassmorphism-card p-6 rounded-xl">
            <h3 className="text-lg mb-4">Profile Picture (URL)</h3>
            <input
              type="text"
              value={profilePic || ""}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-full p-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste image URL here..."
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile"
                className="mt-4 w-24 h-24 rounded-full object-cover mx-auto"
              />
            )}
          </motion.div>

          {/* Bio Input */}
          <motion.div className="glassmorphism-card p-6 rounded-xl">
            <h3 className="text-lg mb-4">Bio</h3>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-28 p-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Tell something about yourself..."
            />
          </motion.div>

          {/* Theme Selection */}
          <motion.div className="glassmorphism-card p-6 rounded-xl">
            <h3 className="text-lg mb-4">Theme</h3>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="dark">Dark Mode</option>
              <option value="light">Light Mode</option>
            </select>
          </motion.div>

          {/* Background Video Input */}
          <motion.div className="glassmorphism-card p-6 rounded-xl">
            <h3 className="text-lg mb-4">Background Video (YouTube URL)</h3>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste YouTube URL..."
            />
          </motion.div>

          {/* Location Input */}
          <motion.div className="glassmorphism-card p-6 rounded-xl">
            <h3 className="text-lg mb-4">Location</h3>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Location"
            />
          </motion.div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-8 bg-purple-600 hover:bg-purple-700 py-3 px-6 rounded-lg font-bold transition"
        >
          Save Changes
        </button>
      </motion.main>
    </div>
  );
};

export default Customize;
