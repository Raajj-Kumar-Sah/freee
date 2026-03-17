import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, DollarSign, ChartBar, PlayCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { coursesAPI } from '../../api';
import { Link } from 'react-router-dom';

const EducatorDashboard = () => {
    const { currentUser } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch educator's courses
                const res = await coursesAPI.myCourses();
                setCourses(res.data.data || []);
                setStats({
                    totalCourses: res.data.data?.length || 0,
                    totalStudents: 124, // Mock - fetch from backend
                    totalRevenue: 24500 // Mock - fetch from backend
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <header className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Welcome back, {currentUser?.name}!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your courses and track your impact.</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Courses', value: stats.totalCourses, icon: <BookOpen className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Total Students', value: stats.totalStudents, icon: <Users className="text-green-600" />, color: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: <DollarSign className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' }
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

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Link to="/courses/new" className="group bg-gradient-to-r from-primary-600 to-blue-600 text-white p-8 rounded-3xl hover:from-primary-700 hover:to-blue-700 transition-all shadow-2xl">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-75 group-hover:opacity-100" />
                    <h3 className="text-xl font-black mb-2">Create New Course</h3>
                    <p className="opacity-90">Start building your next course</p>
                </Link>
                <Link to="/analytics" className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-3xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-2xl">
                    <ChartBar className="w-16 h-16 mx-auto mb-4 opacity-75 group-hover:opacity-100" />
                    <h3 className="text-xl font-black mb-2">View Analytics</h3>
                    <p className="opacity-90">Track student engagement</p>
                </Link>
                <button className="group bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-3xl hover:from-orange-700 hover:to-red-700 transition-all shadow-2xl">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-75 group-hover:opacity-100" />
                    <h3 className="text-xl font-black mb-2">Manage Students</h3>
                    <p className="opacity-90">View enrolled students</p>
                </button>
            </div>

            {/* Courses Grid */}
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Courses</h2>
                    <Link to="/courses/new" className="bg-primary-600 text-white px-6 py-2.5 rounded-2xl font-semibold hover:bg-primary-700 transition-all">
                        + New Course
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 text-lg">{course.title}</h3>
                                <div className="flex items-center justify-between text-sm mb-4">
                                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-bold">
                                        {course.students?.length || 0} students
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white">₹{course.price}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <Link 
                                        to={`/course/${course._id}/edit`}
                                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-primary-700 transition-all text-sm"
                                    >
                                        Edit Course
                                    </Link>
                                    <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-4 rounded-xl text-center font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm">
                                        View Stats
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {courses.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-gray-50 dark:bg-gray-800/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-700"
                        >
                            <BookOpen className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No courses yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Get started by creating your first course. Share your knowledge with thousands of students.</p>
                            <Link 
                                to="/courses/new" 
                                className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all"
                            >
                                Create First Course
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EducatorDashboard;

