import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Activity, Clock, ChevronRight } from 'lucide-react';

const TraineeDashboard = () => {
    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white italic tracking-tight">Trainee Portal</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Your specialized path to excellence.</p>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
                        <Award className="w-5 h-5" />
                        <span>Track Score: 850</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Stats */}
                {[
                    { label: 'Courses Completed', value: '4', icon: <BookOpen />, color: 'blue' },
                    { label: 'Weekly Hours', value: '18h', icon: <Clock />, color: 'purple' },
                    { label: 'Active Tasks', value: '7', icon: <Activity />, color: 'green' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm border-b-4 border-b-primary-600/20">
                        <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-primary-600 w-fit mb-6`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Assignments */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-8 border-l-4 border-primary-600 pl-4 uppercase tracking-widest text-sm">Active Assignments</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-primary-600/30 transition-all cursor-pointer group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                                        <Award className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">Module {i} Assessment</p>
                                        <p className="text-xs text-gray-500">Due in 2 days</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-gray-300 w-5 h-5" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mentor Connection */}
                <div className="bg-primary-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-4 italic">Meet Your Mentor</h2>
                        <p className="text-blue-100 mb-8 max-w-xs leading-relaxed font-medium">Connect with industry experts who will guide you through your training track.</p>
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40" />
                            <div>
                                <p className="font-bold text-lg">Dr. Elena Rodriguez</p>
                                <p className="text-xs text-blue-200 uppercase tracking-widest font-black">Lead Web Developer</p>
                            </div>
                        </div>
                        <button className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl shadow-black/10">
                            Book a Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraineeDashboard;

