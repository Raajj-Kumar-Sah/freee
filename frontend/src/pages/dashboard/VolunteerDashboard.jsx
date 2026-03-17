import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Calendar, Users, Star, ArrowUpRight } from 'lucide-react';

const VolunteerDashboard = () => {
    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center italic">
                        Volunteer Impact Hub
                        <Heart className="ml-4 text-primary-600 fill-primary-600 w-8 h-8" />
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Changing lives, one contribution at a time.</p>
                </div>
                <div className="flex bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="px-6 py-2 border-r border-gray-100 dark:border-gray-800">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Lives Impacted</p>
                        <p className="font-black text-primary-600">3,400+</p>
                    </div>
                    <div className="px-6 py-2">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Hours</p>
                        <p className="font-black text-green-500">128.5h</p>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Projects */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white italic">Current Projects</h2>
                                <p className="text-gray-500 text-sm mt-1">Contributing to FreeSiksha ecosystem</p>
                            </div>
                            <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">3 Active</span>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: 'Bengali Localization', dept: 'Content', progress: 75, icon: <Globe /> },
                                { title: 'Student Support Desk', dept: 'Assistance', progress: 40, icon: <Users /> },
                                { title: 'Documentation Audit', dept: 'General', progress: 90, icon: <Calendar /> }
                            ].map((project, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-primary-100 transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 text-primary-600 shadow-sm">
                                                {project.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-gray-900 dark:text-white">{project.title}</h3>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.dept} Dept</p>
                                            </div>
                                        </div>
                                        <button className="text-primary-600 p-2 overflow-hidden hover:bg-primary-600 hover:text-white rounded-xl transition-all">
                                            <ArrowUpRight size={20} />
                                        </button>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            className="h-full bg-primary-600 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Badges & Recognition */}
                <div className="space-y-8">
                    <div className="bg-primary-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary-200">
                        <h3 className="text-xl font-black mb-8 italic uppercase tracking-widest text-sm border-b border-white/20 pb-4">Achievements</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/20 transition-all">
                                    <Star className={`w-8 h-8 ${i === 1 ? 'fill-yellow-400 text-yellow-400' : 'text-blue-200'}`} />
                                    <p className="text-[10px] font-black uppercase tracking-widest mt-4">Badge {i}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 text-center">
                        <h4 className="text-gray-900 dark:text-white font-black text-lg mb-2 italic">Earn a Certificate</h4>
                        <p className="text-gray-500 text-xs mb-8">Contribute 10 more hours to unlock your Quarterly Impact Certificate.</p>
                        <button className="w-full py-4 bg-gray-50 dark:bg-gray-800 text-gray-400 font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] cursor-not-allowed">
                            Locked
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDashboard;

