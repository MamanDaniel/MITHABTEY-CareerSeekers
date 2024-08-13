import express from 'express';
import { signin, signup, signout, google, forgotPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout',signout);
router.post('/google', google);
router.post('/forgotPassword', forgotPassword);

export default router;