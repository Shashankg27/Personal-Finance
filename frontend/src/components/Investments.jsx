import React, { useEffect, useState } from 'react';
import SideBar from './partials/SideBar';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Investments = () => {
    //   const [user, setUser] = useState(null);
      let user = null;
      
    //   useEffect(() => {
            const token = getCookie('token');
            console.log(token);
            if(token){
            const userData = jwtDecode(token);
            // setUser(userData);
            console.log(userData);
            user = userData;
            }
            console.log(user);
    //   }, []);
  return (
    <div className='flex'>
        <div>
            <SideBar />
        </div>
        <div className='flex-1 bg-[#111827]'>
            <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700 text-white">
                <h3 className="text-2xl font-semibold">Investments & Savings</h3>
                <div className="flex items-center gap-4">
                    <Link to='/categories/addCategory' className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline">
                    + Add Category
                    </Link>
                    <div className="flex items-center gap-2">
                    {/* <img
                        src="https://randomuser.me/api/portraits/women/45.jpg"
                        alt="John Doe"
                        className="w-8 h-8 rounded-full"
                    /> */}
                    <span className="text-sm">{user.name}</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
                <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                    Total Invested <i className="fas fa-chart-line text-blue-400"/>
                    </p>
                    <p className="text-2xl text-blue-400 font-bold mt-1">{user.incomeCategories.length + user.expenseCategories.length + user.investmentCategories.length}</p>
                    <p className="text-sm text-gray-400">Active categories</p>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                    Income Categories
                    <i
                        className="fa-solid fa-arrow-up"
                        style={{ color: "#4ade80" }}
                    />
                    </p>
                    <p className="text-2xl font-bold text-green-400 mt-1">{user.incomeCategories.length}</p>
                    <p className="text-sm text-gray-400">Income sources</p>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                    Expense Categories
                    <i
                        className="fa-solid fa-arrow-down"
                        style={{ color: "#f87171" }}
                    />
                    </p>
                    <p className="text-2xl font-bold text-red-400 mt-1">{user.expenseCategories.length}</p>
                    <p className="text-sm text-gray-400">Expense types</p>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                    Investment Types
                    <i className="fas fa-chart-line text-purple-400" />
                    </p>
                    <p className="text-2xl font-bold text-purple-400 mt-1">{user.investmentCategories.length}</p>
                    <p className="text-sm text-gray-400">Investment categories</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Investments
