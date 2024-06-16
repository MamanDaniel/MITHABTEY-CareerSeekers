import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

// if user is logged in, render the Outlet component, otherwise redirect to the Signin page
export  function PrivateRouteNotLoggedIn() {
  console.log('PrivateRouteNotLoggedIn')
  const { currentUser } = useSelector((state: any) => state.user)
  console.log(currentUser)
  return currentUser ? <Outlet /> : <Navigate to='/signin' />; 
}

// if user is logged in, render the Outlet component, otherwise redirect to the Home page
export function PrivateRouteLoggedIn() {
  console.log('PrivateRouteLoggedIn ---')
  const { currentUser } = useSelector((state: any) => state.user)
  console.log(currentUser)
  return currentUser ?  <Navigate to='/home' />: <Outlet /> ; 
}

export function ValidateAdmin() {
  console.log('ValidateAdmin')
  const { currentUser } = useSelector((state: any) => state.user)
  console.log(currentUser)
  return currentUser && currentUser.role === 'Admin' ? <Outlet /> : <Navigate to='/home' />;
}