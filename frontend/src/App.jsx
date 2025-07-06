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
import Transactions from './components/Transactions'
import Income from './components/Income'
import Loan from './components/Loan'
import Goals from './components/Goals'
import Reports from './components/Reports'
import AddInvestment from './components/partials/AddInvestment'
import AddIncome from './components/partials/AddIncome'
import SetBudget from './components/partials/SetBudget'
import AddTransaction from './components/partials/AddTransaction'

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
      <Route path="/loans" element={<Loan />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/categories/addCategory" element={<AddCategory />} />
      <Route path="/investments/addInvestments" element={<AddInvestment />} />
      <Route path="/incomeBudget/addIncome" element={<AddIncome />} />
      <Route path="/transactions/addTransaction" element={<AddTransaction />} />
      <Route path="/incomeBudget/setBudget" element={<SetBudget />} />
    </Routes>
  )
}

export default App
