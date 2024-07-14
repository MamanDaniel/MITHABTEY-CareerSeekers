import express from 'express';
import {findSuitableProfessions} from '../controllers/jobMatchingController.js';

const router = express.Router();

router.post('/findSuitableProfessions', findSuitableProfessions);

export default router;