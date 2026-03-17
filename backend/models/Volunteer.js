import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    skills: [String],
    availability: {
        type: String,
        enum: ['flexible', 'weekends', 'weekdays'],
        default: 'flexible'
    },
    hoursContributed: {
        type: Number,
        default: 0
    },
    assignedDept: {
        type: String,
        default: 'General'
    },
    experience: {
        type: String,
        maxLength: 500
    },
    interests: [String],
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Volunteer', VolunteerSchema);

