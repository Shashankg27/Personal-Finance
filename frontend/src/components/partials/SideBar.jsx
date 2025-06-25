import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = ( {focus} ) => {
  return (
    <div className='bg-[#1f2937] h-screen !text-white'>
      <div>
        <i className="fas fa-wallet fa-2xl text-blue-500"></i>
        <p>Finance Buddy</p>
      </div>
      <div>
        <Link>Dashboard</Link>
        <Link>Transactions</Link>
        <Link>Income/Budget</Link>
        <Link>Investments</Link>
        <Link>Loans</Link>
        <Link>Goals</Link>
        <Link>Categories</Link>
        <Link>Reports</Link>
        <Link>Settings</Link>
      </div>
    </div>
  )
}

export default SideBar
