import express from 'express';
import { 
  createDiscussion, 
  getCourseDiscussions, 
  addReply, 
  deleteDiscussion 
} from '../controllers/discussions.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getCourseDiscussions)
  .post(protect, createDiscussion);

router.route('/:discussionId/reply')
  .put(protect, addReply);

router.route('/:discussionId')
  .delete(protect, authorize('educator', 'admin'), deleteDiscussion);

export default router;

