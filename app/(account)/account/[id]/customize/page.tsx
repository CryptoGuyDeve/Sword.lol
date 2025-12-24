"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Edit3,
  Palette,
  MapPin,
  Video,
  Save,
  Eye,
  Sparkles,
  Camera
} from "lucide-react";


type ParamsType = {
  id?: string;
};

const Customize = () => {
  const params = useParams() as ParamsType;
  const id = params?.id || "";

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProfilePic(data.profile_pic);
          setBio(data.bio || "");
          setTheme(data.theme || "dark");
          setVideoUrl(data.background_video || "");
          setLocation(data.location || "");
          setUsername(data.username || "");
          setNewUsername(data.username || "");
        }
      } catch (e) {
        console.error("Error fetching user", e);
      }
    };

    fetchUserData();
  }, [id]);


  const handleSave = async () => {
    if (!id) return alert("User ID not found!");

    setIsSaving(true);

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_pic: profilePic,
          bio,
          theme,
          background_video: videoUrl,
          location,
          username: newUsername !== username ? newUsername : undefined
        })
      });

      if (res.ok) {
        setUsername(newUsername);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update profile.");
      }
    } catch {
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };


  const checkUsernameAvailability = async (u: string) => {
    if (!u.trim() || u === username) {
      setUsernameError("");
      return;
    }

    setIsCheckingUsername(true);
    setUsernameError("");

    try {
      const res = await fetch(`/api/users/${u}`);
      // If user exists and it's not the current user (handled by logic above but also in backend usually)
      if (res.ok) {
        // User exists
        setUsernameError("Username is already taken");
      } else if (res.status === 404) {
        // User not found - available
        setUsernameError("");
      } else {
        setUsernameError("Error checking username");
      }
    } catch (err) {
      setUsernameError("Error checking username availability");
    } finally {
      setIsCheckingUsername(false);
    }
  };


  const handleUsernameChange = (value: string) => {
    setNewUsername(value);
    // Debounce username availability check
    const timeoutId = setTimeout(() => {
      checkUsernameAvailability(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const formatPinterestURL = (url: string) => {
    const match = url.match(/https:\/\/i\.pinimg\.com\/.*?\.(jpg|png|jpeg)/);
    return match ? match[0] : url;
  };

  const themes = [
    { value: "dark", label: "Dark Mode", icon: "🌙", gradient: "from-gray-900 to-black" },
    { value: "light", label: "Light Mode", icon: "☀️", gradient: "from-blue-50 to-white" },
    { value: "purple", label: "Purple Theme", icon: "💜", gradient: "from-purple-900 to-indigo-900" },
    { value: "ocean", label: "Ocean Blue", icon: "🌊", gradient: "from-blue-900 to-cyan-900" },
    { value: "sunset", label: "Sunset", icon: "🌅", gradient: "from-orange-500 to-pink-500" },
    { value: "forest", label: "Forest", icon: "🌲", gradient: "from-green-900 to-emerald-900" },
  ];

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <Sidebar id={id} username={username || "Loading..."} />

      <motion.main
        className="flex-1 p-8 md:p-12 relative z-10 min-h-screen overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text"
          >
            Customize Your Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl"
          >
            Make your profile uniquely yours with custom themes, bio, and personal touches.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Picture Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Camera className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Profile Picture</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={profilePic || ""}
                    onChange={(e) => setProfilePic(formatPinterestURL(e.target.value))}
                    className="w-full p-4 bg-white/5 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                    placeholder="Paste your image URL here..."
                  />
                </div>

                {profilePic && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center"
                  >
                    <div className="relative">
                      <img
                        src={profilePic}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50 shadow-2xl"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Username Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-indigo-500/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <User className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Username</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Choose your username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      className={`w-full p-4 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-400 transition-all ${usernameError
                        ? 'border-red-500/50 focus:ring-red-500'
                        : 'border-indigo-500/30 focus:ring-indigo-500'
                        }`}
                      placeholder="Enter your username..."
                    />
                    {isCheckingUsername && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {usernameError && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <span>⚠️</span>
                      {usernameError}
                    </p>
                  )}
                  {!usernameError && newUsername && (
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
                      <span>✅</span>
                      Username is available
                    </p>
                  )}
                </div>

                <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
                  <p className="text-sm text-indigo-300 mb-2">
                    <strong>Username Guidelines:</strong>
                  </p>
                  <ul className="text-xs text-indigo-200 space-y-1">
                    <li>• 3-20 characters long</li>
                    <li>• Letters, numbers, and underscores only</li>
                    <li>• Must be unique across all users</li>
                    <li>• Cannot be changed frequently</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Edit3 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Bio</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tell your story
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-32 p-4 bg-white/5 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all"
                  placeholder="Share something about yourself, your interests, or what you do..."
                />
                <p className="text-xs text-gray-400 mt-2">
                  {bio.length}/500 characters
                </p>
              </div>
            </motion.div>

            {/* Theme Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <Palette className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Theme</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(themeOption.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${theme === themeOption.value
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/25'
                      : 'border-gray-600 bg-white/5 hover:border-purple-500/50'
                      }`}
                  >
                    <div className="text-2xl mb-2">{themeOption.icon}</div>
                    <div className="text-sm font-medium text-white">{themeOption.label}</div>
                    <div className={`w-full h-2 rounded-full mt-2 bg-gradient-to-r ${themeOption.gradient}`}></div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Location & Video Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl rounded-3xl p-6 border border-green-500/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Location</h3>
                </div>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-green-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Where are you from?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Video className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Background Video</h3>
                </div>

                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-orange-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="YouTube video URL"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-500/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Live Preview</h3>
                </div>

                {/* Preview Card */}
                <div className={`rounded-2xl p-6 border-2 border-purple-500/30 bg-gradient-to-br ${themes.find(t => t.value === theme)?.gradient || 'from-gray-900 to-black'}`}>
                  <div className="text-center">
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-purple-500/20 border-4 border-white/20 flex items-center justify-center">
                        <User className="w-8 h-8 text-purple-400" />
                      </div>
                    )}

                    <h4 className="text-xl font-bold text-white mb-2">
                      @{newUsername || username || "username"}
                    </h4>

                    {bio && (
                      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                        {bio}
                      </p>
                    )}

                    {location && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                        <MapPin className="w-4 h-4" />
                        {location}
                      </div>
                    )}

                    <div className="flex justify-center gap-4 text-sm">
                      <span className="text-purple-300">1.2K followers</span>
                      <span className="text-blue-300">5.6K views</span>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full mt-6 p-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${isSaving
                    ? 'bg-gray-600 cursor-not-allowed'
                    : usernameError || !newUsername.trim()
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-purple-500/25'
                    }`}
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : usernameError || !newUsername.trim() ? (
                    <>
                      <span>⚠️</span>
                      Fix Username Issues
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center"
                    >
                      Profile updated successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Customize;
