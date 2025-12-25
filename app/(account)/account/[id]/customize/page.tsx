"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import {
  FiUser, FiEdit3, FiPackage, FiMapPin,
  FiVideo, FiSave, FiEye, FiCamera, FiCheck, FiArrowRight, FiCpu, FiGrid
} from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
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
      }
    } catch {
      console.error("Failed to update profile.");
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
      if (res.ok) {
        setUsernameError("Node identifier already active");
      } else if (res.status === 404) {
        setUsernameError("");
      }
    } catch (err) {
      console.error("Error checking username");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    setNewUsername(value);
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

  if (loading) return <Loading fullScreen text="FETCHING_CONFIG" />;

  return (
    <div className="flex bg-[#0E0E0E] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      <Sidebar id={id} username={username || "Entity"} />

      <main className="flex-1 relative overflow-y-auto h-screen custom-scrollbar">
        {/* Stage 3: Ambient Shading */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
        </div>

        {/* Global Grain Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

          {/* Initialization Protocol (Setup Steps) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-white/[0.02] border border-white/5 p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-purple-500 animate-pulse rounded-full" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/40 uppercase">
                    Active_Initialization_Protocol
                  </span>
                </div>
                <h2 className="text-xl font-bold italic tracking-tight">System Configuration / {(
                  (profilePic ? 25 : 0) +
                  (newUsername !== "" ? 25 : 0) +
                  (bio !== "" ? 25 : 0) +
                  (theme !== "dark" ? 25 : 10)
                )}% Synced</h2>
              </div>

              <div className="flex gap-4 md:gap-8">
                {[
                  { label: "Avatar", active: !!profilePic, step: "01" },
                  { label: "ID", active: newUsername !== "", step: "02" },
                  { label: "Bio", active: bio !== "", step: "03" },
                  { label: "Theme", active: theme !== "dark", step: "04" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold ${s.active ? "text-purple-400" : "text-white/10"}`}>{s.step}</span>
                      <div className={`h-[2px] w-8 md:w-16 transition-colors duration-1000 ${s.active ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-white/5"}`} />
                    </div>
                    <span className={`text-[8px] uppercase tracking-[0.2em] font-bold ${s.active ? "text-white/60" : "text-white/10"}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Grid Accent for Protocol */}
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-20">
              <div className="absolute top-4 right-4 w-px h-4 bg-white/20" />
              <div className="absolute top-4 right-4 h-px w-4 bg-white/20" />
            </div>
          </motion.div>

          {/* Header Section */}
          <div className="mb-24 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                  IDENTITY_CONFIG / MODULE_02
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic mb-4">
                Engineering<span className="text-gray-600 font-normal">.</span>
              </h1>
              <p className="text-zinc-400 font-medium italic tracking-tight text-lg">
                Modify your architectural footprint in the Sword network.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">

              {/* Profile & Identity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
                {/* Profile Pic Input */}
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.01)" }}
                  className="bg-black/40 p-10 relative group border-r border-white/5"
                >
                  <div className="flex justify-between items-start mb-10">
                    <FiCamera className="text-gray-600 group-hover:text-white transition-colors duration-500" />
                    <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">ASSET_MGR</span>
                  </div>
                  <div className="space-y-6">
                    <label className="block text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 italic">Avatar Endpoint</label>
                    <input
                      type="text"
                      value={profilePic || ""}
                      onChange={(e) => setProfilePic(formatPinterestURL(e.target.value))}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-white transition-all outline-none font-medium placeholder:text-zinc-800 text-white"
                      placeholder="https://..."
                    />
                  </div>
                </motion.div>

                {/* Username Input */}
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.01)" }}
                  className="bg-black/40 p-10 relative group"
                >
                  <div className="flex justify-between items-start mb-10">
                    <FiCpu className="text-gray-600 group-hover:text-white transition-colors duration-500" />
                    <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">DOMAIN_ID</span>
                  </div>
                  <div className="space-y-6">
                    <label className="block text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 italic">Identifier</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        className={`w-full bg-transparent border-b py-4 text-sm transition-all outline-none font-medium placeholder:text-zinc-800 text-white ${usernameError ? "border-red-900" : "border-white/10 focus:border-white"}`}
                        placeholder="@entity"
                      />
                      {isCheckingUsername && (
                        <div className="absolute right-0 bottom-4 w-3 h-3 border border-white/20 border-t-white animate-spin rounded-full" />
                      )}
                    </div>
                    {usernameError && <p className="text-red-900 text-[10px] uppercase font-bold tracking-widest">{usernameError}</p>}
                  </div>
                </motion.div>
              </div>

              {/* Bio / Description */}
              <motion.div
                whileHover={{ backgroundColor: "rgba(255,255,255,0.01)" }}
                className="bg-black/40 border border-white/5 p-10 md:p-16 relative group"
              >
                <div className="flex justify-between items-start mb-10">
                  <FiEdit3 className="text-gray-600 group-hover:text-white transition-colors duration-500" />
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">METADATA_STR</span>
                </div>
                <div className="space-y-8">
                  <label className="block text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 italic">System Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-white transition-all outline-none font-medium placeholder:text-gray-800 resize-none h-32"
                    placeholder="Explain your node's function..."
                  />
                  <div className="flex justify-end text-[9px] font-mono text-gray-700 tracking-widest">
                    CAPACITY / {bio.length}/500
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-px h-2 bg-white/20" />
                  <div className="absolute top-4 right-4 h-px w-2 bg-white/20" />
                </div>
              </motion.div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Video URL */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <FiVideo className="text-gray-600 text-xs" />
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 italic">Visual Stream</label>
                  </div>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-[#121212]/50 border border-white/5 px-6 py-4 text-sm text-white focus:border-white transition-all outline-none font-mono placeholder:text-zinc-800"
                    placeholder="YOUTUBE_ENDPOINT"
                  />
                </div>

                {/* Location */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-gray-600 text-xs" />
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 italic">Coordinate Lock</label>
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#121212]/50 border border-white/5 px-6 py-4 text-sm text-white focus:border-white transition-all outline-none font-mono placeholder:text-zinc-800"
                    placeholder="GEOGRAPHICAL_COORD"
                  />
                </div>
              </div>

              {/* Theme Selection */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <FiGrid className="text-gray-600" />
                  <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 italic">Palette Schema</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden">
                  {themes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={`p-10 text-left transition-all duration-700 group relative ${theme === t.value ? "bg-white text-black" : "bg-black/40 hover:bg-white/[0.02]"}`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xl">{t.icon}</span>
                        {theme === t.value && <FiCheck className="text-xs" />}
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-[0.3em] ${theme === t.value ? "text-black" : "text-zinc-400 group-hover:text-white"}`}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Preview & Finalize */}
            <div className="space-y-12">
              {/* Live Preview Architectural Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-1 border border-white/10 relative group"
              >
                <div className="bg-[#121212]/50 p-12 text-center h-[500px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
                  {/* Preview Shading */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${themes.find(t => t.value === theme)?.gradient || "from-white/10 to-transparent"}`} />

                  <div className="relative z-10 space-y-8">
                    {profilePic ? (
                      <img src={profilePic} className="w-32 h-32 mx-auto grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/10 p-2 object-cover" alt="Preview" />
                    ) : (
                      <div className="w-32 h-32 mx-auto bg-white/[0.03] flex items-center justify-center border border-white/10 border-dashed">
                        <FiUser className="text-4xl text-white/20" />
                      </div>
                    )}
                    <div>
                      <div className="text-2xl font-bold tracking-tighter italic mb-2">@{newUsername || username}</div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">{location || "NETWORK_UNKNOWN"}</p>
                    </div>
                    {bio && <p className="text-xs text-gray-500 max-w-[200px] line-clamp-3 italic font-medium leading-relaxed mx-auto italic">"{bio}"</p>}
                  </div>

                  {/* Corner Markers */}
                  <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/20" />
                  <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/20" />
                  <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/20" />
                  <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/20" />
                </div>
                <div className="py-4 text-center">
                  <span className="text-[9px] font-mono tracking-[0.5em] text-gray-800 uppercase italic">Real-time Projection</span>
                </div>
              </motion.div>

              {/* Finalize Protocol Button */}
              <div className="space-y-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !!usernameError}
                  className={`w-full py-6 flex items-center justify-center gap-6 group transition-all duration-1000 ${isSaving ? "bg-white/5 border border-white/5 text-gray-600" : "bg-white text-black hover:bg-gray-200"}`}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-3">
                      <div className="w-3 h-3 border border-gray-600 border-t-transparent animate-spin" />
                      <span className="text-[10px] font-bold tracking-[0.5em] uppercase">SYNCING_CORE</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Commit Changes</span>
                      <FiSave className="text-xs group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-4 border border-green-500/20 bg-green-500/[0.02] text-green-500 flex items-center justify-center gap-3"
                    >
                      <FiCheck />
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Identity Updated</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Meta Details */}
        <div className="fixed bottom-12 left-12 hidden lg:block z-[2]">
          <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text italic">
            Config_Node / Identity_Sec_Module
          </div>
        </div>
        <div className="fixed bottom-12 right-12 hidden lg:block z-[2]">
          <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-zinc-600 uppercase vertical-text italic">
            Stream_Protocol / Secure_Auth_Layer
          </div>
        </div>

        <style jsx global>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
      </main>
    </div>
  );
};

export default Customize;
