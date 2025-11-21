import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import SideBar from './partials/SideBar';
import { Link } from 'react-router-dom';
import CategoryCard from './partials/CategoryCard';
import Logout from './partials/Logout';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Categories = () => {
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
        <SideBar focus='categories'/>
      </div>
      <div className='flex-1'>
        <div className="bg-[#0f172a] min-h-screen text-white">
            {/* Header */}
            <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h1 className="text-2xl font-semibold">Categories</h1>
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
                    <Logout />
                    </div>
                </div>
            </div>

            {/* Cards Section*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
                <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-xl text-white font-semibold flex items-center gap-8">
                    Total Categories <i className="fas fa-tags" />
                    </p>
                    <p className="text-2xl text-blue-400 font-bold mt-1">{user.incomeCategories.length + user.expenseCategories.length + user.investmentCategories.length}</p>
                    <p className="text-sm text-gray-400">Active categories</p>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-xl text-white font-semibold flex items-center gap-8">
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
                    <p className="text-xl text-white font-semibold flex items-center gap-8">
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
                    <p className="text-xl text-white font-semibold flex items-center gap-8">
                    Investment Types
                    <i className="fas fa-chart-line text-purple-400" />
                    </p>
                    <p className="text-2xl font-bold text-purple-400 mt-1">{user.investmentCategories.length}</p>
                    <p className="text-sm text-gray-400">Investment categories</p>
                </div>
            </div>
            <div className='p-3 flex gap-4 w-full'>
                <div className='flex flex-col gap-4 w-[75%]'>
                    <div className='bg-[#1e293b] p-4 rounded-lg'>
                        <p className='text-xl font-bold'>Income Categories</p>
                        <div className='border !border-gray-700 mb-4'></div>
                        <div className='flex gap-3 flex-col'>
                            {user.incomeCategories.map((category, index) => (
                                <CategoryCard category={category} />
                            ))}
                        </div>
                    </div>
                    <div className='bg-[#1e293b] p-4 rounded-lg'>
                        <p className='text-xl font-bold'>Expense Categories</p>
                        <div className='border !border-gray-700 mb-4'></div>
                        <div className='flex flex-col gap-3'>
                            {user.expenseCategories.map((category, index) => (
                                <CategoryCard category={category} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 bg-[#1e293b] p-4 rounded-lg w-[25%] h-min'>
                    <p className='m-0 font-bold'>Quick Actions</p>
                    <Link to='addCategory' state={{ value: "incomeCategories" }} className='text-white !no-underline bg-green-600 py-1 px-5 text-sm rounded-lg'>+ Add Income Category</Link>
                    <Link to='addCategory' state={{ value: "expenseCategories" }} className='text-white !no-underline bg-red-600 py-1 px-5 text-sm rounded-lg'>+ Add Expense Category</Link>
                </div>
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default Categories;
