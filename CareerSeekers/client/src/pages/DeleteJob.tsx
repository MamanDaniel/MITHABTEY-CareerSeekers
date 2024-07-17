import { useState, useEffect } from "react";

export default function DeleteJob() {
    const [jobs, setJobs] = useState([]);
    const [err, setError] = useState('');
    const [urls, setUrls] = useState([]);
    useEffect(() => {
        fetch('/server/job/getURLjobs')
            .then(response => response.json())
            .then(data => {
                setUrls(data.jobs);
            })
            .catch(err => {
                setError('Error fetching data');
            });
            
    }, [urls]);

    useEffect(() => {
        fetch('/server/job/getalljobnames')
       
            .then(response => response.json())
            .then(data => {
                setJobs(data.jobs);
                console.log("fetching jobs");
            })
            .catch(err => {
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
            .catch(err => {
                setError('Error deleting job');               
            });
    };

 
    return (

        <div>
            <h1>Delete Job Page</h1>
            <h2>URLs:</h2>
            <ul>
                {urls.map((url: any) => (
                    <li key={url._id}>
                        <a href={url.facebookPostUrl} target="_blank" rel="noopener noreferrer">
                                    {url.facebookPostUrl}
                                </a>
                                </li>
                ))}
            </ul>
            <h2>Jobs:</h2>
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