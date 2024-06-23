import express from 'express';
import { addJob, deleteJob, getAllJobsNames } from '../controllers/jobController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/addjob', verifyToken, addJob);
router.delete('/deletejob/:jobId', verifyToken, deleteJob);
router.get('/getalljobnames', verifyToken, getAllJobsNames);

export default router;