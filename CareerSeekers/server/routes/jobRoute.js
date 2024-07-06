import express from 'express';
import { addJob } from '../controllers/jobController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getAllJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/addjob', verifyToken, addJob);
router.get('/getAllJobs', getAllJobs);

export default router;