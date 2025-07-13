import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const AddCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default to "" or get from state
  const defaultType = location.state?.value || "";

  const [categoryData, setCategoryData] = useState({
    type: defaultType,
    name: "",
    note: "",
    budget: 0,
    recurring: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryData.budget <= 0) {
      alert("Budget should be a positive integer!");
      return;
    }

    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/user/addCategory`, {
        categoryData: { ...categoryData }
      }, {
        withCredentials: true
      });
      if (response.data.success) {
        navigate('/categories');
      } else {
        alert("Failed! Try to add category again.");
      }
    } catch (err) {
      console.log("Add category error: " + err);
      alert('Failed!');
    }
  }

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

          <p className="text-gray-300 text-center mb-6">Add a New Category</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Type Dropdown */}
            <div>
              <label className="block text-gray-300 mb-1">Type</label>
              <select name='type' value={categoryData.type} onChange={(e) => setCategoryData({ ...categoryData, type: e.target.value })} className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                <option value="incomeCategories">Income</option>
                <option value="expenseCategories">Expense</option>
                <option value="investmentCategories">Investment</option>
              </select>
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-gray-300 mb-1">Category Name</label>
              <input
                type="text"
                name='categoryName'
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                placeholder="Enter category name"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-300 mb-1">Note</label>
              <input
                type="text"
                name='note'
                value={categoryData.note}
                onChange={(e) => setCategoryData({ ...categoryData, note: e.target.value })}
                placeholder="Add a note"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-300 mb-1">{categoryData.type === "expenseCategories"? "Budget":"Amount"}</label>
              <input
                type="number"
                name='budget'
                value={categoryData.budget}
                onChange={(e) => setCategoryData({ ...categoryData, budget: e.target.value })}
                placeholder={`Enter budget amount`}
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="recurring" id="recurring" checked={categoryData.recurring} onChange={(e) => setCategoryData({ ...categoryData, recurring: e.target.checked})}/>
              <label className="text-white">Recurring</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
