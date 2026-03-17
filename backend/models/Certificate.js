import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
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
    certificateUrl: {
        type: String,
        required: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    },
    certificateId: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
