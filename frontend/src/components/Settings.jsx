import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./partials/SideBar";
import Logout from "./partials/Logout";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/data/user`, {
        withCredentials: true,
      })
      .then((res) => {
        const userData = res.data;
        setUser(userData);
        setFormData((prev) => ({
          ...prev,
          name: userData?.name || "",
          email: userData?.email || "",
          username: userData?.username || "",
        }));
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/user/updateUser`,
        {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        },
        { withCredentials: true }
      );

      alert("Profile updated successfully!");
      setUser(res.data);
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update profile.");
    }
  };

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
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline"
                onClick={handleSave}
              >
                Save changes
              </button>
              <div className="flex items-center gap-2">
                <Logout />
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-3">
            {/* Left Column */}
            <div className="col-span-2 flex flex-col gap-6 w-[70%]">
              {/* Profile Information */}
              <div className="bg-[#1e293b] p-5 rounded-xl">
                <h4 className="text-lg text-white font-semibold mb-4">
                  <i className="fas fa-user-circle mr-2 text-blue-500"></i>{" "}
                  Profile Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Full Name</label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Username</label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      className="bg-[#374151] px-3 py-2 rounded w-full col-span-2"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                    />
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
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      placeholder="Current Password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      placeholder="New Password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-[#374151] px-3 py-2 rounded w-full"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-2 flex flex-col gap-6 w-[30%]">
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
