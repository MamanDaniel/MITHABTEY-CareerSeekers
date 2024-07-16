import express from 'express';
import {findSuitableProfessions, getSuitableJobs} from '../controllers/jobMatchingController.js';

const router = express.Router();

router.post('/findSuitableProfessions', findSuitableProfessions);
router.post('/getSuitableJobs', getSuitableJobs);

export default router;