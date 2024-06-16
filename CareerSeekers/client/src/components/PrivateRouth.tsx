import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

// if user is logged in, render the Outlet component, otherwise redirect to the Signin page
export  function PrivateRouth() {
  const { currentUser } = useSelector((state: any) => state.user)
    return currentUser ? <Outlet /> : <Navigate to='/signin' />; 
}

// if user is logged in, render the Outlet component, otherwise redirect to the Home page
export function PrivateRouteLogdIn() {
  const { currentUser } = useSelector((state: any) => state.user)
  return currentUser ?  <Navigate to='/home' />: <Outlet /> ; 
}
