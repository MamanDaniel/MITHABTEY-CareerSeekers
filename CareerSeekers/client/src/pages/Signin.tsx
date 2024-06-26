import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { RootState } from '../redux/store';

export default function Signin() {
    const [formData, setFormData] = useState({});
    const {loading, error} = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        // prevent the form from refreshing the page when submitted
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/server/auth/signin',
                {
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
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id='email'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    id='password'
                    onChange={handleChange}
                />

                <button
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
        </div>

    )
}
