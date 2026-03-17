import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 dark:bg-blue-900/40 rounded-[3rem] p-8 md:p-16 lg:p-20 overflow-hidden relative shadow-2xl shadow-primary-200 dark:shadow-none border border-transparent dark:border-white/10">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Side */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Get in Touch
              </h2>
              <p className="text-blue-100 dark:text-blue-200 text-lg max-w-md">
                Have questions or want to collaborate? Reach out to us. Our team is here to support your learning journey.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-white font-bold">support@freesiksha.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass bg-white/10 dark:bg-black/20 border-white/20 p-8 md:p-10 rounded-3xl"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-bold ml-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-bold ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm font-bold ml-1">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="How can we help you?" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white dark:bg-primary-600 text-primary-600 dark:text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl hover:bg-gray-50 dark:hover:bg-primary-700 transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
