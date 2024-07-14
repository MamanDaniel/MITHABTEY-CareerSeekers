import express from 'express';
import {findSuitableProfessions} from '../controllers/jobMatchingController.js';

const router = express.Router();

router.get('/findSuitableProfessions', findSuitableProfessions);

export default router;