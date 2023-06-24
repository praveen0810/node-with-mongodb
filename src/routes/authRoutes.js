import express from 'express';
import userController from '../controllers/authController.js';
import { registerUserValidator } from '../validators/userValidator.js';


const router = express.Router();

router.post('/register', registerUserValidator, userController.registerUser);







export default router;