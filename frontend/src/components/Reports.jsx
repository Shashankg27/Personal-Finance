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

const Reports = () => {
  return (
    <div className="flex">
      <div>
        <SideBar focus="Reports" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Reports & Export</h3>
            <div className="flex items-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fas fa-chart-bar p-1" />
                Generate Report
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>

          {/* Cards section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Reports Generated
                <i className="fas fa-file-alt" style={{ color: "#5ea8ff" }} />
              </h4>
              <p className="text-4xl font-bold text-[#5ea8ff] mt-3">47</p>
              <p className="text-sm text-gray-400">This year</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Last Export
                <i className="fas fa-download" style={{ color: "#34d399", fontSize: 20 }}/>

              </h4>
              <p className="text-2xl font-bold text-[#34d399] mt-3">Dec 15</p>
              <p className="text-sm text-gray-400">Monthly summary</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Data Size
                <i className="fas fa-database" style={{ color: "#c084fc", fontSize: 20 }}></i>

              </h4>
              <p className="text-4xl font-bold text-[#c084fc] mt-4">2.4GB</p>
              <p className="text-sm text-gray-400">Total Data</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Storage Used
                <i className="fas fa-cloud" style={{ color: "#fbc400", fontSize: 20 }}></i>

              </h4>
              <p className="text-4xl font-bold text-[#fbc400] mt-3">68%</p>
              <p className="text-sm text-gray-400">Of 5GB Limit</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Reports;
