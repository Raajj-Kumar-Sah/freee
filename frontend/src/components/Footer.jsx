import React from 'react';
import { Rocket, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">FreeSiksha</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              We are a non-profit organization dedicated to making high-quality tech education accessible to everyone, everywhere.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/courses" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Courses</a></li>
              <li><a href="/register" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Mentors</a></li>
              <li><a href="/blog" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Community</a></li>
              <li><a href="/join" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Certificates</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/about" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Partners</a></li>
              <li><a href="/join" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-900 dark:text-gray-200 font-semibold hover:text-primary-600 transition-colors">Donate</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-500">
          <p>© 2026 FreeSiksha. Non-Profit Organization. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Designed with <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" /> for Learners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
