import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const AddInvestment = () => {
  //   const [user, setUser] = useState(null);
  let user = null;

  //   useEffect(() => {
  const token = getCookie("token");
  console.log(token);
  if (token) {
    const userData = jwtDecode(token);
    // setUser(userData);
    // console.log(userData);
    user = userData;
  }
  console.log(user);
  //   }, []);
  const navigate = useNavigate();
  const location = useLocation();

  // Default to "" or get from state
  const defaultType = location.state?.value || "";

  const [investmentData, setInvestmentData] = useState({
    name: "",
    note: "",
    principal: 0,
    roi: 0,
    category: "",
    date: Date.now,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (investmentData.principal <= 0) {
      alert("Principal should be a positive integer!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/addInvestment`,
        {
          investmentData: { ...investmentData },
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/investments");
      } else {
        alert("Failed! Try to add investment again.");
      }
    } catch (err) {
      console.log("Add investment error: " + err);
      alert("Failed!");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
        <div className="bg-[#1e293b] p-8 rounded-2xl w-full max-w-md shadow-lg ">
          <div className="flex gap-2 items-center justify-center">
            <i className="fas fa-wallet fa-2xl text-blue-500"></i>
            <h2 className="text-white text-2xl font-semibold text-center mb-2">
              FinanceBuddy
            </h2>
          </div>

          <p className="text-gray-300 text-center mb-6">Add a New Investment</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Type Dropdown */}
            <div>
              <label className="block text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={investmentData.category}
                onChange={(e) =>
                  setInvestmentData({
                    ...investmentData,
                    category: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {user.investmentCategories.map((category, index) => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-gray-300 mb-1">
                Investment Name
              </label>
              <input
                type="text"
                name="InvestmentName"
                value={investmentData.name}
                onChange={(e) =>
                  setInvestmentData({ ...investmentData, name: e.target.value })
                }
                placeholder="Enter Investment name"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-300 mb-1">Note</label>
              <input
                type="text"
                name="note"
                value={investmentData.note}
                onChange={(e) =>
                  setInvestmentData({ ...investmentData, note: e.target.value })
                }
                placeholder="Add a note"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-300 mb-1">Principal</label>
              <input
                type="number"
                name="Principal"
                value={investmentData.principal}
                onChange={(e) =>
                  setInvestmentData({
                    ...investmentData,
                    principal: e.target.value,
                  })
                }
                placeholder="Enter Principal amount"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* ROI */}
            <div>
              <label className="block text-gray-300 mb-1">ROI</label>
              <input
                type="number"
                name="ROI"
                value={investmentData.roi}
                onChange={(e) =>
                  setInvestmentData({ ...investmentData, roi: e.target.value })
                }
                placeholder="Enter ROI %"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={investmentData.date}
                onChange={(e) =>
                  setInvestmentData({ ...investmentData, date: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                className="w-1/2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => navigate('/investments')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Investment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInvestment;
