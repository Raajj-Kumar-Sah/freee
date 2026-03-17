import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Users, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-50 dark:bg-primary-900/10 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              Non-profit Education
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
              Free & Quality <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">Education</span> for All
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              Empowering learners worldwide with accessible, high-quality education and industry-recognized certifications. Join 1M+ students today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-primary-200 dark:shadow-primary-900/20 hover:bg-primary-700 transition-all"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Join Now
              </motion.button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Student" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">Joined by 500+</span> new learners this month
              </div>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary-100 dark:shadow-black/50 border-8 border-white dark:border-gray-800">
              <img 
                src="/images/hero.png" 
                alt="Students learning" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] -left-12 glass p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center w-64 h-24 dark:bg-gray-800/80"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg shrink-0">
                  <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider truncate">Upcoming Course</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Soft Skills & Interview Prep</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[40%] -right-12 glass p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center w-64 h-24 dark:bg-gray-800/80"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg shrink-0">
                  <CheckCircle className="text-red-600 dark:text-red-400 w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider truncate">Ongoing Course</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">CCNA Networking Masterclass</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[5%] -left-8 glass p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center w-64 h-24 dark:bg-gray-800/80"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg shrink-0">
                  <Users className="text-primary-600 dark:text-primary-400 w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">1.2M+</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-tighter">Active Students</p>
                </div>
              </div>
            </motion.div>



          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
