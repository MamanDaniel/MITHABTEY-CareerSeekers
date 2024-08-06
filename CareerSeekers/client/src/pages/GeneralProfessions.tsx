import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { FaArrowRight } from 'react-icons/fa';

interface Job {
  id: string;
  jobName: string;
  Description: string;
  AverageSalary: number;
  jobField: string;
  facebookPostUrl?: string;
  GeneralRequirements: string[];
}

interface OptionType {
  value: string;
  label: string;
}

const GeneralProfessions: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [uniqueRequirements, setUniqueRequirements] = useState<OptionType[]>([]);
  const [activeJobIndex, setActiveJobIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch('/server/job/getAllJobs');
        const result = await res.json();

        if (!Array.isArray(result.data)) {
          throw new Error('Invalid data format');
        }

        const jobsData = result.data.map((job: { GeneralRequirements: any; }) => ({
          ...job,
          GeneralRequirements: job.GeneralRequirements || []
        }));

        setJobs(jobsData);

        const requirements: string[] = jobsData.reduce((acc: string[], job: Job) => {
          job.GeneralRequirements.forEach(req => {
            if (!acc.includes(req)) {
              acc.push(req);
            }
          });
          return acc;
        }, []);
        setUniqueRequirements(requirements.map(req => ({ value: req, label: req })));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  const handleSelectChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedRequirements(selectedOptions ? selectedOptions.map(opt => opt.value) : []);
  };

  const calculateMatchPercentage = (jobRequirements: string[]): number => {
    if (jobRequirements.length === 0) return 0;

    const matchCount = jobRequirements.filter(req => selectedRequirements.includes(req)).length;

    return (matchCount / jobRequirements.length) * 100;
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchPercentage = calculateMatchPercentage(job.GeneralRequirements);
      return matchPercentage > 0; // Exclude jobs with 0% match
    })
    .sort((a, b) => calculateMatchPercentage(b.GeneralRequirements) - calculateMatchPercentage(a.GeneralRequirements));

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const toggleJobDetails = (index: number) => {
    setActiveJobIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">General Professions</h1>
      <Select
        isMulti
        options={uniqueRequirements}
        onChange={handleSelectChange}
        placeholder="Select General Requirements"
        className="mb-4 w-1/2 mx-auto"
      />

      <div className="space-y-4">
        {filteredJobs.map((job, index) => {
          const matchPercentage = calculateMatchPercentage(job.GeneralRequirements);
          const missingRequirements = job.GeneralRequirements.filter(req => !selectedRequirements.includes(req));
          const isActive = activeJobIndex === index;

          return (
            <div 
              key={job.id} 
              className="bg-white p-4 shadow-md rounded-md cursor-pointer transition transform hover:scale-105"
              onClick={() => toggleJobDetails(index)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-2">{job.jobName}</h2>
                <p className="text-gray-800">{matchPercentage.toFixed(2)}% match</p>
                <FaArrowRight
                  className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-90' : ''}`}
                />
              </div>
              <hr />
              {isActive && (
                <div className="mt-2">
                  <p><strong>Description:</strong> {job.Description}</p>
                  <p><strong>Average Salary:</strong> ${job.AverageSalary}</p>
                  <p><strong>Job Field:</strong> {job.jobField}</p>
                  {job.facebookPostUrl && (
                    <p>
                      <strong>Facebook Post: </strong>
                      <a
                        href={job.facebookPostUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Link
                      </a>
                    </p>
                  )}
                  <p><strong>Missing Requirements:</strong> {missingRequirements.length > 0 ? missingRequirements.join(', ') : 'There are no more missing requirements for this profession'}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralProfessions;
