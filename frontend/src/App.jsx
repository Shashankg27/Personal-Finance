import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import Categories from './components/Categories'
import AddCategory from './components/partials/AddCategory'
import Settings from './components/Settings'
import Investments from './components/Investments'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/incomeBudget" element={<Income />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/categories/addCategory" element={<AddCategory />} />
    </Routes>
  )
}

export default App
