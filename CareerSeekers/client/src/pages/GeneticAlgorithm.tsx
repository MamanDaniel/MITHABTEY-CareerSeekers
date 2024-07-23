import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const GeneticAlgorithm = () => {
    const [professionsName, setProfessionsNames] = useState<{ job: string, percentage: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const [userTraits, setUserTraits] = useState<any[]>([]);
    const [needRAMAK, setNeedRAMAK] = useState(false);
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserTraitsAndJobs = async () => {
            try {
                const userTraitsRes = await fetch('/server/user/getUserTraits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: currentUser._id })
                });
                const userTraitsData = await userTraitsRes.json();
                const arrayData = Object.values<number>(userTraitsData).map((value: number) => ({ value }));
                setUserTraits(arrayData);
                if (arrayData.every((trait) => trait.value === 0)) {
                    setNeedRAMAK(true);
                    setLoading(false);
                    return;
                }

                const professionsRes = await fetch('/server/geneticAlgorithm/getSuitableJobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: currentUser._id })
                });
                const professionsData = await professionsRes.json();
                if (professionsData.message === 'Suitable jobs not found') {
                    setNeedRAMAK(true);
                    setLoading(false);
                    return;
                }
                setProfessionsNames(professionsData);

                const jobsRes = await fetch('/server/job/getJobsByNames', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ jobNames: professionsData.map((profession: { job: any; }) => profession.job) })
                });
                const jobsData = await jobsRes.json();
                if (jobsData.message === 'Suitable jobs not found') {
                    setNeedRAMAK(true);
                    setLoading(false);
                    return;
                }
                setJobs(jobsData.data); // Update to access data array
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserTraitsAndJobs();
    }, [currentUser._id, needRAMAK]); // Adding needRAMAK to dependencies

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (needRAMAK) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">RAMAK first</h1>
                <Link to="/RamakQuestionnaire" className="text-blue-500 underline">Go to RAMAK Questionnaire</Link>
            </div>
        );
    }

    return (
        <div className="p-4">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-center">Top 3 Professions for You</h1>
                <h2 className="text-xl text-center text-gray-600">Based on a large database of data from MITHABTEY</h2>
            </header>
            <div className="grid grid-cols-1 gap-4 w-full md:w-3/6 mx-auto">
                {professionsName.map((profession, index) => {
                    const jobDetails = jobs.find(job => job.jobName === profession.job);
                    return (
                        <div key={index} className="bg-white p-4 shadow-md rounded-md cursor-pointer transition transform hover:scale-105"
                             onClick={() => setActiveTab(activeTab === index ? null : index)}>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold mb-2">{profession.job}</h2>
                                <p className="text-gray-800">{profession.percentage}% match</p>
                                <FaArrowRight
                                    className={`w-6 h-6 transform transition-transform ${activeTab === index ? 'rotate-90' : ''}`}
                                />
                            </div>
                            {activeTab === index && jobDetails && (
                                <div className="mt-2">
                                    <p><strong>Description:</strong> {jobDetails.Description}</p>
                                    <p><strong>Average Salary:</strong> ${jobDetails.AverageSalary}</p>
                                    <p><strong>Job Field:</strong> {jobDetails.jobField}</p>
                                    {/* Add more details as needed */}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GeneticAlgorithm;
