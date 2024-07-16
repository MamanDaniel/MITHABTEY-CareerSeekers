import Job from '../models/jobModel.js';
import User from '../models/userModel.js';
import { errorHandler } from "../utils/error.js";
import { geneticAlgorithm } from "../controllers/geneticAlgorithmController.js"
import { updateSuitableJobs } from "../controllers/userController.js"

// get jobname and Prerequisites from all jobs in the database and use them in findSuitableProfessions
export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        const professionTraits = jobs.map(job => {
            return {
                jobName: job.jobName,
                Prerequisites: job.Prerequisites
            }
        });
        if (!professionTraits) {
            return next(errorHandler(404, 'Professions not found'));
        }
        return professionTraits;
    } catch (error) {
        next(error);
    }
}

// Get user traits from the database and use them in findSuitableProfessions
export const getUserTraits = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        const personTraits = user.traits;
        const personTraitsConverted = convertPersonTraits(personTraits);
        if (!personTraits) {
            return next(errorHandler(404, 'User traits not found'));
        }
        return personTraitsConverted;
    }
    catch (error) {
        next(error);
    }
}

// Find suitable professions by genetic algorithm
// numGenerations = 100; populationSize = 50; professionTraits = getAllJobs(); personTraits = getUserTraits();
// update the user's suitable jobs in the database
export const findSuitableProfessions = async (req, res, next) => {
    try {
        const professionTraits = await getAllJobs(req, res, next);
        const personTraits = await getUserTraits(req, res, next);
        let numGenerations = 100;
        let populationSize = 50;
        let matchedProfessions = geneticAlgorithm(personTraits, professionTraits, numGenerations, populationSize);
        req.body.SuitableJobs = matchedProfessions;
        // Update user's suitable jobs in the database with the matched professions
        await updateSuitableJobs(req, res, next);

    }
    catch (error) {
        next(error);
    }
}

// convert the traits of the user to the format of the traits of the professions
function convertPersonTraits(traits) {
    // Mapping original trait names to new trait names
    const traitMapping = {
        'Business': 'Business',
        'General Culture': 'GeneralCulture',
        'Arts and Entertainment': 'ArtsAndEntertainment',
        'Science': 'Science',
        'Organization': 'Organization',
        'Service': 'Service',
        'Outdoor': 'Outdoor',
        'Technology': 'Technology'
    };

    let newTraits = {};

    for (let [key, value] of Object.entries(traits)) {
        if (traitMapping[key]) {
            // Assuming you want to round the values to the nearest integer
            newTraits[traitMapping[key]] = Math.round(value);
        }
    }

    return newTraits;
}

// Get suitable jobs of the user from the database
export const getSuitableJobs = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        const suitableJobs = user.SuitableJobs;
        if (!suitableJobs) {
            return next(errorHandler(404, 'Suitable jobs not found'));
        }
        res.status(200).json(suitableJobs);
    }
    catch (error) {
        next(error);
    }
}



