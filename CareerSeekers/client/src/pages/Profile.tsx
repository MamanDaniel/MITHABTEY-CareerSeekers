import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice'; import { useDispatch } from 'react-redux';



export default function Profile() {
  const { currentUser, loading, error } = useSelector((state: any) => state.user)
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      // send a request to the server to update the user
      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // check if the response is successful
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      // update the user in the redux store
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/server/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto my-16'>
      <h1 className='text-3xl font-semibold text-center my-7'>פרופיל משתמש</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover self-center mt-2' />
        <input type="text" placeholder='username' defaultValue={currentUser.username} id='username' onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="email" placeholder='email' defaultValue={currentUser.email} id='email' onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className='border p-3 rounded-lg' />
        <button disabled ={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <Link to='/RamakQuestionnaire' className='text-blue-700 hover:underline cursor-pointer'>Update traits in questionnaire</Link>
        <span onClick={handleSignOut} className='text-red-700 hover:underline cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User updated successfully' : ''}</p>
    </div>
    
  )
}