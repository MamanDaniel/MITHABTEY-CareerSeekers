import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Header from './components/Header'
import Signin from './pages/Signin'
import { PrivateRouteNotLoggedIn, PrivateRouteLoggedIn } from './components/PrivateRouth'
import Profile from './pages/Profile'
import RamakQuestionnaire from './pages/RamakQuestionnaire'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* Private route - all the route inside this section, the user cant get access while he logedin */}
        <Route element={<PrivateRouteLoggedIn />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
        {/* Private route - all the route inside this section require log in */}
        <Route element={<PrivateRouteNotLoggedIn />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/RamakQuestionnaire' element={<RamakQuestionnaire />} />
        </Route>
      </Routes>

    </BrowserRouter >
  )
}

export default App
