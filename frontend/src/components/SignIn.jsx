import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='h-screen bg-[#111827] flex justify-center items-center'>
      <div className='bg-[#1f2937] text-white flex flex-col items-center justify-center gap-2 h-min p-8 rounded-xl w-full max-w-md'>
        <div className='flex gap-2 items-center justify-center'>
          <i className="fas fa-wallet fa-2xl text-blue-500"></i>
          <p className='text-2xl font-bold m-0'>FinanceBuddy</p>
        </div>
        <p className='font-bold text-xl m-0'>Welcome Back</p>
        <p className='text-md text-gray-400 text-semibold'>SignIn to your account</p>
        <form action="" className='flex flex-col gap-3 w-full'>
          <div>
            <label className='text-sm text-gray-100' htmlFor="username">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-at"></i>
              </span>
              <input
                className='bg-[#374151] pl-10 pr-3 py-1.5 rounded text-md w-full text-white'
                type="text"
                name="username"
                id="username"
                placeholder='Enter your username'
              />
            </div>
          </div>

          <div>
            <label className='text-sm text-gray-100' htmlFor="password">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                className='bg-[#374151] pl-10 pr-3 py-1.5 rounded text-md w-full text-white'
                type="password" name="password" id="password" placeholder='Enter your password'
              />
            </div>
          </div>
          <div className='flex gap-1'>
            <input type="checkbox" name="rememberme" id="rememberme"/>
            <label className='text-md text-gray-400' htmlFor="rememberme">Remember Me</label>
          </div>
          <input className='bg-[#2563eb] py-1.5 rounded !text-sm font-semibold' type="submit" name="signin" id="signin" value='Sign In'/>
        </form>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <div className='w-full text-center'>
          <p className='text-sm text-gray-400 inline'>Don't have an account? 
            <Link to='/signup' className='!no-underline text-[#2563eb] text-sm ml-1'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
