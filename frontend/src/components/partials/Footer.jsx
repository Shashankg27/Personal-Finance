import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#1f2937] text-white px-6 py-10">
        <div className="flex justify-evenly">
        <div>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-coins fa-xl" style={{ color: "#ffffff" }} />
            <h2 className="text-xl font-semibold mb-2">FinanceBuddy</h2>

          </div>
          
          <p className="text-gray-400 text-sm">Your complete financial management solution.</p>
        </div>
        <div className='flex flex-col'>
          <h3 className="text-lg font-medium mb-2">Product</h3>
          <ul className="!pl-[1px] space-y-1 text-sm text-gray-300">
            <li><a href="#" className='!no-underline !text-[#9ca3af] font-semibold'>Features</a></li>
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Pricing</a></li>
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Security</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Company</h3>
          <ul className="!pl-[1px] space-y-1 text-sm text-gray-300">
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>About</a></li>
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Blog</a></li>
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Support</h3>
          <ul className="!pl-[1px] space-y-1 text-sm text-gray-300">
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Help Center</a></li>
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Contact</a></li>
            <li><a href="#"className='!no-underline !text-[#9ca3af] font-semibold'>Privacy</a></li>
          </ul>
        </div>
      </div>
        
        
      <hr/>

      <div className="mt-10 flex flex-col items-center space-y-4">
        <p className="text-xs text-gray-500">© 2024 FinanceTracker. All rights reserved.</p>
        
      </div>
      
      </footer>

    </div>
    
  )
}

export default Footer
