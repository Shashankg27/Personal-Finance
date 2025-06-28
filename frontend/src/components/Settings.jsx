import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";
import { Link } from "react-router-dom";

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

const Settings = () => {
  return (
    <div className="flex">
      <div>
        <SideBar focus="settings" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Account Settings</h3>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline">
                Save changes
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3  p-3">
            {/* Left-column */}
            <div className="col-span-2 flex flex-col gap-6 w-[70%]">
              {/* {Profile- info} */}
              <div className="bg-[#1e293b] p-5 rounded-xl">
                <h4 className="text-lg text-white font-semibold mb-4">
                  <i className="fas fa-user-circle mr-2 text-blue-500"></i>{" "}
                  Profile Information
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-2">
                    <button className="text-white bg-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-700">
                      <i className="fas fa-camera mr-1"></i> Change Photo
                    </button>
                    <button className="text-white bg-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-600">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      placeholder="First Name"
                      value={user?.fname}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      placeholder="Last Name"
                      value={user?.lname}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full col-span-2"
                      placeholder="Email Address"
                      value={user.email}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      placeholder="Phone Number"
                      value={user?.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Currency</label>
                    <select className="bg-[#374151] px-3 py-2 rounded w-full">
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="inr">INR (₹)</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Security Settings */}
              <div className="bg-[#1f2937] p-5 rounded-xl">
                <h4 className="text-lg font-semibold mb-4">
                  <i className="fas fa-lock mr-2 text-green-500"></i> Security
                  Settings
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      type="password"
                      placeholder="Current Password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      type="password"
                      placeholder="New Password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <button className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700">
                  Update Password
                </button>

                <div className="mt-6">
                  <p className="mb-2 font-medium">Two-Factor Authentication</p>
                  <div className="flex justify-between items-center bg-[#374151] px-4 py-2 rounded">
                    <span>
                      <i className="fas fa-shield-alt mr-2"></i>SMS
                      Authentication
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 relative transition-all">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-full transition-all"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-[#1f2937] p-5 rounded-xl">
                <h4 className="text-lg font-semibold mb-4">
                  <i className="fas fa-bell mr-2 text-yellow-400"></i>{" "}
                  Notification Preferences
                </h4>

                <div className="flex justify-between items-center mb-2">
                  <span>Budget Alerts</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle-checkbox"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Transaction Notifications</span>
                  <input type="checkbox" className="toggle-checkbox" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Goal Reminders</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle-checkbox"
                  />
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-span-2 flex flex-col gap-6 w-[30%]">
              {/* Account Overview */}
              <div className="bg-[#1f2937] p-4 rounded-xl">
                <h4 className="text-md font-semibold mb-4">Account Overview</h4>
                <p className="text-sm mb-1">
                  <strong>Member Since:</strong> Jan 2023
                </p>
                <p className="text-sm mb-1">
                  <strong>Plan:</strong> Premium
                </p>
                <p className="text-sm mb-4">
                  <strong>Storage Used:</strong> 2.4GB / 5GB
                </p>
                <button className="bg-blue-600 w-full py-2 rounded text-sm hover:bg-blue-700">
                  <i className="fas fa-star mr-1"></i> Upgrade Plan
                </button>
              </div>
              {/* Privacy & Data */}
              <div className="bg-[#1f2937] p-4 rounded-xl">
                <h4 className="text-md font-semibold mb-3">Privacy & Data</h4>
                <button className="w-full bg-gray-700 py-2 rounded text-sm mb-2 hover:bg-gray-600">
                  <i className="fas fa-download mr-1"></i> Download My Data
                </button>
                <button className="w-full bg-gray-700 py-2 rounded text-sm mb-2 hover:bg-gray-600">
                  Privacy Policy
                </button>
                <button className="w-full bg-gray-700 py-2 rounded text-sm hover:bg-gray-600">
                  Terms of Service
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-[#271925] p-4 rounded-xl border !border-red-600">
                <h3 className="text-md font-semibold text-red-500 mb-3">
                  Danger Zone
                </h3>
                <button className="w-full bg-yellow-500 py-2 rounded text-sm mb-2 hover:bg-yellow-600 text-black font-semibold">
                  <i className="fas fa-exclamation-triangle mr-1"></i> Reset All
                  Data
                </button>
                <button className="w-full bg-red-600 py-2 rounded text-sm hover:bg-red-700 font-semibold">
                  <i className="fas fa-trash-alt mr-1"></i> Delete Account
                </button>
              </div>
              {/* Support */}
              <div className="bg-[#1f2937] p-4 rounded-xl">
                <h4 className="text-md font-semibold mb-3">Support</h4>
                <button className="w-full bg-green-600 py-2 rounded text-sm mb-2 hover:bg-green-700">
                  <i className="fas fa-question-circle mr-1"></i> Help Center
                </button>
                <button className="w-full bg-blue-500 py-2 rounded text-sm mb-2 hover:bg-blue-600">
                  <i className="fas fa-headset mr-1"></i> Contact Support
                </button>
                <button className="w-full bg-purple-600 py-2 rounded text-sm hover:bg-purple-700">
                  <i className="fas fa-bug mr-1"></i> Report Bug
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
