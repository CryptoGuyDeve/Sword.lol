"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiUsers, FiDollarSign, FiActivity, FiShield, FiAlertTriangle, FiSearch } from "react-icons/fi";
import Link from "next/link";

interface User {
    id: string;
    username: string;
    email: string;
    created_at: string;
    is_verified: boolean;
    is_admin: boolean;
    is_banned: boolean;
}


export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        premiumUsers: 0, // Placeholder for now
        totalViews: 0
    });
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        const fetchAdminData = async () => {
            try {
                // Fetch basic user list (admin only)
                // Note: We need to create this API endpoint. For now, using a placeholder fetch.
                const res = await fetch("/api/admin/users");
                if (!res.ok) {
                    // If 403 or 401, redirect
                    if (res.status === 403 || res.status === 401) {
                        // router.push("/"); // Uncomment once API is protected
                    }
                    // throw new Error("Failed to fetch"); // Handle gracefully
                }
                const data = await res.json();

                // Mocking data if API is not ready
                /*
               const mockUsers = [
                   { id: "1", username: "admin", email: "admin@sword.lol", created_at: new Date().toISOString(), is_verified: true, is_admin: true },
                   { id: "2", username: "user1", email: "user1@sword.lol", created_at: new Date().toISOString(), is_verified: false, is_admin: false },
               ];
               setUsers(mockUsers);
               setStats({ totalUsers: 2, premiumUsers: 0, totalViews: 1050 });
               */

                if (data.users) setUsers(data.users);
                if (data.stats) setStats(data.stats);

            } catch (error) {
                console.error("Admin fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user) {
            fetchAdminData();
        }
    }, [session, status, router]);


    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.includes(searchTerm)
    );

    const handleBan = async (userId: string) => {
        setActionLoading(userId);
        try {
            const res = await fetch("/api/admin/users/ban", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action: "toggle_ban" })
            });
            const data = await res.json();
            if (data.success) {
                setUsers(users.map(u => u.id === userId ? { ...u, is_banned: data.is_banned } : u));
            }
        } catch (error) {
            console.error("Failed to ban:", error);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">Initializing Admin Protocol...</div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            {/* Admin Header */}
            <div className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <FiShield className="text-red-500" />
                        </div>
                        <span className="font-mono font-bold tracking-widest uppercase">Sword Admin</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Exit</Link>
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-2 group hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">Total Users</span>
                            <FiUsers className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-4xl font-bold tracking-tighter">{stats.totalUsers}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-2 group hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">Total Views</span>
                            <FiActivity className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-4xl font-bold tracking-tighter">{stats.totalViews}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-2 group hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">System Status</span>
                            <FiAlertTriangle className="text-green-500" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-green-500">OPERATIONAL</span>
                    </div>
                </div>

                {/* User Database */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight italic">User Database</h2>
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search UUID / Username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/10 py-2 pl-10 pr-6 w-80 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="border border-white/5 bg-white/[0.01]">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-bold">User</th>
                                    <th className="px-6 py-4 font-bold">Email</th>
                                    <th className="px-6 py-4 font-bold">Registered</th>
                                    <th className="px-6 py-4 font-bold">Role</th>
                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-white">{user.username}</span>
                                                <span className="text-[10px] font-mono text-gray-600">{user.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">

                                            {user.is_admin ? (
                                                <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] uppercase font-bold tracking-widest rounded-sm">Admin</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-500 text-[9px] uppercase font-bold tracking-widest rounded-sm">User</span>
                                            )}
                                            {user.is_banned && <span className="ml-2 px-2 py-1 bg-red-900/20 border border-red-500/20 text-red-500 text-[9px] uppercase font-bold tracking-widest rounded-sm">BANNED</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleBan(user.id)}
                                                disabled={actionLoading === user.id || user.is_admin}
                                                className={`text-xs font-bold uppercase tracking-wider transition-all
                                                    ${user.is_banned ? 'text-green-500 hover:text-green-400' : 'text-red-500 hover:text-red-400'}
                                                    ${actionLoading === user.id ? 'opacity-50 cursor-wait' : 'opacity-0 group-hover:opacity-100'}
                                                `}
                                            >
                                                {actionLoading === user.id ? 'Processing...' : user.is_banned ? 'Unban' : 'Ban'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center text-gray-600 text-sm italic">No records found within query parameters.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
