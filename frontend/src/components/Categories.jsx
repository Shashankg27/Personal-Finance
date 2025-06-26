import React from "react";

const Categories = () => {
  return (
    <div>
      <div className="bg-[#0f172a] min-h-screen text-white p-6 md:ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <div className="flex items-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              + Add Category
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="John Doe"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1e293b] rounded-lg p-4">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            Total Categories <i className="fas fa-tags" />
          </p>
          <p className="text-2xl text-blue-400 font-bold mt-1">24</p>
          <p className="text-sm text-gray-400">Active categories</p>
        </div>

        <div className="bg-[#1e293b] rounded-lg p-4">
          <p className="text-sm text-gray-400 flex items-center gap-2">Income Categories 
            <i className="fa-solid fa-arrow-up" style={{ color: "#4ade80" }} /></p>
          <p className="text-2xl font-bold text-green-400 mt-1">8</p>
          <p className="text-sm text-gray-400">Income sources</p>
        </div>

        <div className="bg-[#1e293b] rounded-lg p-4">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            Expense Categories<i className="fa-solid fa-arrow-down text-" style={{ color: "#f87171" }}/></p>
          <p className="text-2xl font-bold text-red-400 mt-1">14</p>
          <p className="text-sm text-gray-400">Expense types</p>
        </div>

        <div className="bg-[#1e293b] rounded-lg p-4">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            Investment Types <i className="fas fa-chart-line text-purple-400" /></p>
          <p className="text-2xl font-bold text-purple-400 mt-1">2</p>
          <p className="text-sm text-gray-400">Investment categories</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
