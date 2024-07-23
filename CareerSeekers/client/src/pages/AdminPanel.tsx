// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux'

export default function AdminPanel() {
    const { currentUser, loading, error } = useSelector((state: any) => state.user)
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">{currentUser.username}  ,שלום</h1>
                <h3 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600 text-center'>זהו דף הנחיתה של מנהלת האתר</h3>
                <h3 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600 text-center mb-10'>כאן ניתן לנהל את המידע אודות המשתמשים והמקצועות שבאתר</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <AdminCard 
                        title="Add new job to the database"
                        icon={<FaPlus className="text-green-500" />}
                        onClick={() => handleNavigation('/adminpanel/addjob')}
                    />
                    <AdminCard 
                        title="Delete any job that exists"
                        icon={<FaTrash className="text-red-500" />}
                        onClick={() => handleNavigation('/adminpanel/deletejob')}
                    />
                </div>
            </div>
        </div>
    );
}

function AdminCard({ title, icon, onClick }: { title: string, icon: JSX.Element, onClick: () => void }) {
    return (
        <div 
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={onClick}
        >
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {title}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                {title === "Add new job to the database" ? "Add job" : "Delete job"}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}