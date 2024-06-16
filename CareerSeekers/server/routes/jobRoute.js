import express from 'express';
import { addJob } from '../controllers/jobController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/addjob', verifyToken, addJob);

export default router;