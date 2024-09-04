import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobForm from '../components/jobs/jobForm';

export default function AddJob() {
    const navigate = useNavigate();

    const handleSubmit = async (formData: any) => {
        try {
            const response = await fetch('/server/job/addjob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('המקצוע התווסף בהצלחה!', {
                    position: 'top-center',
                    autoClose: 2000,
                    onClose: () => navigate('/adminpanel')
                });
            } else {
                throw new Error(data.message || 'Failed to add job. Please try again.');
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 p-4" dir='rtl'>
           <ToastContainer />
            <div className="md:w-2/5 mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden mt-20">
                <h1 className="text-2xl font-bold text-center py-2 bg-slate-700 text-white">Add New Job</h1>
                <JobForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}