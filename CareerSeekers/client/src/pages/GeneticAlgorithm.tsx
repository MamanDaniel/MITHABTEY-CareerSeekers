import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfessionCard from '../components/SuitableJobs/ProfessionCard';
import { FaBriefcase, FaUsers, FaPalette, FaFlask, FaClipboardList, FaHandHoldingHeart, FaTree, FaLaptopCode } from 'react-icons/fa'; // Import job field icons

// Define types for the job details
interface JobDetails {
    jobName: string;
    Description: string;
    AverageSalary: number;
    jobField: string;
    facebookPostUrl: string;
    Prerequisites: { [key: string]: number };
    standardDay: string;
    education: string;
    technicalSkills: string;
    workLifeBalance: string;
}

const GeneticAlgorithm = () => {
    const [professionsName, setProfessionsNames] = useState<{ job: string, percentage: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const [needRAMAK, setNeedRAMAK] = useState(false);
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const [jobs, setJobs] = useState<JobDetails[]>([]);

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
            <div
                className="p-8 flex flex-col items-center justify-center bg-cover bg-center mt-16"
                dir='rtl'
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">תחילה עלייך למלא שאלון RAMAK</h1>
                <p className="text-lg text-gray-600 mb-8 drop-shadow-md">
                    על מנת להציג לך את 3 המקועות המתאימים לך במידה המירבית, תחילה עלייך למלא את השאלון הבא 
                </p>
                <Link
                    to="/RamakQuestionnaire"
                    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 transition duration-200"
                >
                   למילוי השאלון
                </Link>
            </div>
        );
    }

    // Icon mapping based on jobField
    const jobFieldIcons: { [key: string]: React.ReactNode } = {
        Business: <FaBriefcase />,
        'General Culture': <FaUsers />,
        'Arts And Entertainment': <FaPalette />,
        Science: <FaFlask />,
        Organization: <FaClipboardList />,
        Service: <FaHandHoldingHeart />,
        Outdoor: <FaTree />,
        Technology: <FaLaptopCode />,
    };

    // Define a function to get the appropriate icon for each job field
    const getJobFieldIcon = (jobField: string) => {
        return jobFieldIcons[jobField] || null;
    };

    return (
        <div className="p-4 mt-16" dir='rtl'>
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-center">שלושת המקצועות המתאימים ביותר עבורך</h1>
                <h2 className="text-xl text-center text-gray-600">מבוסס על מאגר מקצועות רחב של קבוצת הפייסבוק <br/> 'מתחבטי מקצוע'</h2>
            </header>
            
            <div className="grid grid-cols-1 gap-4 w-full md:w-3/6 mx-auto">
                {professionsName.map((profession, index) => {
                    const jobDetails = jobs.find(job => job.jobName === profession.job) || null;
                    
                    return (
                        <ProfessionCard
                            key={index}
                            profession={profession}
                            jobDetails={jobDetails}
                            isActive={activeTab === index}
                            onClick={() => setActiveTab(activeTab === index ? null : index)}
                            jobFieldIcon={jobDetails ? getJobFieldIcon(jobDetails.jobField) : null} // Pass the icon to the ProfessionCard
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GeneticAlgorithm;
