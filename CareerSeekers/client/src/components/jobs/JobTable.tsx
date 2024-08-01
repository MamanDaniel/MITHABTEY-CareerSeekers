import React, { useState } from 'react';
import linkImage from '../../assets/link.png';

type Job = {
    _id: string;
    jobName: string;
    Description: string;
    AverageSalary: number;
    jobField: string;
    facebookPostUrl?: string;
    Prerequisites: { [key: string]: number };
};

type Props = {
    jobs: Job[];
    onJobClick: (job: Job) => void;
};

const JobTable: React.FC<Props> = ({ jobs, onJobClick }) => {
    const [sortBy, setSortBy] = useState<{ key: keyof Job; order: 'asc' | 'desc' }>({
        key: 'jobName',
        order: 'asc',
    });

    const handleSort = (key: keyof Job) => {
        setSortBy((prev) => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedData = [...jobs].sort((a, b) => {
        const order = sortBy.order === 'asc' ? 1 : -1;
        const aValue = a[sortBy.key]?.toString() || '';
        const bValue = b[sortBy.key]?.toString() || '';
        return order * aValue.localeCompare(bValue);
    });

    return (
        <div className="w-full my-3">
            <div className="overflow-x-auto">
                <table className="max-h-96 w-full table-auto border-collapse border border-gray-200 block">
                    <thead>
                        <tr className="bg-gray-100">
                            <SortableHeader
                                label="Job Name"
                                sortBy={sortBy}
                                onClick={() => handleSort('jobName')}
                                widthClass="w-1/4"
                            />
                            <SortableHeader
                                label="Description"
                                sortBy={sortBy}
                                onClick={() => handleSort('Description')}
                                widthClass="w-1/2"
                            />
                            <SortableHeader
                                label="Average Salary"
                                sortBy={sortBy}
                                onClick={() => handleSort('AverageSalary')}
                                widthClass="w-1/6"
                            />
                            <SortableHeader
                                label="Job Field"
                                sortBy={sortBy}
                                onClick={() => handleSort('jobField')}
                                widthClass="w-1/6"
                            />
                            <th className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6">
                                Link to Facebook post
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {sortedData.map((job) => (
                            <tr key={job._id} onClick={() => onJobClick(job)}>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/4">{job.jobName}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/2">{job.Description}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6">{job.AverageSalary}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6">{job.jobField}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6 text-center">
                                    {job.facebookPostUrl ? (
                                        <a href={job.facebookPostUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={linkImage} alt="Facebook Link" className="mx-auto h-10 w-10 " />
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

type SortBy = { key: keyof Job; order: 'asc' | 'desc' };

type SortableHeaderProps = {
    label: string;
    sortBy: SortBy;
    onClick: () => void;
    widthClass: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ label, onClick, widthClass }) => (
    <th
        className={`border border-gray-300 px-4 py-2 cursor-pointer relative ${widthClass}`}
        onClick={onClick}
    >
        <div className="flex items-center justify-between">
            <span>{label}</span>
            <span className="ml-1">↑↓</span>
        </div>
    </th>
);

export default JobTable;
