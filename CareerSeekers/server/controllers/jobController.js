import Job from '../models/jobModel.js';
import { errorHandler } from "../utils/error.js";

export const addJob = async (req, res, next) => {
    try {
        const { jobName, Description, AverageSalary, joblField, Prerequisites, facebookPostUrl } = req.body;

        // Validate the request body
        if (!jobName || !Description || !AverageSalary || !jobField || !Prerequisites) {
            return next(errorHandler(400, 'All fields are required.'));
        }

        // Create a new job instance
        const newJob = new Job({
            jobName,
            Description,
            AverageSalary,
            joblField,
            Prerequisites,
            facebookPostUrl
        });

        // Save the job to the database
        const savedJob = await newJob.save();
        res.status(201).json({ success: true, data: savedJob });
    } catch (error) {
        next(error);
    }
};

export const deleteJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        // Validate the request body
        if (!jobId) {
            return next(errorHandler(400, 'Job ID is required.'));
        }

        // Find the job by ID and delete it
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return next(errorHandler(404, 'Job not found.'));
        }

        res.status(200).json({ success: true, data: deletedJob });
    } catch (error) {
        next(error);
    }
}

export const getAllJobsNames = async (req, res, next) => {
    try {
        const jobs = await Job.find({}, 'jobName');
        res.status(200).json({ jobs });
    } catch (error) {
        next(error);
    }
}

export const getURLofJob = async (req, res, next) => {
    try {
        const jobs = await Job.find({ facebookPostUrl: { $exists: true } }, 'jobName facebookPostUrl -_id');
        res.status(200).json({ jobs });
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

// get jobname and Prerequisites from all jobs to gentic algorithm
export const getJobsForGA = async (req, res, next) => {
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