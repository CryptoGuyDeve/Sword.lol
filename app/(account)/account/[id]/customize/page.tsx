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

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

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
    <div className="flex bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
      <Sidebar id={id} username={username || "Loading..."} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Customize Profile</h1>
            <p className="text-gray-400">Personalize your public profile appearance and details.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-6">

              {/* Profile Picture & Username Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Picture */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-lg">Profile Picture</h3>
                  </div>
                  <div className="space-y-4">
                    {profilePic ? (
                      <div className="flex justify-center mb-4">
                        <img src={profilePic} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-white/10" />
                      </div>
                    ) : null}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Image URL</label>
                      <input
                        type="text"
                        value={profilePic || ""}
                        onChange={(e) => setProfilePic(formatPinterestURL(e.target.value))}
                        className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder-gray-600 transition-all"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-semibold text-lg">Username</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Username</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => handleUsernameChange(e.target.value)}
                          className={`w-full px-4 py-2.5 bg-[#1a1a1a] border rounded-lg focus:outline-none focus:ring-1 text-sm placeholder-gray-600 transition-all ${usernameError ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-indigo-500'
                            }`}
                          placeholder="username"
                        />
                        {isCheckingUsername && (
                          <div className="absolute right-3 top-2.5">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      {usernameError ? (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><span className="text-xs">⚠️</span> {usernameError}</p>
                      ) : newUsername && !isCheckingUsername ? (
                        <p className="text-green-400 text-xs mt-2 flex items-center gap-1"><span className="text-xs">✅</span> Available</p>
                      ) : null}
                    </div>
                    <div className="text-xs text-gray-500">
                      3-20 characters. Letters, numbers, underscores.
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Edit3 className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-lg">Bio</h3>
                </div>
                <div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full h-24 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm placeholder-gray-600 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex justify-end mt-2">
                    <span className="text-xs text-gray-600">{bio.length}/500</span>
                  </div>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <h3 className="font-semibold text-lg">Theme</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      onClick={() => setTheme(themeOption.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${theme === themeOption.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/5 bg-[#1a1a1a] hover:bg-[#222]'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{themeOption.icon}</span>
                        <span className="text-sm font-medium">{themeOption.label}</span>
                      </div>
                      <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${themeOption.gradient}`}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Details Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-lg">Location</h3>
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm placeholder-gray-600"
                    placeholder="City, Country"
                  />
                </div>

                {/* Background Video */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="w-5 h-5 text-orange-400" />
                    <h3 className="font-semibold text-lg">Background Video</h3>
                  </div>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm placeholder-gray-600"
                    placeholder="YouTube URL"
                  />
                </div>
              </div>

            </div>

            {/* Right Column - Live Preview & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">

                {/* Live Preview Card */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <h3 className="font-semibold text-lg text-gray-200">Live Preview</h3>
                  </div>

                  <div className={`rounded-xl p-6 border border-white/10 bg-gradient-to-br ${themes.find(t => t.value === theme)?.gradient || 'from-gray-900 to-black'} shadow-lg`}>
                    <div className="text-center">
                      {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white/50 shadow-md object-cover" />
                      ) : (
                        <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-white/10 flex items-center justify-center border-2 border-white/20">
                          <User className="w-8 h-8 text-white/50" />
                        </div>
                      )}
                      <div className="font-bold text-lg text-white mb-1">@{newUsername || username || "username"}</div>
                      {bio && <p className="text-xs text-white/80 line-clamp-2 mb-3">{bio}</p>}
                      {location && (
                        <div className="flex items-center justify-center gap-1.5 text-xs text-white/70">
                          <MapPin className="w-3 h-3" /> {location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={isSaving || !!usernameError || (newUsername !== username && newUsername === "")}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${isSaving
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm py-2 rounded-lg"
                    >
                      Changes saved successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
