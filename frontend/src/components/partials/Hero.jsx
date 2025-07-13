import React from 'react';
import PopUp from './PopUp';

const Hero = ( {popUp, setPopUp} ) => {
    return (
        <div className='h-screen py-50 flex flex-col gap-2 justify-center items-center bg-[linear-gradient(100deg,#5b68e3,#7449d4)] text-white text-center'>
            {popUp && <PopUp  popUp={popUp} setPopUp={setPopUp} />}
            <p className='text-5xl font-bold'>Take Control of Your Finances</p>
            <p className='w-[45%] text-xl font-semibold'>Track expenses, manage budgets, monitor investments, and achieve your financial goals with our comprehensive finance management platform.</p>
            <button className='rounded bg-white text-black !text-lg px-5 py-3 font-semibold' onClick={() => setPopUp(true)}>Start Free Trial</button>
        </div>
    );
};

export default Hero;