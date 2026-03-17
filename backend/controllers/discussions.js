import Discussion from '../models/Discussion.js';

// @desc    Create discussion post for course
// @route   POST /api/discussions
// @access  Private (student/educator)
export const createDiscussion = async (req, res, next) => {
  try {
    req.body.course = req.params.courseId;
    req.body.author = req.user.id;

    const discussion = await Discussion.create(req.body);

    res.status(201).json({
      success: true,
      data: discussion
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get discussions for course
// @route   GET /api/discussions/:courseId
// @access  Public
export const getCourseDiscussions = async (req, res, next) => {
  try {
    const discussions = await Discussion.find({ course: req.params.courseId })
      .populate('author', 'name photoURL')
      .populate('course', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: discussions.length,
      data: discussions
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Add reply to discussion
// @route   PUT /api/discussions/:discussionId/reply
// @access  Private
export const addReply = async (req, res, next) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    discussion.replies.push({
      content: req.body.content,
      author: req.user.id
    });

    await discussion.save();

    res.status(200).json({
      success: true,
      data: discussion
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete discussion (educator/admin only)
export const deleteDiscussion = async (req, res, next) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    // Check if user is author, educator of course, or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'educator' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Discussion.findByIdAndDelete(req.params.discussionId);

    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

