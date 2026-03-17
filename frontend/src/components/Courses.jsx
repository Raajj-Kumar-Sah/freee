import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, ArrowUpRight, Loader2 } from 'lucide-react';
import { coursesAPI, enrollmentsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesAPI.getAll();
        setCourses(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrollments = async () => {
      if (user) {
        try {
          const response = await enrollmentsAPI.myEnrollments();
          const enrolledIds = response.data.data.map(enr => enr.course._id);
          setEnrolledCourses(new Set(enrolledIds));
        } catch (error) {
          console.error('Failed to fetch enrollments:', error);
        }
      }
    };

    fetchCourses();
    fetchEnrollments();
  }, [user]);

  const handleEnroll = async (courseId) => {
    try {
      await enrollmentsAPI.enroll(courseId);
      setEnrolledCourses(prev => new Set([...prev, courseId]));
      toast.success('Enrolled successfully!');
    } catch (error) {
      toast.error('Enrollment failed. Please try again.');
    }
  };

  const isEnrolled = (courseId) => enrolledCourses.has(courseId);

  if (loading) {
    return (
      <div className="py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Featured Courses</h2>
            <p className="text-gray-500 dark:text-gray-400">Start learning for free with these high-rated programs.</p>
          </div>
          <Link to="/courses" className="text-primary-600 dark:text-primary-400 font-bold flex items-center hover:underline text-sm uppercase tracking-widest">
            View All <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:shadow-primary-50 dark:hover:shadow-black/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={course.thumbnail || course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-primary-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-widest">
                  {course.price === 0 ? 'Free' : `₹${course.price}`}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors h-12 overflow-hidden">
                  {course.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Instructor: <span className="text-gray-900 dark:text-gray-200 ml-1">{course.instructor?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-700">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{course.rating || 4.8}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">({course.reviews?.length || 0}+)</span>
                  </div>
                  <div className="flex items-center text-gray-400 dark:text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-xs font-bold">{course.enrollments?.length || 0}</span>
                  </div>
                </div>
                <Link 
                  to={`/learning/${course._id}`}
                  className={`w-full block text-center py-3 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                    isEnrolled(course._id)
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 dark:shadow-emerald-900/20 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 shadow-primary-50 dark:shadow-primary-900/20 text-white'
                  }`}
                >
                  {isEnrolled(course._id) ? 'Continue Learning' : 'Enroll Free'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

