import React, { useState, useEffect } from 'react';
import JobsChart from '../components/jobs/JobsChart';
import JobTable from '../components/jobs/JobTable';

const Jobs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ data: { _id: string, jobName: string, Description: string, AverageSalary: number, joblField: string }[] }>({ data: [] });
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data.data);
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch('/server/job/getAllJobs');
                const data = await res.json();
                setData(data);
                setFilteredData(data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('Failed to fetch jobs');
                setLoading(false);
            }
        }
        fetchAllJobs();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = data.data.filter(job =>
            job.jobName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.Description.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.AverageSalary.toString().includes(e.target.value) ||
            job.joblField.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    type JobData = typeof data.data;

    const aggregateDataByJobField = (data: JobData) => {
        const aggregatedData: { [key: string]: number } = {};

        data.forEach(job => {
            const jobField = job.joblField;
            if (aggregatedData[jobField]) {
                aggregatedData[jobField] += 1;
            } else {
                aggregatedData[jobField] = 1;
            }
        });

        return aggregatedData;
    };

    const aggregatedData = aggregateDataByJobField(data.data);
    const chartData = {
        labels: Object.keys(aggregatedData),
        counts: Object.values(aggregatedData)
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Job Information</h1>
            <div className="w-full md:w-1/2 mx-auto">
                <JobsChart data={chartData} />
            </div>
            <div className="w-full md:w-1/2 mx-auto">
                <input
                    type="text"
                    placeholder="Search for professions..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="w-full md:w-1/2 mx-auto">
                <JobTable data={filteredData} />
            </div>
        </div>
    );
};

export default Jobs;
