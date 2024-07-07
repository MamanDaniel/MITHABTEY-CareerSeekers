import React, { useState } from 'react';

type Job = {
    _id: string;
    jobName: string;
    Description: string;
    AverageSalary: number;
    joblField: string;
    Prerequisites: { [key: string]: number };
};

type Props = {
    jobs: Job[];
};

const JobTable: React.FC<Props> = ({ jobs }) => {
    const [sortBy, setSortBy] = useState<{ key: keyof Job; order: 'asc' | 'desc' }>({
        key: 'jobName', // Initial sort by Job Name alphabetically
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
        return order * (a[sortBy.key].toString().localeCompare(b[sortBy.key].toString()));
    });

    return (
        <div className="w-full">
            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <SortableHeader
                            label="Job Name"
                            sortBy={sortBy}
                            onClick={() => handleSort('jobName')}
                        />
                        <SortableHeader
                            label="Description"
                            sortBy={sortBy}
                            onClick={() => handleSort('Description')}
                        />
                        <SortableHeader
                            label="Average Salary"
                            sortBy={sortBy}
                            onClick={() => handleSort('AverageSalary')}
                        />
                        <SortableHeader
                            label="Job Field"
                            sortBy={sortBy}
                            onClick={() => handleSort('joblField')}
                        />
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((job) => (
                        <tr key={job._id}>
                            <td className="border border-gray-300 px-4 py-2">{job.jobName}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.Description}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.AverageSalary}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.joblField}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

type SortBy = { key: keyof Job; order: 'asc' | 'desc' };

type SortableHeaderProps = {
    label: string;
    sortBy: SortBy;
    onClick: () => void;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ label, onClick }) => (
    <th
        className="border border-gray-300 px-4 py-2 cursor-pointer relative"
        onClick={onClick}
    >
        <div className="flex items-center justify-between">
            <span>{label}</span>
            <span className="ml-1">
                ↑↓
            </span>
        </div>
    </th>
);

export default JobTable;
