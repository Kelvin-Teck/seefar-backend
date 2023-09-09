import express from 'express';
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost)
    .get('/:id', getPost)
    .put('/:id', updatePost)
    .delete('/:id', deletePost)
    .put('/:id/like', likePost)
    .get('/:id/timeline', getTimelinePosts)
    
export default router;