import Job from '../models/jobModel.js';
import { errorHandler } from "../utils/error.js";

export const addJob = async (req, res, next) => {
    console.log(req.body);
    try {
        const { jobName, Description, AverageSalary, joblField, Prerequisites } = req.body;

        // Validate the request body
        if (!jobName || !Description || !AverageSalary || !joblField || !Prerequisites) {
            return next(errorHandler(400, 'All fields are required.'));
        }

        // Create a new job instance
        const newJob = new Job({
            jobName,
            Description,
            AverageSalary,
            joblField,
            Prerequisites
        });

        // Save the job to the database
        const savedJob = await newJob.save();

        res.status(201).json({ success: true, data: savedJob });
    } catch (error) {
        next(error);
    }
};

// Get all jobs
export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        next(error);
    }
};