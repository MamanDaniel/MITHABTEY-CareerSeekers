import { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';
import {fetchWithAuth} from '../utils/fetchWithAuth';

export default function DeleteJob() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [err, setError] = useState('');

    useEffect(() => {
        fetchWithAuth('/server/job/getalljobnames')
            .then(response => response.json())
            .then(data => {
                setJobs(data.jobs);
                setFilteredJobs(data.jobs);
            })
            .catch(() => {
                setError('Error fetching data');
            });
    }, []);

    useEffect(() => {
        // Filter jobs based on search query
        setFilteredJobs(
            jobs.filter(job =>
                job.jobName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, jobs]);

    const handleDelete = (jobId: string) => {
        fetch(`/server/job/deletejob/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setJobs(jobs.filter((job: any) => job._id !== jobId));
                    setFilteredJobs(filteredJobs.filter((job: any) => job._id !== jobId));
                } else {
                    setError('Error deleting job');
                }
            })
            .catch(() => {
                setError('Error deleting job');
            });
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-6 text-center">מחיקת מקצוע</h1>
            {err && <p className="text-red-500 text-center mb-4">{err}</p>}

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חפש לפי שם מקצוע"
                    className="w-64 px-3 py-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-300 text-right"
                />
            </div>

            <div className="flex flex-col items-center">
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredJobs.map((job: any) => (
                            <div key={job._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center w-full max-w-xs">
                                <span className="text-lg font-semibold">{job.jobName}</span>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-xl">אין מקצועות תואמים את החיפוש</p>
                )}
            </div>
        </div>
    );
}
