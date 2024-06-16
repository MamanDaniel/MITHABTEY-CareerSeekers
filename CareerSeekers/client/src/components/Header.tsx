import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  // sign out the user 
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

    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-8xl mx auto p-3'>
        <Link to='home'>
          <h1 className='font-bold text-sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Career</span>
            <span className='text-slate-700'>Seekers</span>
          </h1>
        </Link>
      
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className=' flex gap-4'>
          <Link to='home'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>

          {/* Show the Admin Panel link if the user is an admin */}
          {currentUser && currentUser.role === 'Admin' && (
            <Link to='/adminpanel'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>Admin Panel</li>
            </Link>
          )}
          
          {/*if the user is logged in, show signout link. on click - sign out*/}
          {currentUser && (
            <li onClick={handleSignOut} className='hidden sm:inline text-slate-700 hover:underline'>Sign out</li>
          )}
         
          {/*if the user is not logged in, show the sign up link*/}
          {!currentUser && (
            <Link to='signup'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>Sign up</li>
            </Link>
          )}
          
          <Link to='/profile'>
            {currentUser ? (
              // print the user avatar in console
              <img
                className='rounded-full h-7 w-7 object-cover'
                src= {currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}
