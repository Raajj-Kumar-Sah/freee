import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import initFirebase from './config/firebase.js';

import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import discussionRoutes from './routes/discussions.js';
import sectionRoutes from './routes/sections.js';
import enrollmentRoutes from './routes/enrollments.js';
import announcementRoutes from './routes/announcements.js';
import paymentRoutes from './routes/payments.js';
import aiRoutes from './routes/ai.js';
import certificateRoutes from './routes/certificates.js';
import userRoutes from './routes/users.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize Firebase
initFirebase();

const app = express();



// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Rate limiting
import rateLimitObj from './middleware/rateLimit.js';
app.use('/api/auth', rateLimitObj.authLimiter);
app.use(rateLimitObj.limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to FreeSiksha API' });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
