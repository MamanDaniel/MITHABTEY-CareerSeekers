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
            console.log(data);
            if (!data.success) {
                setError(data.message);
                setLoading(false);
                return;
            }
            try {
                setTimeout(() => {
                    setLoading(false);
                    toast.success('Job added successfully!', {
                        position: 'top-center',
                        autoClose: 2000,
                        onClose: () => navigate('/adminpanel') // Navigate after toast is closed
                    });
                }, 1000); // Simulated delay
            } catch (err) {
                setError('Failed to add job. Please try again.');
                setLoading(false);
            }
        } catch (err) {
            setError('Failed to add job. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
             <ToastContainer />
            <h1 className="text-3xl text-center font-semibold my-7">Add Job</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Job Name"
                    name="jobName"
                    value={formData.jobName}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    required
                />
                <textarea
                    placeholder="Description"
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    required
                />
                <input
                    type="number"
                    placeholder="Average Salary"
                    name="AverageSalary"
                    value={formData.AverageSalary}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    required
                />
                <input
                    type="text"
                    placeholder="Professional Field"
                    name="joblField"
                    value={formData.joblField}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(formData.Prerequisites).map((key) => (
                        <div key={key} className="flex flex-col">
                            <label htmlFor={key}>{key}</label>
                            <input
                                type="number"
                                name={key}
                                value={(formData.Prerequisites as any)[key]}
                                onChange={handleChange}
                                className="border p-3 rounded-lg"
                                required
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Add Job'}
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};


