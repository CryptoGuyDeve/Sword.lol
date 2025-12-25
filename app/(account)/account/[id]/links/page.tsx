"use client";

import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Loading from '@/components/Loading';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { FaSnapchatGhost, FaYoutube, FaInstagram, FaTwitter, FaGithub, FaTiktok, FaTelegram, FaDiscord, FaEdit, FaTrash, FaKickstarter, FaSpotify, FaSoundcloud, FaTwitch, FaLinkedin, FaSteam, FaPinterest, FaPatreon, FaBitcoin, FaEthereum, FaMonero, FaAddressCard } from 'react-icons/fa';

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
  const [url, setUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<any>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setUserId(u.id);
      fetchUserLinks(u.id);
    }
  }, [session]);


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
    if (!selectedPlatform || !url || !userId) return;

    const updatedLinks = { ...socialLinks, [selectedPlatform]: url };

    try {
      const res = await fetch(`/api/users/${userId}`, {
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
      const res = await fetch(`/api/users/${userId}`, {
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

  if (loading) return <Loading fullScreen text="SYNCING_IDENTITY" />;

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
      <Sidebar id={userId || ''} username={username || 'Loading...'} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Social Links</h1>
            <p className="text-gray-400">Connect your profiles to your account.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Left: Add Links */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                Add a Link
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.key}
                    onClick={() => {
                      setSelectedPlatform(platform.key);
                      setEditMode(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 bg-[#121212] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all gap-3 group aspect-square"
                  >
                    <div className="text-2xl text-gray-500 group-hover:text-white transition-colors duration-300">{platform.icon}</div>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Existing Links */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Your Links
              </h2>
              {Object.entries(socialLinks).length === 0 ? (
                <div className="p-12 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 gap-4">
                  <FaAddressCard className="text-4xl opacity-20" />
                  <p>No links added yet. Click an icon to add one.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(socialLinks).map(([platform, value]) => (
                    <div key={platform} className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 rounded-xl group hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl text-gray-300">
                          {socialPlatforms.find(p => p.key === platform)?.icon || <FaAddressCard />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium capitalize text-white">{platform}</span>
                          <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 truncate hover:text-blue-400 transition-colors block max-w-[200px] sm:max-w-xs">
                            {value as string}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(platform, value as string)} className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors" title="Edit">
                          <FaEdit size={14} />
                        </button>
                        <button onClick={() => handleDeleteLink(platform)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-colors" title="Remove">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedPlatform && (
          <AlertDialog open={Boolean(selectedPlatform)} onOpenChange={() => setSelectedPlatform(null)}>
            <AlertDialogTrigger className="hidden" />
            <AlertDialogContent className="bg-[#121212] text-white border border-white/10 sm:rounded-2xl">
              <AlertDialogTitle className="text-xl font-bold mb-4">
                {editMode ? `Edit ${selectedPlatform}` : `Add ${selectedPlatform}`}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">Enter the URL for your {selectedPlatform} profile.</p>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-600 transition-all font-medium"
                    autoFocus
                  />
                </div>
              </AlertDialogDescription>
              <div className="flex justify-end mt-8 gap-3">
                <AlertDialogCancel className="bg-transparent hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl transition-colors">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddOrEditLink} className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl font-semibold transition-colors">
                  {editMode ? 'Save Changes' : 'Add Link'}
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </main>
    </div>
  );
};

export default Links;
