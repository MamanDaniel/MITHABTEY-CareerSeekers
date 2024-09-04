import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import JobForm from '../components/jobs/jobForm';

export default function EditJob() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<any[]>([]); // Store all jobs
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]); // Store filtered jobs for search functionality
    const [selectedJob, setSelectedJob] = useState<any>(null); // Store the selected job data
    const [initialData, setInitialData] = useState<any>(null); // Store the data to be passed to JobForm
    const [searchText, setSearchText] = useState<string>(''); // Store the search text
    const [noResults, setNoResults] = useState<boolean>(false); // Track if no results found

    useEffect(() => {
        // Fetch all job data
        const fetchJobs = async () => {
            try {
                const response = await fetch('/server/job/getalljobnames');
                const data = await response.json();
                setJobs(data.jobs);
                setFilteredJobs(data.jobs); // Initialize filteredJobs with all jobs
            } catch (err) {
                toast.error('Failed to fetch jobs.');
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        if (selectedJob !== null) {
            fetch(`/server/job/jobData/${selectedJob}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setInitialData(data);
                })
                .catch(() => {
                    toast.error('Failed to fetch job.');
                });
        }
    }, [selectedJob]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = jobs.filter(job => job.jobName.toLowerCase().includes(value));
        setFilteredJobs(filtered);
        setNoResults(filtered.length === 0); // Update noResults based on the filtered result
    };

    const handleJobSelect = (jobId: string) => {
        setSelectedJob(jobId);
    };

    const handleSubmit = async (formData: any) => {
        try {
            const response = await fetch(`/server/job/updatejob/${selectedJob}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('המקצוע התעדכן בהצלחה!', {
                    position: 'top-center',
                    autoClose: 2000,
                    onClose: () => navigate('/adminpanel')
                });
            } else {
                toast.error(data.message || 'Failed to update job.');
            }
        } catch (err) {
            toast.error('Failed to update job. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 p-4 mt-20" dir='rtl'>
            <ToastContainer />
            <div className="md:w-2/5 mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <h1 className="text-2xl font-bold text-center py-2 bg-slate-700 text-white">עידכון פרטי מקצוע</h1>
                
                {jobs.length > 0 ? (
                    <div>
                        <label htmlFor="job-search" className="block text-center my-4">הקלד\י מקצוע מבוקש</label>
                        <input
                            id="job-search"
                            type="text"
                            className="block mx-auto mb-4 p-2 border rounded w-3/4"
                            placeholder="הקלד\י שם המקצוע"
                            value={searchText}
                            onChange={handleSearch}
                        />

                        {noResults && (
                            <p className="text-red-500 text-center mb-4">לא נמצאו תוצאות תואמות לחיפוש</p>
                        )}

                        <label htmlFor="job-select" className="block text-center my-4">בחר מקצוע מכלל המקצועות:</label>
                        <select
                            id="job-select"
                            className="block mx-auto mb-4 p-2 border rounded w-3/4"
                            onChange={(e) => handleJobSelect(e.target.value)}
                            value={selectedJob || ''}
                        >
                            <option value="" disabled>בחר מקצוע לעדכן</option>
                            {filteredJobs.map(job => (
                                <option key={job._id} value={job._id}>
                                    {job.jobName}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <p>Loading jobs...</p>
                )}

                {initialData ? (
                    <JobForm key={initialData._id} initialData={initialData} onSubmit={handleSubmit} isEditMode={true} />
                ) : null}
            </div>
        </div>
    );
}
