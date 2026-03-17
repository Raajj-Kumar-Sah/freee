import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, TrendingUp, Calendar } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '2023', event: 'FreeSiksha founded with a mission to de-commodify tech education.' },
    { year: '2024', event: 'Reached 100,000 active learners across 50 countries.' },
    { year: '2025', event: 'Partnered with 20+ tech giants for industry certifications.' },
    { year: '2026', event: 'Launched AI-powered personalized learning paths.' },
  ];

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6"
          >
            Our Mission is to Empower <span className="text-primary-600 dark:text-primary-400">Every Learner</span>
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            We believe that quality education should be a fundamental right, not a privilege. That's why we're building the world's most accessible learning platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary-50 dark:bg-primary-900/10 p-12 rounded-[3rem] space-y-6"
          >
            <div className="bg-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To provide high-quality, industry-relevant education for free to anyone with an internet connection, bypassing the traditional financial barriers of higher education.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/10 p-12 rounded-[3rem] space-y-6"
          >
            <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8">
              <Eye className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To become the global standard for open-source education, where the world's best experts contribute to a shared knowledge base that benefits all of humanity.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white mb-16">Our Journey</h2>
          <div className="relative border-l-2 border-primary-100 dark:border-primary-900/30 ml-4 md:ml-0 md:left-1/2 ">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mb-12 relative ${index % 2 === 0 ? 'md:left-[-350px] md:text-right' : 'md:left-[50px]'}`}
              >
                <div className="absolute top-0 w-8 h-8 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg -left-[17px] md:left-[17px]" />
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-[300px] inline-block">
                  <span className="text-primary-600 dark:text-primary-400 font-black text-xl mb-2 block">{item.year}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
