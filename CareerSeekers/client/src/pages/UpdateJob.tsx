import { useState, useEffect } from "react";

export default function UpdateJob() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        jobName: '',
        description: '',
        standardDay: '',
        education: '',
        technicalSkills: '',
        workLifeBalance: '',
        AverageSalary: '',
        jobField: ''
    });
    const [err, setError] = useState('');

    useEffect(() => {
        fetch('/server/job/getalljobnames')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJobs(data.jobs);
            })
            .catch(() => {
                setError('קרתה שגיאה בניסיון הפעולה, התנתק והתחבר מחדש');
            });
    }, []);

    const handleSelectJob = (jobId) => {
        fetch(`/server/job/getjobdetails/${jobId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSelectedJob(data);
                setFormData({
                    jobName: data.jobName || '',
                    description: data.description || '',
                    standardDay: data.standardDay || '',
                    education: data.education || '',
                    technicalSkills: data.technicalSkills || '',
                    workLifeBalance: data.workLifeBalance || '',
                    AverageSalary: data.AverageSalary || '',
                    jobField: data.jobField || ''
                });
            })
            .catch(() => {
                setError('קרתה שגיאה בניסיון הפעולה, התנתק והתחבר מחדש');
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!selectedJob) {
            setError('No job selected');
            return;
        }
        
        fetch(`/server/job/updatejob/${selectedJob._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setError('Job updated successfully');
                } else {
                    setError('Error updating job');
                }
            })
            .catch(() => {
                setError('Error updating job');
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-6 text-center">עדכון מקצוע</h1>
            {err && <p className="text-red-500 text-center mb-4">{err}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                        <span className="text-lg font-semibold">{job.jobName}</span>
                        <button 
                            onClick={() => handleSelectJob(job._id)}
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
            
            {selectedJob && (
                <form onSubmit={handleUpdate}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Job Name"
                            name="jobName"
                            value={formData.jobName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                            required
                        />
                        <textarea
                            placeholder="Standard Day"
                            name="standardDay"
                            value={formData.standardDay}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                            required
                        />
                        <textarea
                            placeholder="Education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                            required
                        />
                        <textarea
                            placeholder="Technical Skills"
                            name="technicalSkills"
                            value={formData.technicalSkills}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                            required
                        />
                        <textarea
                            placeholder="Work Life Balance"
                            name="workLifeBalance"
                            value={formData.workLifeBalance}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Average Salary"
                            name="AverageSalary"
                            value={formData.AverageSalary}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <select
                            name="jobField"
                            value={formData.jobField}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                            required
                        >
                            <option value="" disabled>Select Professional Field</option>
                            <option value="Business">Business</option>
                            <option value="GeneralCulture">General Culture</option>
                            <option value="ArtsAndEntertainment">Arts and Entertainment</option>
                            <option value="Science">Science</option>
                            <option value="Organization">Organization</option>
                            <option value="Service">Service</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Technology">Technology</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        Update Job
                    </button>
                </form>
            )}
        </div>
    );
}
