import mongoose from 'mongoose';

const TraineeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    trainingTrack: {
        type: String,
        default: 'General'
    },
    mentor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    background: {
        type: String,
        maxLength: 500
    },
    motivation: {
        type: String,
        maxLength: 500
    },
    status: {
        type: String,
        enum: ['active', 'on-hold', 'graduated'],
        default: 'active'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Trainee', TraineeSchema);


