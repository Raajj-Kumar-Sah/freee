import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, DollarSign, BookOpen, BarChart2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const InstructorDashboard = () => {
    const { currentUser } = useAuth();

    const stats = [
        { label: 'Total Revenue', value: '$12,450', icon: <DollarSign className="text-green-600" />, trend: '+12.5%' },
        { label: 'Total Students', value: '1,250', icon: <Users className="text-blue-600" />, trend: '+5.2%' },
        { label: 'Active Courses', value: '8', icon: <BookOpen className="text-purple-600" />, trend: '0%' },
        { label: 'Avg Rating', value: '4.8', icon: <BarChart2 className="text-yellow-600" />, trend: '+0.1%' }
    ];

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Instructor Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your courses, students, and track your performance.</p>
                </div>
                <button className="bg-primary-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center shadow-xl shadow-primary-100 dark:shadow-none hover:bg-primary-700 transition-all">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Course
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-2xl">
                                {stat.icon}
                            </div>
                            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Courses Management */}
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Courses</h2>
                    <button className="text-primary-600 font-bold text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                                <th className="px-8 py-4">Course</th>
                                <th className="px-8 py-4">Students</th>
                                <th className="px-8 py-4">Rating</th>
                                <th className="px-8 py-4">Revenue</th>
                                <th className="px-8 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {[1, 2, 3].map((item) => (
                                <tr key={item} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-200" />
                                            <span className="font-bold text-gray-900 dark:text-white">UI/UX Design Masterclass v{item}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-600 dark:text-gray-300 font-medium">42{item}</td>
                                    <td className="px-8 py-6 text-gray-600 dark:text-gray-300 font-medium">4.{item}</td>
                                    <td className="px-8 py-6 text-gray-900 dark:text-white font-bold">$1,2{item}0</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full">Published</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;

