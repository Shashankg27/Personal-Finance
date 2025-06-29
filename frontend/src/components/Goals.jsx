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

const Goals = () => {
  return (
    <div className="flex">
      <div>
        <SideBar focus="Goals" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Goals</h3>
            <div className="flex items-center gap-3">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fa-solid fa-plus p-2" />
                Add Goal
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
                Total Goals
                <i
                  className="fas fa-bullseye"
                  style={{ color: "#4ea3ff", fontSize: 20 }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#5ea8ff] mt-3">8</p>
              <p className="text-sm text-gray-400">Active Goals</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Completed
                <i
                  className="fas fa-circle-check"
                  style={{ color: "#2ee97b", fontSize: 20 }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#2ee97b] mt-3">3</p>
              <p className="text-sm text-gray-400">Goals Achieved</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Total Target
                <i
                  className="fas fa-dollar-sign"
                  style={{ color: "#c27cfb", fontSize: 20 }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#c27cfb] mt-3">$45,000</p>
              <p className="text-sm text-gray-400">Combined targets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
