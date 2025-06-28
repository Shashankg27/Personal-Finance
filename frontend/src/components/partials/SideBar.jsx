import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = ( {focus} ) => {
  return (
    <div className='flex flex-col bg-[#1f2937] gap-3 h-full min-h-screen p-4 border !border-gray-700'>
      <div className='flex items-center gap-2 mb-6'>
        <i className="fas fa-wallet text-2xl text-blue-500"></i>
        <p className='font-bold text-2xl text-white leading-none m-0 hidden md:block'>Finance Buddy</p>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-chart-pie" style={{ color: '#ffffff' }} />
        <Link to='/home' className='text-white !no-underline hidden md:block'>Dashboard</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-arrow-right-arrow-left" style={{ color: '#ffffff' }} />
        <Link to='/transactions' className='text-white !no-underline hidden md:block'>Transactions</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-piggy-bank" style={{ color: '#ffffff' }} />
        <Link to='/incomeBudget' className='text-white !no-underline hidden md:block'>Income/Budget</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-chart-line" style={{ color: '#ffffff' }} />
        <Link to='/investments' className='text-white !no-underline hidden md:block'>Investments</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#ffffff' }} />
        <Link to='/loans' className='text-white !no-underline hidden md:block'>Loans</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-bullseye" style={{ color: '#ffffff' }} />
        <Link to='/goals' className='text-white !no-underline hidden md:block'>Goals</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-tags" style={{ color: '#ffffff' }} />
        <Link to='/categories' className='text-white !no-underline hidden md:block'>Categories</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-file-export" style={{ color: '#ffffff' }} />
        <Link to='/reports' className='text-white !no-underline hidden md:block'>Reports</Link>
      </div>
      <div className='flex items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-gear" style={{ color: '#ffffff' }} />
        <Link to='/settings' className='text-white !no-underline hidden md:block'>Settings</Link>
      </div>
    </div>
  )
}

export default SideBar
