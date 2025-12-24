"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Eye,
  Shield,
  ShieldOff,
  Trash2,
  Edit3,
  Save,
  X,
  Search,
  Filter,
  Users
} from "lucide-react";

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

const AdminPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user) {
      router.push("/login");
      return;
    }

    const u = session.user as any;
    setCurrentUser({ id: u.id, username: u.username || u.name || "Admin" });
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else if (res.status === 401) {
        setError("Unauthorized. You must be logged in as an admin to access this page.");
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to fetch users");
      }
    } catch (e) {
      console.error("Error fetching users", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId: string, isBanned: boolean) => {
    if (!confirm(`Are you sure you want to ${isBanned ? 'unban' : 'ban'} this user?`)) return;

    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, is_banned: !isBanned })
    });
    fetchUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleEditUser = (user: any) => {
    setEditingUserId(user.id);
    setEditData({ ...user });
  };

  const handleUpdateUser = async () => {
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingUserId, ...editData })
    });
    setEditingUserId(null);
    fetchUsers();
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
      <Sidebar username={currentUser?.username || "Admin"} id={currentUser?.id || "0"} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Manage all users and their data</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 pl-10 pr-4 py-2 h-10 bg-[#121212] border border-white/10 text-white rounded-lg focus:ring-1 focus:ring-white/20 focus:border-transparent transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="bg-[#121212] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span className="font-medium text-white">{filteredUsers.length}</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-400 mb-1">Error</h3>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Users List */}
          {loading ? (
            <Loading text="Loading users" size="md" />
          ) : (
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="bg-[#121212] border border-white/5 rounded-xl p-12 text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">No users found</p>
                </div>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-[#121212] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all"
                  >
                    {editingUserId === user.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Edit User</h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleUpdateUser}
                              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingUserId(null)}
                              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-white/10 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
                            <input
                              type="text"
                              value={editData.email || ""}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 text-sm text-white placeholder-gray-600"
                              placeholder="user@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Location</label>
                            <input
                              type="text"
                              value={editData.location || ""}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 text-sm text-white placeholder-gray-600"
                              placeholder="City, Country"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Bio</label>
                            <textarea
                              value={editData.bio || ""}
                              onChange={(e) => handleInputChange("bio", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 text-sm text-white placeholder-gray-600 resize-none"
                              placeholder="User bio..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            {user.profile_pic ? (
                              <img
                                src={user.profile_pic}
                                alt={user.username}
                                className="w-12 h-12 rounded-full object-cover border border-white/10"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <User className="w-6 h-6 text-gray-500" />
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-semibold">@{user.username}</h3>
                              <p className="text-sm text-gray-500">{user.email || "No email"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                              title="Edit user"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleBanUser(user.id, user.is_banned)}
                              className={`p-2 hover:bg-white/5 rounded-lg transition-colors ${user.is_banned ? 'text-green-400 hover:text-green-300' : 'text-yellow-400 hover:text-yellow-300'
                                }`}
                              title={user.is_banned ? "Unban user" : "Ban user"}
                            >
                              {user.is_banned ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {user.is_banned && (
                          <div className="mb-4 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
                            ⚠️ This user is banned
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/5">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="text-xs uppercase tracking-wider">Location</span>
                            </div>
                            <p className="text-white font-medium">{user.location || "Not set"}</p>
                          </div>

                          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/5">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span className="text-xs uppercase tracking-wider">Views</span>
                            </div>
                            <p className="text-white font-medium">{user.profile_views?.toLocaleString() || 0}</p>
                          </div>

                          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/5">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <span className="text-xs uppercase tracking-wider">Theme</span>
                            </div>
                            <p className="text-white font-medium capitalize">{user.theme || "Default"}</p>
                          </div>

                          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/5">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <span className="text-xs uppercase tracking-wider">Badges</span>
                            </div>
                            <p className="text-white font-medium">{user.badges?.length || 0}</p>
                          </div>
                        </div>

                        {user.bio && (
                          <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Bio</p>
                            <p className="text-sm text-gray-300">{user.bio}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
