import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import logoImage from "../assets/mithabteyLogo.png";


export default function ForgotPassword() {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/server/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.success) {
                setMessage('An email has been sent with password reset instructions.');
            } else {
                setMessage('Failed to send email. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-3" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img src={logoImage} alt="Company Logo" className="h-16 w-16" />
                </div>
                <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">Forgot Password</h1>
                <p className="text-center text-gray-600 mb-4">Enter your email address to recover your password.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg uppercase font-semibold hover:bg-indigo-500 disabled:bg-indigo-300 transition duration-300"
                    >
                        {loading ? 'Sending...' : 'Send Recovery Email'}
                    </button>
                </form>
                {message && <p className="text-center mt-4 text-indigo-600">{message}</p>}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Remembered your password?{' '}
                        <a href="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
