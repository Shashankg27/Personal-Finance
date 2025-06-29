import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//   const [user, setUser] = useState(null);
let user = null;

//   useEffect(() => {
const token = getCookie("token");
console.log(token);
if (token) {
  const userData = jwtDecode(token);
  // setUser(userData);
  console.log(userData);
  user = userData;
}
console.log(user);
//   }, []);

const Transactions = () => {
  return (
    <div className="flex">
      <div>
        <SideBar focus="Transactions" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Transactions</h3>
            <div className="flex items-center gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fa-solid fa-plus p-1" />
                Add Transaction
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="bg-[#1e293b] p-4 rounded-xl">
              {/* Search */}
              <div className="flex gap-4">
                <div>
                  <label className="block text-white mb-1">Search</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search transactions"
                      className=" pl-10 pr-3 py-2 rounded-md bg-[#334155] text-white placeholder-gray-400 outline-none"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    Showing 24 transactions
                  </p>
                </div>

                <div className="flex flex-col w-[25%]">
                  {/* Category */}
                  <label className="block text-white mb-1">Category</label>
                  <select className="bg-[#334155] text-white px-3 py-2 rounded-md w-full">
                    <option>All Categories</option>
                  </select>
                </div>

                <div className="flex flex-col w-[25%]">
                  {/* Type */}
                  <label className="block text-white mb-1">Type</label>
                  <select className="bg-[#334155] text-white px-3 py-2 rounded-md w-full">
                    <option>All Types</option>
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </div>

                <div className="flex flex-col w-[25%]">
                  {/*Date range */}
                  <label className="block text-white mb-1">Date Range</label>
                  <select className="bg-[#334155] text-white px-3 py-2 rounded-md w-full">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 months</option>
                    <option>This Year</option>
                    <option>Custom range</option>
                  </select>

                  {/* Clear Filters */}
                  <div className="ml-auto">
                    <button className="text-blue-400 hover:underline text-sm mt-3">
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
