import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogs = [
  {
    title: "The Future of Open Source Education",
    desc: "How decentralized learning is changing the way we think about degrees and certifications.",
    author: "Sara Jenkins",
    date: "March 15, 2026",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Mastering React in 2026",
    desc: "A comprehensive guide to the latest features and best practices in the React ecosystem.",
    author: "David Chen",
    date: "March 10, 2026",
    thumb: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Cybersecurity Basics for Beginners",
    desc: "Protecting yourself and your data in an increasingly connected digital world.",
    author: "Alex Rivera",
    date: "March 05, 2026",
    thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  }
];

const Blog = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Latest Updates</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Stay informed with the latest news, tutorials, and success stories from the FreeSiksha community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-8 shadow-lg dark:shadow-black/20">
                <img 
                  src={blog.thumb} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {blog.date}</span>
                  <span className="flex items-center"><User className="w-4 h-4 mr-2" /> {blog.author}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {blog.desc}
                </p>
                <div className="pt-2">
                  <button className="flex items-center font-black text-sm uppercase tracking-wider text-gray-900 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:ml-3 transition-all" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
