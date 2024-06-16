import { useNavigate } from 'react-router-dom';

export default function AdminPanel () {
    const navigate = useNavigate();

    const handleAddJob = () => {
        navigate('/adminpanel/addjob');
    };

    const handleUpdateJob = () => {
        navigate('/adminpanel/updatejob');
    };

    const handleDeleteJob = () => {
        navigate('/adminpanel/deletejob');
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <button onClick={handleAddJob} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Add Job</button>
            </div>
            <div>
                <button onClick={handleUpdateJob} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update Job</button>
            </div>
            <div>
                <button onClick={handleDeleteJob} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Delete Job</button>
            </div>
            {/* components and content here */}
        </div>
    );
};


