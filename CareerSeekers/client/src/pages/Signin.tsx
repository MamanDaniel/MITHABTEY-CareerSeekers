import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { RootState } from '../redux/store';
import logoImage from '../assets/mithabteyLogo.png';


export default function Signin() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/server/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/home');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-3">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img src={logoImage} alt="Company Logo" className="h-16 w-16" />
                </div>
                <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            onChange={handleChange}
                        />
                        <svg className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0H6a2 2 0 00-2 2v2a2 2 0 002 2h8a2 2 0 002-2v-2a2 2 0 00-2-2H8zm0 0V6a2 2 0 012-2h4a2 2 0 012 2v6m0 0h4m-6 4v2m0-6v6m0-6v6"></path></svg>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="password"
                            onChange={handleChange}
                        />
                        <svg className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V7a4 4 0 10-8 0v4M8 11v6a4 4 0 108 0v-6m0 0h6a2 2 0 002-2V9a2 2 0 00-2-2h-6a2 2 0 00-2 2v2m0 0h-2"></path></svg>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember Me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg uppercase font-semibold hover:bg-indigo-500 disabled:bg-indigo-300 transition duration-300"
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}
