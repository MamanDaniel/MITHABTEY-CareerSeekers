import express from 'express';
import { getQuestionnaire } from '../controllers/questionnairesController.js';

const router = express.Router();

// Get a questionnaire by name
router.post('/getQuestionnaire', getQuestionnaire);


export default router;