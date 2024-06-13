import Questionnaire from "../models/questionnaireModel.js";
import { errorHandler } from "../utils/error.js";

export const getQuestionnaires = async (req, res, next) => {
    const  Questionnaire_Name  = req.body.Questionnaire_Name;
    try {
        const questionnaireVal = await Questionnaire.findOne(({ Questionnaire_Name }));
        console.log(questionnaireVal);
        if (!questionnaireVal) {
            return next(errorHandler(404, 'Questionnaire not found'));
        }
        res.status(200).json(questionnaireVal);
    } catch (error) {
        next(error);
        console.log(error);
    }
};
