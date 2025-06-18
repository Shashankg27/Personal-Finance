import React from 'react'

const SignUp = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#111827] text-white p-4">
        <div className="bg-[#1f2937] p-8 rounded-2xl shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex gap-2 items-center justify-center">
              <i className="fas fa-wallet text-4xl text-blue-500"></i>
              <h2 className="text-2xl font-bold mt-2">FinanceBuddy</h2>
            </div>
            <p className="text-lg font-semibold mt-1">Create Account</p>
            <p className="text-sm text-gray-400">Start your financial journey</p>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-[#1f2937] flex items-center px-3 rounded-md outline">
              <i className="fas fa-user text-gray-400 mr-2"></i>
              <form action="" className="action">
                <input type="text" placeholder="First name" className='bg-transparent outline-none py-2 w-full text-sm' />
              </form>
            </div>
            <div className='flex-1 bg-[#1f2937] flex items-center px-3 rounded-md outline'>
              <i className="fas fa-user text-gray-400 mr-2"></i>
              <form action="" className="action">
                <input type="text" placeholder="Last name" className='bg-transparent outline-none py-2 w-full text-sm' />
              </form>
            </div>
          </div>

          <div className="mb-4 bg-[#1f2937] flex items-center px-3 rounded-md outline">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <form action="" className="action">
                <input type="email" placeholder="Enter your email" className='bg-transparent outline-none py-2 w-full text-sm' />
            </form>
          </div>

          <div className="mb-4 bg-[#1f2937] flex items-center px-3 rounded-md outline">
            <i className="fas fa-at text-gray-400 mr-2 items-center"></i>
            <form action="" className="action">
                <input type="text" placeholder="Choose a username" className='bg-transparent outline-none py-2 w-full text-sm' />
            </form>
          </div>
          <div className="mb-4 bg-[#1f2937] flex items-center px-3 rounded-md outline">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <form action="" className="action">
              <div className="flex gap-30 items-center">
                <input type="password" placeholder="Create a password" className='bg-transparent outline-none py-2 w-full text-sm' />
                <i className="fas fa-eye text-gray-400 cursor-pointer"></i>
              </div>
            </form>
          </div>

          <div className="mb-4 bg-[#1f2937] flex items-center px-3 rounded-md outline">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <form action="" className="action">
              <div className="flex gap-30 items-center">
                <input type="password" placeholder="Confirm your password" className='bg-transparent outline-none py-2 w-full text-sm' />
                <i className="fas fa-eye text-gray-400 cursor-pointer"></i>
              </div>
            </form>
          </div>

          <div className="bg-[#1f2937] text-sm text-gray-400 p-3 rounded-md mb-4 outline">
            <p className="mb-1">Password requirements:</p>
            <ul className="grid grid-cols-2 gap-x-4 list-disc list-inside text-xs">
              <li>8+ characters</li>
              <li>1 uppercase</li>
              <li>1 lowercase</li>
              <li>1 number</li>
            </ul>
          </div>

          <div className="mb-6 text-sm">
            <div className="flex items-center justify-center">
              <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span className=''>
                I agree to the <a href="#" className="text-blue-400 underline">Terms of Service</a> and <a href="#" className="text-blue-400 underline">Privacy Policy</a>
              </span>
            </label>
            </div>
            
          </div>

          <input className='bg-[#2563eb] py-1.5 rounded !text-sm font-semibold w-full' type="submit" name="Create Account" id="Create Account" value='Create Account'/>


        </div>
      </div>
    </div>
  )
}

export default SignUp
