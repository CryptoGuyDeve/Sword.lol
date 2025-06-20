"use client";

import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { FaSnapchatGhost, FaYoutube, FaInstagram, FaTwitter, FaGithub, FaTiktok, FaTelegram, FaDiscord, FaEdit, FaTrash, FaKickstarter, FaSpotify, FaSoundcloud, FaTwitch, FaLinkedin, FaSteam, FaPinterest, FaPatreon, FaBitcoin, FaEthereum, FaMonero,  FaAddressCard } from 'react-icons/fa';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const user_id = session.user.id;
      setUserId(user_id);
      fetchUserLinks(user_id);
    }
  };

  const fetchUserLinks = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('username, social_links')
      .eq('id', userId)
      .single();

    if (data) {
      setSocialLinks(data.social_links || {});
      setUsername(data.username || 'Unknown');
    }
  };

  const handleAddOrEditLink = async () => {
    if (!selectedPlatform || !url || !userId) return;

    const updatedLinks = { ...socialLinks, [selectedPlatform]: url };

    const { error } = await supabase
      .from('users')
      .update({ social_links: updatedLinks })
      .eq('id', userId);

    if (!error) {
      setSocialLinks(updatedLinks);
      setUrl('');
      setSelectedPlatform(null);
      setEditMode(false);
    }
  };

  const handleDeleteLink = async (platform: string) => {
    const updatedLinks = { ...socialLinks };
    delete updatedLinks[platform];

    const { error } = await supabase
      .from('users')
      .update({ social_links: updatedLinks })
      .eq('id', userId);

    if (!error) {
      setSocialLinks(updatedLinks);
    }
  };

  const handleEdit = (platform: string, currentUrl: string) => {
    setSelectedPlatform(platform);
    setUrl(currentUrl);
    setEditMode(true);
  };

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white">
      <Sidebar id={userId || ''} username={username || 'Loading...'} />
      <div className="flex flex-col items-center w-full p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Manage Your Social Links
        </h1>

        <div className="grid grid-cols-4 gap-6 mb-12">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.key}
              onClick={() => {
                setSelectedPlatform(platform.key);
                setEditMode(false);
              }}
              className="glassmorphism-btn p-4 rounded-lg flex items-center justify-center text-3xl"
            >
              {platform.icon}
            </button>
          ))}
        </div>

        {selectedPlatform && (
          <AlertDialog open={Boolean(selectedPlatform)} onOpenChange={() => setSelectedPlatform(null)}>
            <AlertDialogTrigger />
            <AlertDialogContent className="bg-[#121212] text-white border border-gray-700">
              <AlertDialogTitle className="text-lg font-bold mb-2">
                {editMode ? `Edit ${selectedPlatform}` : `Add ${selectedPlatform}`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your link here..."
                  className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </AlertDialogDescription>
              <div className="flex justify-end mt-6 gap-4">
                <AlertDialogCancel className="text-gray-400 hover:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddOrEditLink} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
                  {editMode ? 'Save' : 'Add'}
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Display Existing Links */}
        <div className="mt-8 w-full max-w-2xl space-y-6">
          {Object.entries(socialLinks).map(([platform, value]) => (
            <div key={platform} className="flex justify-between items-center bg-gray-900 p-4 rounded-xl shadow-md">
              <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}: {value as string}
              </a>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(platform, value as string)} className="text-yellow-400 hover:text-yellow-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteLink(platform)} className="text-red-500 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;
