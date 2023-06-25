import express from 'express';
import authRoutes from './authRoutes.js'
import postRoutes from './postRoutes.js'

const router = express.Router();

router.use(authRoutes);
router.use(postRoutes);

export default router;