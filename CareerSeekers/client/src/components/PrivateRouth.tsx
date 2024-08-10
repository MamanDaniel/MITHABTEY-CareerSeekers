import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

// if user is not logged in, render the Outlet component, otherwise redirect to the Sign In page
export function PrivateRouteNotLoggedIn() {
  const { currentUser } = useSelector((state: any) => state.user)
  return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}

// if user is logged in, render the Outlet component, otherwise redirect to the Home page
export function PrivateRouteLoggedIn() {
  const { currentUser } = useSelector((state: any) => state.user)
  return currentUser ? <Navigate to='/home' /> : <Outlet />;
}
// if user is logged in and is an admin, render the Outlet component to allow access to admin-only pages, otherwise redirect to the Home page 
export function ValidateAdmin() {
  const { currentUser } = useSelector((state: any) => state.user)
  return currentUser && currentUser.role === 'Admin' ? <Outlet /> : <Navigate to='/home' />;
}