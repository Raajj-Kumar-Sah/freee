import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Rocket, CheckCircle, Globe } from 'lucide-react';

const Join = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              Build the Future of <span className="text-primary-600 dark:text-primary-400">Education</span> With Us
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
              Join a global movement of volunteers, educators, and tech enthusiasts. Together, we can make quality education free for everyone.
            </p>
            
            <div className="space-y-6">
              {[
                { title: 'Global Impact', desc: 'Help us reach millions of students from underserved communities.', icon: <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" /> },
                { title: 'Mentorship', desc: 'Share your expertise and guide the next generation of tech leaders.', icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" /> },
                { title: 'Innovation', desc: 'Help us build cutting-edge tools for decentralized learning.', icon: <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mt-1">
                    {/* Placeholder for missing Globe icon if not imported, using Heart as fallback for variety */}
                    {i === 0 ? <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" /> : item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-primary-50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Join the Community</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                <input type="text" placeholder="Alex Johnson" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                <input type="email" placeholder="alex@example.com" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Why do you want to join?</label>
                <textarea rows="4" placeholder="I want to help teach coding to kids..." className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none resize-none"></textarea>
              </div>
              <button className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary-100 dark:shadow-primary-900/20 hover:bg-primary-700 transition-all flex items-center justify-center space-x-2">
                <span>Apply Now</span>
                <CheckCircle className="w-6 h-6" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Join;
