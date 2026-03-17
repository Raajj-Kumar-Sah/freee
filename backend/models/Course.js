import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        default: 'no-photo.jpg'
    },
    educator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    ratings: {
        type: [Number],
        default: []
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    discussions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Discussion'
        }
    ],
    sections: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Section'
        }
    ],
    averageRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

CourseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'course',
  justOne: false
});

CourseSchema.pre('save', function(next) {
  this.averageRating = this.ratings.length > 0 
    ? this.ratings.reduce((acc, val) => acc + val, 0) / this.ratings.length 
    : 0;
  next();
});

CourseSchema.methods.addRating = function(rating) {
  this.ratings.push(rating);
  return this.save();
};

export default mongoose.model('Course', CourseSchema);

