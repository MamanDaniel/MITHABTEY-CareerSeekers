import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    AverageSalary: {
        type: Number, // Use Number for floating point values
        required: true
    },
    joblField: {
        type: String,
        required: true
    },
    Prerequisites: {
        Business: { type: Number, default: 0 },
        GeneralCulture: { type: Number, default: 0 },
        ArtsAndEntertainment: { type: Number, default: 0 },
        Science: { type: Number, default: 0 },
        Organization: { type: Number, default: 0 },
        Service: { type: Number, default: 0 },
        Outdoor: { type: Number, default: 0 },
        Technology: { type: Number, default: 0 }
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
