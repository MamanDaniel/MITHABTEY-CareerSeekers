import express from 'express';
import {findSuitableProfessions, getSuitableJobs} from '../controllers/jobMatchingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/findSuitableProfessions',verifyToken, findSuitableProfessions);
router.post('/getSuitableJobs',verifyToken, getSuitableJobs);

export default router;