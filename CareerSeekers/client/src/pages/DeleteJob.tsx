import { useState, useEffect } from "react";

export default function DeleteJob() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        fetch('/server/job/getalljobnames')
            .then(response => response.json())
            .then(data => {
                setJobs(data.jobs);
            })
            .catch(err => {
                setError('Error fetching data');                            
            });
    }, [jobs]);
    
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
                    setJobs(jobs.filter(job => job !== jobId));
                } else {
                    setError('Error deleting job');                   
                }
            })
            .catch(err => {
                setError('Error deleting job');               
            });
    };

 
    return (
        <div>
            <h1>Delete Job Page</h1>
            <ul>
                
                {jobs.map((job: any) => (
                    <li key={job._id}>
                        {job.jobName}
                        <button onClick={() => handleDelete(job._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );  
}