"use client";

import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Loading from '@/components/Loading';
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import {
  FaSnapchatGhost, FaYoutube, FaInstagram, FaTwitter, FaGithub, FaTiktok,
  FaTelegram, FaDiscord, FaKickstarter, FaSpotify, FaSoundcloud,
  FaTwitch, FaLinkedin, FaSteam, FaPinterest, FaPatreon,
  FaBitcoin, FaEthereum, FaMonero, FaAddressCard, FaPlus, FaTrash
} from 'react-icons/fa';
import { FiEdit3, FiExternalLink, FiGlobe, FiShare2, FiLink, FiArrowRight } from "react-icons/fi";

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

const socialPlatforms = [
  { name: 'YouTube', icon: <FaYoutube />, key: 'youtube' },
  { name: 'Instagram', icon: <FaInstagram />, key: 'instagram' },
  { name: 'Twitter', icon: <FaTwitter />, key: 'twitter' },
  { name: 'Snapchat', icon: <FaSnapchatGhost />, key: 'snapchat' },
  { name: 'GitHub', icon: <FaGithub />, key: 'github' },
  { name: 'TikTok', icon: <FaTiktok />, key: 'tiktok' },
  { name: 'Telegram', icon: <FaTelegram />, key: 'telegram' },
  { name: 'Discord', icon: <FaDiscord />, key: 'discord' },
  { name: 'Kick', icon: <FaKickstarter />, key: 'kick' },
  { name: 'Spotify', icon: <FaSpotify />, key: 'spotify' },
  { name: 'SoundCloud', icon: <FaSoundcloud />, key: 'soundcloud' },
  { name: 'Twitch', icon: <FaTwitch />, key: 'twitch' },
  { name: 'Linkedin', icon: <FaLinkedin />, key: 'linkedin' },
  { name: 'Steam', icon: <FaSteam />, key: 'steam' },
  { name: 'Pinterest', icon: <FaPinterest />, key: 'pinterest' },
  { name: 'Patreon', icon: <FaPatreon />, key: 'patreon' },
  { name: 'Bitcoin', icon: <FaBitcoin />, key: 'bitcoin' },
  { name: 'Ethereum', icon: <FaEthereum />, key: 'ethereum' },
  { name: 'Monero', icon: <FaMonero />, key: 'monero' },
  { name: 'Custom Url', icon: <FaAddressCard />, key: 'customurl' },
];

