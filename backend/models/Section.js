import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a section title'],
        trim: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    lectures: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Lecture'
        }
    ],
    order: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Section', SectionSchema);

