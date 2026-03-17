import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Users, ArrowRight } from 'lucide-react';
import CoursesSection from '../components/Courses';

const CoursesPage = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/30 dark:bg-gray-950/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Browse Courses</h1>
            <p className="text-gray-500 dark:text-gray-400">Discover your next skill from our collection of free courses.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for something..." 
                className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-2xl py-3 px-6 pl-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-400 w-full md:w-80 transition-all outline-none"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <button className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-gray-600 dark:text-gray-400">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['All Courses', 'Development', 'Networking', 'Cybersecurity', 'Data Science', 'Design'].map((cat, i) => (
            <button 
              key={i}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                i === 0 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-primary-900/20' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reusing Courses component as the grid base */}
        <div className="-mt-12">
           <CoursesSection />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
