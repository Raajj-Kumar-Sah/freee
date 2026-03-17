import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a lecture title'],
        trim: true
    },
    videoUrl: {
        type: String,
        required: [true, 'Please add a video URL']
    },
    duration: {
        type: String,
        default: '0:00'
    },
    section: {
        type: mongoose.Schema.ObjectId,
        ref: 'Section',
        required: true
    },
    resources: [
        {
            title: String,
            url: String
        }
    ],
    order: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Lecture', LectureSchema);

