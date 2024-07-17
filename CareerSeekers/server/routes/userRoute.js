import express from 'express';
import {updateUser, updateSuitableJobs, getUserTraits } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/update/:id', verifyToken, updateUser);
router.post('/updateSuitableJobs/:id', verifyToken, updateSuitableJobs);
router.post('/getUserTraits',  getUserTraits);

export default router;