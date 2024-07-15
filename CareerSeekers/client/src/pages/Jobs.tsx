import React, { useState, useEffect } from 'react';
import JobsFieldCountChart from '../components/jobs/JobsFieldCountChart';
import SalaryChart from '../components/jobs/SalaryChart';
import JobTable from '../components/jobs/JobTable';
import PrerequisitesChart from '../components/jobs/PrerequisitesChart';
import Select from 'react-select';

const Jobs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ data: { _id: string, jobName: string, Description: string, AverageSalary: number, jobField: string, Prerequisites: { [key: string]: number } }[] }>({ data: [] });
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data.data);
    const [jobFieldChartData, setJobFieldChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [salaryChartData, setSalaryChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [selectedJobFields, setSelectedJobFields] = useState<{ value: string, label: string }[]>([]);
    const [selectedJob, setSelectedJob] = useState<{ [key: string]: number }>({});
    const [selectedJobName, setSelectedJobName] = useState<string>('');
    const [showPrerequisites, setShowPrerequisites] = useState(false);
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);
    
    const aggregateDataByJobField = (jobs: { jobField: string }[]) => {
        const aggregatedData: { [key: string]: number } = {};
        jobs.forEach(job => {
            const jobField = job.jobField;
            if (aggregatedData[jobField]) {
                aggregatedData[jobField] += 1;
            } else {
                aggregatedData[jobField] = 1;
            }
        });
        return aggregatedData;
    };

    const aggregateAverageSalaryByJobField = (jobs: { jobField: string, AverageSalary: number }[]) => {
        const salaryData: { [key: string]: { totalSalary: number, count: number } } = {};
        jobs.forEach(job => {
            const jobField = job.jobField;
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
        };
        fetchAllJobs();
    }, []);

    useEffect(() => {
        const firstFiveJobs = data.data.slice(0, 5);
        const aggregatedJobFieldData = aggregateDataByJobField(firstFiveJobs);
        const aggregatedAverageSalaryData = aggregateAverageSalaryByJobField(firstFiveJobs);

        setOptions(data.data.map(job => job.jobField).filter((value, index, self) => self.indexOf(value) === index).map(label => ({ value: label, label })));

        setJobFieldChartData({
            labels: Object.keys(aggregatedJobFieldData),
            counts: Object.values(aggregatedJobFieldData)
        });

        setSalaryChartData({
            labels: Object.keys(aggregatedAverageSalaryData),
            counts: Object.values(aggregatedAverageSalaryData)
        });

        setFilteredData(firstFiveJobs);

    }, [data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = data.data.filter(job =>
            job.jobName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.Description.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.AverageSalary.toString().includes(e.target.value) ||
            job.jobField.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleJobClick = (job: { Prerequisites: { [key: string]: number }; jobName: string }) => {
        setSelectedJob(job.Prerequisites);
        setSelectedJobName(job.jobName);
        setShowPrerequisites(true);
    };

    const handleJobFieldSelection = (selected: any) => {
        if (selected.length <= 5) {
            setSelectedJobFields(selected);
        }
    };

    const handleSubmit = () => {
        const selectedFields = selectedJobFields.map(field => field.value);
        const filteredJobs = data.data.filter(job => selectedFields.includes(job.jobField));

        const filteredJobFieldData = aggregateDataByJobField(filteredJobs);
        const filteredAverageSalaryData = aggregateAverageSalaryByJobField(filteredJobs);

        setJobFieldChartData({
            labels: Object.keys(filteredJobFieldData),
            counts: Object.values(filteredJobFieldData)
        });

        setSalaryChartData({
            labels: Object.keys(filteredAverageSalaryData),
            counts: Object.values(filteredAverageSalaryData)
        });
        setOptions(data.data.map(job => job.jobField).filter((value, index, self) => self.indexOf(value) === index).map(label => ({ value: label, label })));
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
                <div className="flex items-center justify-center  font-bold w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '300px', maxWidth: '300px' }}>
                    {showPrerequisites && Object.keys(selectedJob).length > 0 && <PrerequisitesChart data={{ labels: Object.keys(selectedJob), counts: Object.values(selectedJob) }}  jobName={selectedJobName} />}
                    {!showPrerequisites && <p>Select a job to view prerequisites</p>}
                </div>
            </div>

            <div className='w-full md:w-1/4 mx-auto'>
                <div className="flex items-center space-x-3 ">
                    <Select
                        id="jobFields"
                        name="jobFields"
                        placeholder="Select up to 5 Job Fields..."
                        isMulti
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedJobFields}
                        onChange={handleJobFieldSelection}
                    />
                    <button
                        onClick={handleSubmit}
                        className={`bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-r rounded-l ${selectedJobFields.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                        disabled={selectedJobFields.length === 0}
                    >
                        {selectedJobFields.length === 0 ? 'Select' : 'Submit'}
                    </button>
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
