import React from 'react';

interface JobTableProps {
    data: {
        _id: string;
        jobName: string;
        Description: string;
        AverageSalary: number;
        joblField: string;
    }[];
}

const JobTable: React.FC<JobTableProps> = ({ data }) => {
    return (
        <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Job Name</th>
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Average Salary</th>
                    <th className="border border-gray-300 px-4 py-2">Job Field</th>
                </tr>
            </thead>
            <tbody>
                {data.map(job => (
                    <tr key={job._id}>
                        <td className="border border-gray-300 px-4 py-2">{job.jobName}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.Description}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.AverageSalary}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.joblField}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JobTable;
