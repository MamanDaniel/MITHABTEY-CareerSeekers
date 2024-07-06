import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Header from './components/Header'
import Signin from './pages/Signin'
import { PrivateRouteLoggedIn, PrivateRouteNotLoggedIn, ValidateAdmin } from './components/PrivateRouth'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import RamakQuestionnaire from './pages/RamakQuestionnaire'
import AdminPanel from './pages/AdminPanel'
import AddJob from './pages/AddJob'
import Jobs from './pages/Jobs'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route element={<PrivateRouteLoggedIn />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
        {/* Private route - all the rout inside this section require log in */}
        <Route element={<PrivateRouteNotLoggedIn />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/RamakQuestionnaire' element={<RamakQuestionnaire />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route element={<ValidateAdmin />}>
            <Route path='/adminpanel' element={<AdminPanel />} />
            <Route path='/adminpanel/addjob' element={<AddJob />} />
          </Route>
        </Route>
      </Routes>
      <Footer />

    </BrowserRouter >
  )
}

export default App
