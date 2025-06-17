import React from 'react'
import PopUp from './PopUp'

const Promotion = ( {popUp, setPopUp} ) => {
  return (
    <div className='bg-[#111827] text-white py-20 text-center'>
        {popUp && <PopUp  popUp={popUp} setPopUp={setPopUp} />}
        <p className='font-bold text-4xl'>Ready to Transform Your Finances?</p>
        <p className='font-semibold text-[#d1d5db] text-xl'>Join thousands of users who have taken control of their financial future.</p>
        <button className='bg-[#2563eb] !text-lg rounded px-5 py-2.5 font-semibold mt-3'
        onClick={() => setPopUp(true)}>Start Your Free Trial Today</button>
    </div>
  )
}

export default Promotion
