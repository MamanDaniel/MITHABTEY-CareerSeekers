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
        facebookPostUrl: string;
        Prerequisites: { [key: string]: number };
    } | null;
    isActive: boolean;
    onClick: () => void;
    jobFieldIcon: React.ReactNode | null;  // Added jobFieldIcon prop
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession, jobDetails, isActive, onClick, jobFieldIcon }) => {
    return (
        <div
            className="bg-white p-4 shadow-md rounded-md cursor-pointer transition transform hover:scale-105"
            onClick={onClick}
            dir="rtl"  // Set text direction to right-to-left
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    {jobFieldIcon && (
                        <span className="text-2xl">{jobFieldIcon}</span>  
                    )}
                    <h2 className="text-xl font-semibold mx-2">{profession.job}</h2>
                </div>
                <p className="text-gray-800">{profession.percentage}% התאמה</p> 
                <FaArrowRight
                    className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-90' : ''}`}
                />
            </div>
            <hr />
            {isActive && jobDetails && (
                <div className="mt-2">
                    <p><strong>תיאור:</strong> {jobDetails.Description}</p> 
                    <p><strong>שכר ממוצע:</strong> ${jobDetails.AverageSalary}</p> 
                    <p><strong>תחום מקצוע:</strong> {jobDetails.jobField}</p> 
                    {jobDetails.facebookPostUrl && (
                        <>
                            <p><strong>פוסט בפייסבוק: </strong>
                            <a
                                href={jobDetails.facebookPostUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                קישור
                            </a></p> 
                        </>
                    )}
                    <PrerequisiteBar prerequisites={jobDetails.Prerequisites} />
                </div>
            )}
        </div>
    );
};

export default ProfessionCard;
