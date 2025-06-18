import React from 'react';
import { Link } from "react-router-dom";

const LandingNav = () => {
    return (
        <div>
            {/* <a href="#" className="textdecoration-none text-gray-300">Link</a> */}

            <div className="px-0 md:px-4 py-3 bg-[#1f2937]">
                <div className='flex justify-between items-center mx-5'>
                    <div className='flex items-center gap-2'>
                        {/* Logo */}
                        {/* <FontAwesomeIcon icon="fa-solid fa-coins" /> */}
                        <i className="fa-solid fa-coins" style={{ color: "#ffffff" }} />
                        <p className="text-white text-2xl font-bold m-0">FinanceBuddy</p>
                    </div>
                    <div className='gap-4 hidden md:flex'>
                        <a href="#features" className="!no-underline !text-[#d1d5db]">Features</a>
                        <a href="#pricing" className="!no-underline !text-[#d1d5db]">Pricing</a>
                        <a href="#about" className="!no-underline !text-[#d1d5db]">About</a>
                        <a href="#contact" className="!no-underline !text-[#d1d5db]">Contact</a>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <Link className='!text-[#d1d5db] !no-underline' to='/signin'>Sign In</Link>
                        <Link className='text-white py-1 px-3 rounded bg-[#2563eb] !no-underline' to='signup'>Get Started</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingNav;