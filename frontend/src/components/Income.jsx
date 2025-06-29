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

const Income = () => {
  return (
    <div className="flex">
      <div>
        <SideBar focus="Income" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Income & Budget</h3>
            <div className="flex items-center gap-3">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fa-solid fa-plus p-1" />
                Add Income
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fas fa-chart-bar p-1" />
                Set Budget
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>
          {/* Cards section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Total Budget
                <i
                  className="fa-solid fa-wallet"
                  style={{ color: "#5DA8FF" }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#5ea8ff] mt-3">$4,500</p>
              <p className="text-sm text-gray-400">Monthly Budget limit</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Spent This Month
                <i
                  className="fa-solid fa-credit-card"
                  style={{ color: "#F26C6C" }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#F26C6C] mt-3">$3,200</p>
              <p className="text-sm text-gray-400">71% of budget used</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Remaining Budget
                <i
                  className="fa-solid fa-piggy-bank"
                  style={{ color: "#5BE38D" }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#5BE38D] mt-3">$1,300</p>
              <p className="text-sm text-gray-400">29% remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
