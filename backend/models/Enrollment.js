import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    completedLectures: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Lecture'
        }
    ],
    progress: {
        type: Number,
        default: 0
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
