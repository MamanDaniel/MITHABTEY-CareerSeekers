// ProfessionCard.tsx
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import PrerequisiteBar from './PrerequisiteBar';

interface ProfessionCardProps {
    profession: { job: string, percentage: number };
    jobDetails: {
        jobName: string;
        Description: string;
        AverageSalary: number;
        jobField: string;
        Prerequisites: { [key: string]: number };
    } | null;
    isActive: boolean;
    onClick: () => void;
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession, jobDetails, isActive, onClick }) => {
    return (
        <div
            className="bg-white p-4 shadow-md rounded-md cursor-pointer transition transform hover:scale-105"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-2">{profession.job}</h2>
                <p className="text-gray-800">{profession.percentage}% match</p>
                <FaArrowRight
                    className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-90' : ''}`}
                />  
            </div>
            <hr />
            {isActive && jobDetails && (
                <div className="mt-2">
                    <p><strong>Description:</strong> {jobDetails.Description}</p>
                    <p><strong>Average Salary:</strong> ${jobDetails.AverageSalary}</p>
                    <p><strong>Job Field:</strong> {jobDetails.jobField}</p>
                    <PrerequisiteBar prerequisites={jobDetails.Prerequisites} />
                </div>
            )}
        </div>
    );
};

export default ProfessionCard;
