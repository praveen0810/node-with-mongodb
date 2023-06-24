import express from 'express';
import userController from '../controllers/authController.js';
import { registerUserValidator, loginValidator } from '../validators/userValidator.js';


const router = express.Router();

router.post('/register', registerUserValidator, userController.registerUser);//TODO: Incrypt password
router.post('/login', loginValidator, userController.login); //TODO: dycript password password








export default router;