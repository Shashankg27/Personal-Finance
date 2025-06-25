import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Dashboard />} />
    </Routes>
  )
}

export default App
