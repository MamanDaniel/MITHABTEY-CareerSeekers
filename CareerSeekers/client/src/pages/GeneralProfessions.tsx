import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { FaArrowLeft, FaBriefcase, FaUsers, FaPalette, FaFlask, FaClipboardList, FaHandHoldingHeart, FaTree, FaLaptopCode } from 'react-icons/fa'; // Import necessary icons

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

const GeneralProfessions: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
    const [uniqueRequirements, setUniqueRequirements] = useState<OptionType[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
                setError('לא הצלחנו להוריד את המשרות');
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

    if (loading) return <p className="text-center">טוען...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4 mt-16" dir="rtl"> 
            <h1 className="text-2xl font-bold mb-4 text-center">חיפוש מקצוע מהמאגר על פי תכונות אופי</h1>
            <Select
                isMulti
                options={uniqueRequirements}
                onChange={handleSelectChange}
                placeholder="בחר דרישות כלליות"
                className="mb-4 sm:w-1/2 mx-auto min-[320px]:w-3/4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job, index) => {
                    const matchPercentage = calculateMatchPercentage(job.GeneralRequirements);
                    const missingRequirements = job.GeneralRequirements.filter(req => !selectedRequirements.includes(req));
                    const isActive = activeIndex === index;

                    // Fixed height for non-active cards
                    const heightClass = isActive ? 'h-auto' : 'h-36';

                    return (
                        <div
                            key={job.id}
                            className={`bg-white p-4 shadow-md rounded-md cursor-pointer transition transform hover:scale-105 ${heightClass}`}
                            onClick={() => setActiveIndex(isActive ? null : index)}
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold mb-2 flex items-center">
                                    {/* Display the icon next to the jobField */}
                                    {jobFieldIcons[job.jobField]} <span className="ml-2 mx-2">{job.jobName}</span>
                                </h2>
                                <p className="text-gray-800">
                                    {Number.isInteger(matchPercentage) ? matchPercentage.toFixed(0) : matchPercentage.toFixed(2)}% התאמה
                                </p>
                                <FaArrowLeft
                                    className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-90' : ''}`}
                                />
                            </div>

                            <hr />
                            {!isActive && (
                                <div className="mt-2">
                                    <p>
                                        <strong>דרישות: </strong>
                                        {job.GeneralRequirements.map((req, idx) => (
                                            <span
                                                key={req}
                                                className={`${selectedRequirements.includes(req) ? 'text-green-600' : 'text-red-600'} mr-2`}
                                            >
                                                {req}{idx < job.GeneralRequirements.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            )}
                            {isActive && (
                                <div className="mt-2">
                                    <p><strong>תיאור: </strong> {job.Description}</p>
                                    <p><strong>שכר ממוצע: </strong> ${job.AverageSalary}</p>
                                    <p><strong>תחום מקצועי: </strong> {job.jobField}</p>
                                    {job.facebookPostUrl && (
                                        <p><strong>פוסט בפייסבוק: </strong>
                                            <a
                                                href={job.facebookPostUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                לינק
                                            </a>
                                        </p>
                                    )}
                                    <p>
                                        <strong>דרישות חסרות: </strong>
                                        {missingRequirements.length > 0 ? (
                                            <span className="text-red-600">{missingRequirements.join(', ')}</span>
                                        ) : (
                                            'אין דרישות חסרות למקצוע זה.'
                                        )}
                                    </p>
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
