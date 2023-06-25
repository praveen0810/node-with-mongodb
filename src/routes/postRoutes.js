import express from 'express';
import postController from '../controllers/postController.js';
import { addPost, updatePost, likes, deletePost } from '../validators/postValidator.js';


const router = express.Router();

router.post('/create-post', addPost, postController.CreatePost);

export default router;