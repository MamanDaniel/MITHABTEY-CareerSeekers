import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import menuImage from '../assets/menu.png';
import homeImage from '../assets/home.png';
import MithabteyUmage from '../assets/mithabteyLogo.png';

export default function Header() {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

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
      <div className='flex justify-between items-center max-w-8xl mx-auto p-3'>

          <Link to='home' className='flex items-center'>
            <img className='h-8 w-8 object-cover' src={MithabteyUmage} style={{ marginRight: '10px' }} />
            <h1 className='font-bold text-sm:text-xl flex flex-wrap'>
              <span className='text-slate-500 text-right'>מקצוע</span>
              <span className='text-slate-700 text-right'>מתחבטי</span>

            </h1>
          </Link>
          
        {/*Dropbox and homepage*/}
        <div className='flex items-center'>

          <Link to='home'>
            <div className="w-7 h-7 bg-cover bg-center" style={{ marginRight: '19px', backgroundImage: `url(${homeImage})` }}></div>
          </Link>

          <Menu as="div" className="relative inline-block text-right" >
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <div className="w-7 h-7 bg-cover bg-center" style={{ backgroundImage: `url(${menuImage})` }}></div>
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1" >
                {currentUser && (
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to='/profile'
                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        פרופיל אישי
                      </Link>
                    )}
                  </MenuItem>
                )}
                {currentUser && currentUser.role === 'Admin' && (
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to='/adminpanel'
                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        פאנל מנהל
                      </Link>
                    )}
                  </MenuItem>
                )}
                {currentUser && (
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to='/geneticAlgorithm'
                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        המקצועות שלי
                      </Link>
                    )}
                  </MenuItem>
                )}
                {currentUser && (
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`block w-full text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        התנתקות
                      </button>
                    )}
                  </MenuItem>
                )}
                {!currentUser && (
                  <>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to='signin'
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          התחברות
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to='signup'
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          הרשמה
                        </Link>
                      )}
                    </MenuItem>

                  </>
                )}

              </div>
            </MenuItems>
          </Menu>

          {/*Profile Image*/}
          <Link to='/profile'>
            {currentUser && (
              <img
                className='rounded-full h-9 w-9 object-cover'
                style={{ marginLeft: '10px' }}
                src={currentUser.avatar}
                alt='profile'
              />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
