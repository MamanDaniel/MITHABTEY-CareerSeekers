import express from 'express';
import { calculateScore, getQuestionnaire } from '../controllers/questionnairesController.js';

const router = express.Router();

// Get a questionnaire by name
router.post('/getQuestionnaire', getQuestionnaire);
router.post('/calculateScore', calculateScore);


export default router;