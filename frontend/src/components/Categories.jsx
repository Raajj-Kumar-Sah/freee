import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Shield, Database } from 'lucide-react';

const categories = [
  { name: 'Development', icon: <Code className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
  { name: 'Networking', icon: <Globe className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
  { name: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
  { name: 'Data Science', icon: <Database className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
];

const Categories = () => {
  return (
    <section className="py-12 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">Top Categories</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-900 hover:shadow-md transition-all whitespace-nowrap"
              >
                <div className={`${cat.color} p-2 rounded-xl`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
