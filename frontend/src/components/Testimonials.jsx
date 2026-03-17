import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rahul Verma",
    role: "Cloud Architect @ TechCorp",
    text: "FreeSiksha changed my career. The CCNA course was better than most paid programs I've taken. Today I'm working as a Cloud Architect!",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Anjali Gupta",
    role: "Full Stack Developer",
    text: "The community support here is incredible. Whenever I got stuck with my React projects, the mentors were always there to help me out.",
    avatar: "https://i.pravatar.cc/150?u=anjali"
  },
  {
    name: "David Smith",
    role: "Junior Cyber Analyst",
    text: "I never thought quality education could be free. The industry certifications from FreeSiksha helped me land my first job in cybersecurity.",
    avatar: "https://i.pravatar.cc/150?u=david"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">What Our Students Say</h2>
          <p className="text-gray-500 dark:text-gray-400">Join thousands of successful learners who have transformed their lives with FreeSiksha.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col relative"
            >
              <div className="absolute top-8 right-8 text-primary-100 dark:text-primary-900/20 text-opacity-30">
                <Quote className="w-12 h-12 fill-current" />
              </div>
              <div className="flex items-center space-x-4 mb-6 relative z-10">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-primary-50 dark:ring-primary-900/20" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-primary-600 dark:text-primary-400 font-bold">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic relative z-10">
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
