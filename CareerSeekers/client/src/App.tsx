import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Header from './components/Header'
import Signin from './pages/Signin'
import PrivateRouth from './components/PrivateRouth'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRouth />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>

    </BrowserRouter >
  )
}

export default App
