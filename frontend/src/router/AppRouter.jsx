
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Courses from '../pages/Courses';
import Blog from '../pages/Blog';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CompleteProfile from '../pages/CompleteProfile';

import StudentDashboard from '../pages/dashboard/StudentDashboard';
import EducatorDashboard from '../pages/dashboard/EducatorDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';

import ProtectedRoute from '../components/ProtectedRoute';
import LearningPlayer from '../pages/LearningPlayer';
import { useAuth } from '../context/AuthContext';

const DashboardDispatcher = () => {
    const { currentUser } = useAuth();
    
    if (!currentUser.isProfileComplete && (currentUser.role === 'trainee' || currentUser.role === 'volunteer')) {
        return <Navigate to="/complete-profile" />;
    }

    switch(currentUser.role) {
        case 'admin': return <AdminDashboard />;
        case 'educator': return <EducatorDashboard />;
        default: return <StudentDashboard />;
    }

};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/complete-profile" element={
                <ProtectedRoute>
                    <CompleteProfile />
                </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardDispatcher />
                </ProtectedRoute>
            } />
            
            <Route path="/learning/:courseId" element={
                <ProtectedRoute>
                    <LearningPlayer />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AppRouter;

