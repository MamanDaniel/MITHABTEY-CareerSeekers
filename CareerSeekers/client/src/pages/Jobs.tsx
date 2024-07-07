import React, { useState, useEffect } from 'react';
import JobsFieldCountChart from '../components/jobs/JobsFieldCountChart';
import PrerequisitesChart from '../components/jobs/PrerequisitesChart';
import SalaryChart from '../components/jobs/SalaryChart';
import JobTable from '../components/jobs/JobTable';

const Jobs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ data: { _id: string, jobName: string, Description: string, AverageSalary: number, joblField: string, Prerequisites: { [key: string]: number } }[] }>({ data: [] });
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data.data);
    const [jobFieldChartData, setJobFieldChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [prerequisitesChartData, setPrerequisitesChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [salaryChartData, setSalaryChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [selectedJob, setSelectedJob] = useState<{ [key: string]: number }>({});
    const [showPrerequisites, setShowPrerequisites] = useState(false);

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

        const aggregateAverageSalaryByJobField = (jobs: { joblField: string, AverageSalary: number }[]) => {
            const salaryData: { [key: string]: { totalSalary: number, count: number } } = {};

            jobs.forEach(job => {
                const jobField = job.joblField;
                if (salaryData[jobField]) {
                    salaryData[jobField].totalSalary += job.AverageSalary;
                    salaryData[jobField].count += 1;
                } else {
                    salaryData[jobField] = { totalSalary: job.AverageSalary, count: 1 };
                }
            });

            const averageSalaryData: { [key: string]: number } = {};
            for (const field in salaryData) {
                averageSalaryData[field] = salaryData[field].totalSalary / salaryData[field].count;
            }

            return averageSalaryData;
        };

        const aggregatePrerequisites = (jobs: { Prerequisites: { [key: string]: number } }[]) => {
            const prerequisitesData: { [key: string]: number } = {};

            jobs.forEach(job => {
                const prerequisites = job.Prerequisites;
                for (const key in prerequisites) {
                    if (prerequisitesData[key]) {
                        prerequisitesData[key] += prerequisites[key];
                    } else {
                        prerequisitesData[key] = prerequisites[key];
                    }
                }
            });

            return prerequisitesData;
        };

        const aggregatedJobFieldData = aggregateDataByJobField(data.data);
        const aggregatedAverageSalaryData = aggregateAverageSalaryByJobField(data.data);
        const aggregatedPrerequisitesData = aggregatePrerequisites(data.data);

        setJobFieldChartData({
            labels: Object.keys(aggregatedJobFieldData),
            counts: Object.values(aggregatedJobFieldData)
        });

        setSalaryChartData({
            labels: Object.keys(aggregatedAverageSalaryData),
            counts: Object.values(aggregatedAverageSalaryData)
        });

        setPrerequisitesChartData({
            labels: Object.keys(aggregatedPrerequisitesData),
            counts: Object.values(aggregatedPrerequisitesData)
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

    const handleJobClick = (job: { Prerequisites: { [key: string]: number } }) => {
        setSelectedJob(job.Prerequisites);
        setShowPrerequisites(true);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="space-y-8 m-4">
            <h1 className="text-2xl font-bold text-center my-4">Job Information</h1>
           
            <div className="flex flex-wrap justify-center gap-4">
                <div className="w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '300px', maxWidth: '300px' }}>
                    {jobFieldChartData.labels.length > 0 && <JobsFieldCountChart data={jobFieldChartData} />}
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '500px', maxWidth: '500px' }}>
                    {salaryChartData.labels.length > 0 && <SalaryChart data={salaryChartData} />}
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '300px', maxWidth: '300px' }}>
                    {showPrerequisites && prerequisitesChartData.labels.length > 0 && <PrerequisitesChart data={{ labels: Object.keys(selectedJob), counts: Object.values(selectedJob) }} />}
                    {!showPrerequisites && <p>Select a job to view prerequisites</p>}
               
                </div>
            </div>
           
            <div className="w-full md:w-1/2 mx-auto">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for jobs"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <JobTable jobs={filteredData} onJobClick={handleJobClick} />
            </div>
        </div>
    );
};

export default Jobs;
