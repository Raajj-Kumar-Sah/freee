import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, Users, HeartHandshake, GraduationCap, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError("Passwords don't match");
    
    setLoading(true);
    setError('');
    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 pt-20 pb-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-900 p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary-50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Join FreeSiksha and choose your path.</p>
          </div>

          {error && <p className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold mb-6">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 pl-12 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none" 
                />
                <User className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Register As</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'student', label: 'Student', icon: <GraduationCap size={18} /> },
                  { id: 'educator', label: 'Educator', icon: <Users size={18} /> },
                  { id: 'admin', label: 'Admin', icon: <HeartHandshake size={18} /> }
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setFormData({...formData, role: role.id})}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.role === role.id ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}
                  >
                    {role.icon}
                    <span className="text-[10px] font-bold mt-2 uppercase tracking-tight">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-left">
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

            <div className="space-y-2 text-left">
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

            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 pl-12 pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none" 
                />
                <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">Sign In</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
