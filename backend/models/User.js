import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    photoURL: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
        type: String,
        enum: ['student', 'educator', 'admin'],
        default: 'student'
    },
    createdCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

UserSchema.methods.getResetPasswordToken = function() {
  // Generate token reset hash
  return crypto.randomBytes(20).toString('hex');
};

UserSchema.index({ resetPasswordToken: 1, resetPasswordExpire: 1 });

import jwt from 'jsonwebtoken';

export default mongoose.model('User', UserSchema);

