import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, MapPin, Briefcase, Award, Clock, Heart, ArrowRight } from 'lucide-react';

const CompleteProfile = () => {
    const { currentUser, api } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Trainee specific
        background: '',
        motivation: '',
        trainingTrack: 'Web Development',
        // Volunteer specific
        experience: '',
        skills: '',
        availability: 'flexible'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/users/complete-profile', { 
                details: {
                    ...formData,
                    skills: formData.skills.split(',').map(s => s.trim())
                }
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderRoleSpecificForm = () => {
        if (currentUser?.role === 'trainee') {
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Training Track</label>
                        <select 
                            value={formData.trainingTrack}
                            onChange={(e) => setFormData({...formData, trainingTrack: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-400 outline-none"
                        >
                            <option>Web Development</option>
                            <option>Data Science</option>
                            <option>Digital Marketing</option>
                            <option>UI/UX Design</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Educational Background</label>
                        <textarea 
                            required
                            placeholder="What is your current education or work background?"
                            value={formData.background}
                            onChange={(e) => setFormData({...formData, background: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-400 outline-none h-32"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Why do you want to join this track?</label>
                        <textarea 
                            required
                            placeholder="Tell us about your motivation..."
                            value={formData.motivation}
                            onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-400 outline-none h-32"
                        />
                    </div>
                </div>
            );
        }

        if (currentUser?.role === 'volunteer') {
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Availability</label>
                        <select 
                            value={formData.availability}
                            onChange={(e) => setFormData({...formData, availability: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-400 outline-none"
                        >
                            <option value="flexible">Flexible</option>
                            <option value="weekends">Weekends Only</option>
                            <option value="weekdays">Weekdays Only</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Skills (comma separated)</label>
                        <input 
                            required
                            placeholder="Teaching, Design, Translating..."
                            value={formData.skills}
                            onChange={(e) => setFormData({...formData, skills: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-400 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Volunteer Experience</label>
                        <textarea 
                            required
                            placeholder="Have you volunteered before? Tell us briefly."
                            value={formData.experience}
                            onChange={(e) => setFormData({...formData, experience: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-400 outline-none h-32"
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Redirecting to your dashboard...</p>
                {/* Students might skip or have a simple intro */}
                {setTimeout(() => navigate('/dashboard'), 2000)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-12 px-4 transition-colors duration-300">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 md:p-16 border border-gray-100 dark:border-gray-800 shadow-2xl"
            >
                <div className="text-center mb-12">
                    <span className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                        Onboarding
                    </span>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 italic">Complete Your Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">Help us customize your FreeSiksha experience as a <span className="text-primary-600 font-bold capitalize">{currentUser?.role}</span>.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {renderRoleSpecificForm()}

                    <button 
                        disabled={loading}
                        className="w-full bg-primary-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-primary-100 dark:shadow-none hover:bg-primary-700 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                    >
                        {loading ? <span className="animate-pulse">Saving...</span> : (
                            <>
                                <span>Get Started</span>
                                <ArrowRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default CompleteProfile;

