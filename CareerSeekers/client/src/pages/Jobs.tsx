import React, { useState, useEffect } from 'react';
import JobsChart from '../components/jobs/JobsChart';
import JobTable from '../components/jobs/JobTable';

const Jobs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ data: { _id: string, jobName: string, Description: string, AverageSalary: number, joblField: string }[] }>({ data: [] });
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data.data);
    const [chartData, setChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch('/server/job/getAllJobs');
                const data = await res.json();
                if (!res.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                setData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('Failed to fetch jobs');
                setLoading(false);
            }
        }
        fetchAllJobs();
    }, []);

    useEffect(() => {
        // Aggregate data for chart only once
        const aggregateDataByJobField = (jobs: { joblField: string }[]) => {
            const aggregatedData: { [key: string]: number } = {};

            jobs.forEach(job => {
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
        setChartData({
            labels: Object.keys(aggregatedData),
            counts: Object.values(aggregatedData)
        });

    }, [data]);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text text-center my-4 ">Job Information</h1>
            <div className="w-full md:w-1/2 mx-auto">
                {chartData.labels.length > 0 && <JobsChart data={chartData} />}
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
