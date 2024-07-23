import express from 'express';
import { calculateScore, getQuestionnaire, updateUserTraits } from '../controllers/questionnairesController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Get a questionnaire by name
router.post('/getQuestionnaire',verifyToken, getQuestionnaire);
router.post('/calculateScore',verifyToken, calculateScore);
router.post('/updateUserTraits/:id',verifyToken, updateUserTraits);


export default router;