import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Award, 
  UserCheck, 
  Clock, 
  Users, 
  Briefcase 
} from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Recommendation",
    description: "Get personalized learning paths tailored to your career goals and previous knowledge.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Industry Certificates",
    description: "Earn recognized credentials from top tech companies and educational institutions.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Expert Mentors",
    description: "Direct access to industry veterans who guide you through complex subjects and projects.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Learning",
    description: "Self-paced video lectures and live sessions that fit into your busy schedule.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Support",
    description: "Join a global network of peers for collaborative projects and peer-to-peer learning.",
    color: "bg-sky-100 text-sky-600"
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Career Guidance",
    description: "Resume reviews, interview prep, and direct job placement assistance with partners.",
    color: "bg-blue-100 text-blue-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Features = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Why Choose FreeSiksha?</h2>
          <p className="text-gray-500 dark:text-gray-400">Experience a new way of learning with our comprehensive platform designed for student success.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 hover:border-primary-100 dark:hover:border-primary-900/50 hover:shadow-2xl hover:shadow-primary-50 dark:hover:shadow-black/20 transition-all duration-300"
            >
              <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
