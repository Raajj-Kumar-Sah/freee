import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Clock, PlayCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const { currentUser, api } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const res = await api.get('/enrollments/me');
                setEnrollments(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [api]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <header className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Welcome back, {currentUser?.name}!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Track your progress and continue your learning journey.</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Enrolled Courses', value: enrollments.length, icon: <BookOpen className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Completed Lessons', value: '12', icon: <PlayCircle className="text-green-600" />, color: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Certificates Won', value: '2', icon: <Award className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' }
                ].map((stat, i) => (
                    <div key={i} className={`${stat.color} p-6 rounded-3xl flex items-center space-x-4`}>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Courses Grid */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrollments.map((enr, index) => (
                    <motion.div
                        key={enr._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                        <div className="h-40 overflow-hidden relative">
                            <img src={enr.course.thumbnail} alt={enr.course.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 line-clamp-1">{enr.course.title}</h3>
                            
                            {/* Progress Bar */}
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                    <span>Progress</span>
                                    <span>{enr.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-primary-600 h-full rounded-full transition-all duration-500" 
                                        style={{ width: `${enr.progress}%` }}
                                    />
                                </div>
                            </div>

                            <Link 
                                to={`/learning/${enr.course._id}`}
                                className="block w-full text-center bg-primary-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-primary-100 dark:shadow-none hover:bg-primary-700 transition-all"
                            >
                                Continue Learning
                            </Link>
                        </div>
                    </motion.div>
                ))}

                {enrollments.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400">You haven't enrolled in any courses yet.</p>
                        <Link to="/courses" className="text-primary-600 font-bold mt-4 inline-block hover:underline">Browse Courses</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;

