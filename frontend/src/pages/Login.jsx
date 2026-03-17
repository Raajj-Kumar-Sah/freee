import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 pt-20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-900 p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary-50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Please enter your details to sign in.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 pl-12 pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none" 
                />
                <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 pl-12 pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none" 
                />
                <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-gray-500 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary-600 focus:ring-primary-500" />
                <span className="font-medium">Remember me</span>
              </label>
              <Link href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">Forgot Password?</Link>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary-100 dark:shadow-primary-900/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">Sign up for free</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

