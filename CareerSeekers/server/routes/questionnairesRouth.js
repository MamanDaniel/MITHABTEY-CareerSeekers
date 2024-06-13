import express from 'express';
import { getQuestionnaires } from '../controllers/questionnairesController.js';

const router = express.Router();

router.get('/getQuestionnaires', getQuestionnaires);


export default router;