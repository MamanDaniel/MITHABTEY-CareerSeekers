import Questionnaire from "../models/questionnaireModel.js";
import { errorHandler } from "../utils/error.js";
import { calculateNormalizedScores } from "../controllers/RAMAKcontroller.js";

// Get a questionnaire by name
export const getQuestionnaire = async (req, res, next) => {
    const Questionnaire_Name = req.body.Questionnaire_Name;
    try {
        const questionnaireVal = await Questionnaire.findOne(({ Questionnaire_Name }));
        if (!questionnaireVal) {
            return next(errorHandler(404, 'Questionnaire not found'));
        }
        res.status(200).json(questionnaireVal);
    } catch (error) {
        next(error);
        console.log(error);
    }
};

// calaculate the score of the questionnaire
export const calculateScore = async (req, res, next) => {
    const { answers } = req.body;
    try {
        res.status(200).json(calculateNormalizedScores(answers));
    } catch (error) {
        next(error);
        console.log(error);
    }

};
