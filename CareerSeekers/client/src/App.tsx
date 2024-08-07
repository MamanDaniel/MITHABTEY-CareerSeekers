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
import DeleteJob from './pages/DeleteJob'
import Jobs from './pages/Jobs'
import GeneticAlgorithm from './pages/GeneticAlgorithm'
import GeneralProfessions from './pages/GeneralProfessions'

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
          <Route path='/geneticAlgorithm' element={<GeneticAlgorithm />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/ProfessionsInfo' element={<GeneralProfessions />} />
          <Route element={<ValidateAdmin />}>
            <Route path='/adminpanel' element={<AdminPanel />} />
            <Route path='/adminpanel/addjob' element={<AddJob />} />
            <Route path='/adminpanel/deletejob' element={<DeleteJob />} />
          </Route>
        </Route>
      </Routes>
      <Footer />

    </BrowserRouter >
  )
}

export default App
