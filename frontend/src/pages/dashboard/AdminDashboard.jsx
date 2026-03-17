import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    BookOpen, 
    AlertCircle, 
    TrendingUp, 
    Settings, 
    Shield, 
    HeartHandshake, 
    GraduationCap, 
    Search,
    Filter,
    MoreVertical,
    Activity,
    Bell,
    ArrowUpRight,
    CheckCircle,
    Send,
    User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { api } = useAuth();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'student', status: 'active', joined: '2024-03-10' },
        { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', role: 'trainee', status: 'active', joined: '2024-03-12' },
        { id: 3, name: 'Michael Chen', email: 'micheal@example.com', role: 'volunteer', status: 'pending', joined: '2024-03-15' },
        { id: 4, name: 'David Smith', email: 'david@example.com', role: 'instructor', status: 'active', joined: '2024-02-28' },
        { id: 5, name: 'Emma Wilson', email: 'emma@example.com', role: 'student', status: 'inactive', joined: '2024-03-01' },
    ]);

    const stats = [
        { label: 'Total Users', value: '1,240', icon: <Users />, color: 'blue', trend: '+12%' },
        { label: 'Trainees', value: '85', icon: <GraduationCap />, color: 'purple', trend: '+5%' },
        { label: 'Volunteers', value: '42', icon: <HeartHandshake />, color: 'green', trend: '+8%' },
        { label: 'Platform Revenue', value: '$12,500', icon: <TrendingUp />, color: 'amber', trend: '+15%' },
    ];

    const filteredUsers = users.filter(user => {
        const matchesTab = activeTab === 'all' || user.role === activeTab;
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getRoleColor = (role) => {
        switch(role) {
            case 'admin': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            case 'instructor': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
            case 'student': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            case 'trainee': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
            case 'volunteer': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
                        Management Hub
                        <Shield className="ml-4 text-primary-600 w-8 h-8" />
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Platform oversight, role management, and system configurations.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-primary-600 transition-all shadow-sm">
                        <Bell className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-primary-600 transition-all shadow-sm">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary-100 dark:shadow-none hover:bg-primary-700 transition-all">
                        Create Announcement
                    </button>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-primary-600/50 transition-all relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-4 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <span className="flex items-center text-[10px] font-black text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                <ArrowUpRight className="w-3 h-3 mr-1" />
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest relative z-10">{stat.label}</p>
                        <p className="text-3xl font-black text-gray-900 dark:text-white mt-1 relative z-10 tracking-tight">{stat.value}</p>
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-3xl`} />
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Users Management */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-100 dark:border-gray-800 space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Recent Users</h2>
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by name or email..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 pl-11 pr-4 text-xs focus:ring-2 focus:ring-primary-400 outline-none"
                                    />
                                </div>
                                <button className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-500">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['all', 'student', 'trainee', 'volunteer', 'instructor'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary-600 text-white shadow-lg shadow-primary-100 dark:shadow-none' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    {tab}s
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-8 py-4">User</th>
                                    <th className="px-8 py-4">Role</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <AnimatePresence mode="popLayout">
                                    {filteredUsers.map((user) => (
                                        <motion.tr 
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={user.id} 
                                            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center font-bold text-primary-700">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{user.name}</p>
                                                        <p className="text-xs text-gray-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${getRoleColor(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center">
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 capitalize">{user.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 text-gray-400 hover:text-primary-600">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Activity & Health */}
                <div className="space-y-8">
                    <div className="bg-primary-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary-100 dark:shadow-none">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-4">
                                <Activity className="w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">Live Traffic</span>
                            </div>
                            <h3 className="text-3xl font-black mb-1">245</h3>
                            <p className="text-blue-100 text-sm font-medium">Active sessions right now</p>
                            
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <h4 className="text-sm font-bold mb-4">Global Announcement</h4>
                                <textarea 
                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-xs font-medium text-white placeholder:text-blue-200 focus:outline-none mb-4 min-h-[100px]" 
                                    placeholder="Alert all users..."
                                ></textarea>
                                <button className="w-full bg-white text-primary-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center space-x-2">
                                    <Send size={16} />
                                    <span>Broadcast Now</span>
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Recent Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex space-x-4">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 rounded-full bg-primary-600 shadow-lg shadow-primary-200" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">New trainee registered: Sarah Miller</p>
                                        <p className="text-[10px] text-gray-400 font-medium mt-1">2 minutes ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 text-xs font-black text-primary-600 uppercase tracking-widest border border-primary-100 dark:border-primary-900/30 rounded-xl hover:bg-primary-50 transition-all">
                            View Server Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

