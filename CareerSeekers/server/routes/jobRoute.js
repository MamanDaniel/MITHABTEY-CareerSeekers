import express from 'express';
import { addJob, deleteJob, getAllJobsNames, getURLofJob,getJobsByNames } from '../controllers/jobController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getAllJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/addjob', verifyToken, addJob);
router.delete('/deletejob/:jobId', verifyToken, deleteJob);
router.get('/getalljobnames', verifyToken, getAllJobsNames);
router.get('/getURLjobs', verifyToken, getURLofJob);
router.get('/getAllJobs', getAllJobs);
router.post('/getJobsByNames', getJobsByNames);

export default router;