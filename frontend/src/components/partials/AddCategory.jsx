import React from "react";

const AddCategory = () => {
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

          <form className="space-y-4">
            {/* Type Dropdown */}
            <div>
              <label className="block text-gray-300 mb-1">Type</label>
              <select className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="investment">Investment</option>
              </select>
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-gray-300 mb-1">Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-300 mb-1">Note</label>
              <input
                type="text"
                placeholder="Add a note"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-300 mb-1">Budget</label>
              <input
                type="number"
                placeholder="Enter budget amount"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
