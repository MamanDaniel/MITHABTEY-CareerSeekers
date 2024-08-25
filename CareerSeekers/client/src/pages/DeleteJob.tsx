import { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';

export default function DeleteJob() {
    const [jobs, setJobs] = useState([]);
    const [err, setError] = useState('');

    useEffect(() => {
        fetch('/server/job/getalljobnames')
            .then(response => response.json())
            .then(data => {
                setJobs(data.jobs);
            })
            .catch(() => {
                setError('Error fetching data');                            
            });
    }, []);
    
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job: any) => (
                    <div key={job._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
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
        </div>
    );  
}