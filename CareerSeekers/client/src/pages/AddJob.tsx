import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddJob () {
    const [formData, setFormData] = useState({
        jobName: '',
        Description: '',
        AverageSalary: '',
        joblField: '',
        facebookPostUrl: '',
        Prerequisites: {
            Business: 0,
            GeneralCulture: 0,
            ArtsAndEntertainment: 0,
            Science: 0,
            Organization: 0,
            Service: 0,
            Outdoor: 0,
            Technology: 0,
        }
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in formData.Prerequisites) {
            setFormData({
                ...formData,
                Prerequisites: {
                    ...formData.Prerequisites,
                    [name]: Number(value)
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/server/job/addjob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!data.success) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setTimeout(() => {
                setLoading(false);
                toast.success('Job added successfully!', {
                    position: 'top-center',
                    autoClose: 2000,
                    onClose: () => navigate('/adminpanel')
                });
            }, 1000);
        } catch (err) {
            setError('Failed to add job. Please try again.');
            setLoading(false);
        }
    };



    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <ToastContainer />
            <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <h1 className="text-3xl font-bold text-center py-6 bg-slate-700 text-white">Add New Job</h1>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Job Details Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-700 border-b pb-2">Job Details</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Job Name"
                                name="jobName"
                                value={formData.jobName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                name="Description"
                                value={formData.Description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent h-32"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Average Salary"
                                    name="AverageSalary"
                                    value={formData.AverageSalary}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Professional Field"
                                    name="joblField"
                                    value={formData.joblField}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter URL of Facebook Post"
                                name="facebookPostUrl"
                                value={formData.facebookPostUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* RAMAK Questionnaire Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 text-slate-700 border-b pb-2">RAMAK Questionnaire</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.keys(formData.Prerequisites).map((key) => (
                                <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
                                    <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-700">
                                        {key}
                                    </label>
                                    <input
                                        type="number"
                                        id={key}
                                        name={key}
                                        value={(formData.Prerequisites as any)[key]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-700 text-white py-3 rounded-lg uppercase font-semibold hover:bg-slate-600 transition duration-300 ease-in-out disabled:opacity-50"
                    >
                        {loading ? 'Adding Job...' : 'Add Job'}
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-4 pb-6">{error}</p>}
            </div>
        </div>
    );
};


