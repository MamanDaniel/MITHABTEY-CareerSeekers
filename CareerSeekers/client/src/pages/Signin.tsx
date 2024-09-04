import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure, clearError } from '../redux/user/userSlice';
import { RootState } from '../redux/store';
import logoImage from '../assets/mithabteyLogo.png';
import OAuth from "../components/OAuth";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Signin() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError());  // Clear the error when the component mounts

        return () => {
            dispatch(clearError());  // Clear the error when the component unmounts
        };
    }, [dispatch]);

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
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-3 my-16" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
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
                        <FaEnvelope className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="password"
                            onChange={handleChange}
                        />
                        <FaLock className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember Me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                    
                    {/* Sign In with Google */}
                    <OAuth />
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Don't have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}
