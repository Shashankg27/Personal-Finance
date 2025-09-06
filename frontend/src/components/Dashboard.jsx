import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie("token");
    // console.log(token);
    if (token) {
      const userData = jwtDecode(token);
      setUser(userData);
      //   console.log(userData);
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div>
        <SideBar focus="Dashboard" />
      </div>
      <div className="flex-1 bg-[#111827]">
        {/* Header */}
        <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700 text-white">
          <h3 className="text-2xl font-semibold">Dashboard</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
          <div className="bg-[#16A34A] rounded-xl p-4 shadow-md">
            <p className="text-base text-white mb-1">This Month's Income</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-white font-bold">$5,240</p>
              <i
                className="fa-solid fa-arrow-up text-3xl"
                style={{ color: "#BBF7D0" }}
              />
            </div>
            <p className="text-sm text-gray-100 mt-1">+12% from last month</p>
          </div>

          <div className="bg-[#EF4444] rounded-xl p-4 shadow-md">
            <p className="text-base text-white mb-1">This Month's Expenses</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-white font-bold">$3,180</p>
              <i
                className="fa-solid fa-arrow-down text-3xl"
                style={{ color: "#FEE2E2" }}
              />
            </div>
            <p className="text-sm text-gray-100 mt-1">+12% from last month</p>
        </div>

        <div className="bg-[#2563EB] rounded-xl p-4 shadow-md">
            <p className="text-base text-white mb-1">Balance Left</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-white font-bold">$3,180</p>
              <i className="fas fa-wallet text-3xl" style={{color: "#ffffff"}}></i>
            </div>
            <p className="text-sm text-gray-100 mt-1">+12% from last month</p>
        </div>

        <div className="bg-[#7E22CE] rounded-xl p-4 shadow-md">
            <p className="text-base text-white mb-1">Total Savings</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-white font-bold">$12,850</p>
              <i
                className="fas fa-piggy-bank text-3xl"
                style={{ color: "#E9D5FF" }}
              />
            </div>
            <p className="text-sm text-gray-100 mt-1">+12% from last month</p>
        </div>

        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
