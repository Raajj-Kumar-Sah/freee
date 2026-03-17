import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { api } from '../api';
import { motion } from 'framer-motion';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useAuthStore();
  
  useEffect(() => {
    auth.fetchUser();
  }, []);

  const value = {
    ...auth,
    api
  };

  if (auth.loading) {
    const words = "FreeSiksha.com".split("");
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center text-5xl md:text-7xl font-black tracking-tighter">
            {words.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className={char === '.' ? "text-primary-600" : "text-gray-900 dark:text-white"}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-1 h-12 md:h-16 bg-primary-600 ml-2"
            />
          </div>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-primary-600 to-blue-500 rounded-full w-48 max-w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