const Links = () => {
  const params = useParams();
  const id = params?.id as string;
  const [url, setUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<any>({});
  const [username, setUsername] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (id) {
      fetchUserLinks(id);
    }
  }, [id]);

  const fetchUserLinks = async (uid: string) => {
    try {
      const res = await fetch(`/api/users/${uid}`);
      if (res.ok) {
        const data = await res.json();
        setSocialLinks(data.social_links || {});
        setUsername(data.username || 'Unknown');
      }
    } catch (error) {
      console.error("Error fetching links", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEditLink = async () => {
    if (!selectedPlatform || !url || !id) return;

    const updatedLinks = { ...socialLinks, [selectedPlatform]: url };

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ social_links: updatedLinks })
      });

      if (res.ok) {
        setSocialLinks(updatedLinks);
        setUrl('');
        setSelectedPlatform(null);
        setEditMode(false);
      }
    } catch (e) {
      console.error("Error updating links", e);
    }
  };

  const handleDeleteLink = async (platform: string) => {
    const updatedLinks = { ...socialLinks };
    delete updatedLinks[platform];

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ social_links: updatedLinks })
      });

      if (res.ok) {
        setSocialLinks(updatedLinks);
      }
    } catch (e) {
      console.error("Error deleting link", e);
    }
  };

  const handleEdit = (platform: string, currentUrl: string) => {
    setSelectedPlatform(platform);
    setUrl(currentUrl);
    setEditMode(true);
  };

  if (loading) return <Loading fullScreen text="LOADING_LINKS" />;

  return (
    <div className="flex bg-[#0E0E0E] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      <Sidebar id={id || ''} username={username || 'User'} />

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

          {/* Header Section */}
          <div className="mb-24 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                  SOCIAL_LINKS / MODULE_03
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic mb-4">
                Social Links<span className="text-gray-600 font-normal">.</span>
              </h1>
              <p className="text-zinc-400 font-medium italic tracking-tight text-lg">
                Connect your social profiles to your Sword page.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">

            {/* Left/Middle Column - Link Selection */}
            <div className="lg:col-span-2 space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <FiShare2 className="text-gray-600" />
                  <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 italic">Add New Link</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden shadow-2xl">
                  {socialPlatforms.map((platform, i) => (
                    <motion.button
                      key={platform.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => {
                        setSelectedPlatform(platform.key);
                        setEditMode(false);
                      }}
                      className="aspect-square flex flex-col items-center justify-center gap-4 bg-black/40 p-8 hover:bg-white text-gray-500 hover:text-black transition-all duration-700 group relative"
                    >
                      <div className="text-2xl transition-transform duration-700 group-hover:scale-110">
                        {platform.icon}
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        {platform.name}
                      </span>
                      {/* Corner Accents on Hover */}
                      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-black/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-black/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    </motion.button>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Active Links */}
            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <FiGlobe className="text-gray-600" />
                  <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 italic">Your Active Links</h3>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {Object.entries(socialLinks).length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 border border-white/5 bg-white/[0.01] text-center space-y-4"
                      >
                        <FiLink className="text-2xl text-white/10 mx-auto" />
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 italic">No links added yet</p>
                      </motion.div>
                    ) : (
                      Object.entries(socialLinks).map(([platform, value]) => (
                        <motion.div
                          key={platform}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white/[0.02] border border-white/5 p-6 flex items-center justify-between group hover:bg-white/[0.05] transition-all duration-500"
                        >
                          <div className="flex items-center gap-5 overflow-hidden">
                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-xl text-gray-400 group-hover:text-white transition-colors">
                              {socialPlatforms.find(p => p.key === platform)?.icon || <FaAddressCard />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">{platform}</p>
                              <p className="text-xs font-medium italic text-white/80 truncate opacity-60 group-hover:opacity-100 transition-opacity">/{String(value).split('/').pop()}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                              onClick={() => handleEdit(platform, value as string)}
                              className="p-2 hover:bg-white hover:text-black text-gray-400 transition-all"
                            >
                              <FiEdit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteLink(platform)}
                              className="p-2 hover:bg-red-500 hover:text-white text-gray-400 transition-all"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Pro Tip/Meta */}
              <div className="p-8 border-l border-white/5 bg-white/[0.01]">
                <p className="text-[9px] font-mono tracking-widest text-gray-600 leading-relaxed uppercase">
                  Tip: Links are instantly added to your public profile and optimized for search engines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Edit/Add Modal */}
        <AnimatePresence>
          {selectedPlatform && (
            <AlertDialog open={Boolean(selectedPlatform)} onOpenChange={() => setSelectedPlatform(null)}>
              <AlertDialogContent className="bg-[#0E0E0E] text-white border border-white/10 rounded-none max-w-lg p-0 overflow-hidden">
                <div className="relative p-12 space-y-12">
                  {/* Background Grid Accent */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                  />

                  <div className="relative z-10 flex justify-between items-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/40 uppercase">
                          LINK_INPUT / {selectedPlatform}
                        </span>
                      </div>
                      <AlertDialogTitle className="text-4xl font-bold italic tracking-tighter">
                        {editMode ? "Update Link." : "Add Link."}
                      </AlertDialogTitle>
                    </div>
                    <div className="text-6xl opacity-[0.03] absolute -right-4 -top-4 font-bold italic pointer-events-none">
                      {selectedPlatform.toUpperCase()}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 italic">Profile or Page URL</label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-[#121212] border border-white/10 p-5 text-sm focus:border-white transition-all outline-none font-medium placeholder:text-zinc-800"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-4">
                    <AlertDialogAction
                      onClick={handleAddOrEditLink}
                      className="w-full bg-white text-black hover:bg-gray-200 py-6 text-[10px] font-bold tracking-[0.5em] uppercase rounded-none transition-all flex items-center justify-center gap-3"
                    >
                      {editMode ? "Update Link" : "Save Link"}
                      <FiArrowRight />
                    </AlertDialogAction>
                    <AlertDialogCancel className="w-full bg-white/5 border border-white/5 text-white/40 hover:bg-white/10 py-4 text-[9px] font-bold tracking-[0.4em] uppercase rounded-none transition-all mt-0 border-none">
                      Cancel
                    </AlertDialogCancel>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </AnimatePresence>

        <style jsx global>{`
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

export default Links;
