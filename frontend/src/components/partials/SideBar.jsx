import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = ( {focus} ) => {
  return (
    <div className='flex flex-col bg-[#1f2937] gap-3 !h-full min-h-screen p-4 border !border-gray-700'>
      <div className='flex items-center gap-2 mb-6'>
        <i className="fas fa-wallet text-2xl text-blue-500"></i>
        <p className='font-bold text-2xl text-white leading-none m-0 hidden md:block'>Finance Buddy</p>
      </div>
      <Link to='/home' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-chart-pie m-0" style={{ color: '#ffffff' }} />
        <p className='text-white hidden md:block m-0'>Dashboard</p>
      </Link>
      <Link  to='/transactions' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-arrow-right-arrow-left m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Transactions</p>
      </Link>
      <Link to='/incomeBudget' className='flex items-center !no-underline gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-piggy-bank m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Income/Budget</p>
      </Link>
      <Link to='/investments' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-chart-line m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Investments</p>
      </Link>
      <Link to='/loans' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-hand-holding-dollar m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Loans</p>
      </Link>
      <Link to='/goals' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-bullseye m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Goals</p>
      </Link>
      <Link to='/categories' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-tags m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Categories</p>
      </Link>
      <Link to='/reports' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-file-export m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Reports</p>
      </Link>
      <Link to='/settings' className='flex !no-underline items-center gap-2 opacity-80 hover:opacity-100'>
        <i className="fa-solid fa-gear m-0" style={{ color: '#ffffff' }} />
        <p className='text-white m-0 hidden md:block'>Settings</p>
      </Link>
    </div>
  )
}

export default SideBar
