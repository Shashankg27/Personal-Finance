import React from "react";

const DashboardPreview = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">
      <p className="font-bold text-4xl text-center p-6">Dashboard Preview</p>
      <div className="bg-[#1a2332] p-8 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
          <div className="bg-green-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">This Month's Income</p>
              <p className="text-2xl font-bold">$5,240</p>
            </div>
            <i className="fas fa-arrow-up text-2xl"></i>
          </div>

          <div className="bg-red-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">This Month's Expenses</p>
              <p className="text-2xl font-bold">$3,180</p>
            </div>
            <i className="fas fa-arrow-down text-2xl"></i>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">Balance Left</p>
              <p className="text-2xl font-bold">$2,060</p>
            </div>
            <i className="fas fa-wallet text-2xl"></i>
          </div>

          <div className="bg-purple-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">Active Goals</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <i className="fas fa-spinner fa-spin text-2xl"></i>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1f2937] p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Expense Categories</h3>
            <div className="mt-6 grid grid-cols-2 gap-2 text-sm text-white">
              {/* Lengends */}
              <div className="flex items-center gap-2">
                <i className="fas fa-circle text-red-500"></i> Food
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-circle text-yellow-400"></i> Entertainment
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-circle text-green-500"></i> Utilities
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-circle text-blue-500"></i> Shopping
              </div>
            </div>
            <style>
              {`
      .clip-path-pie-1 { clip-path: polygon(50% 50%, 220% 0, 130% 100%); }
      .clip-path-pie-2 { clip-path: polygon(50% 50%, 130% 100%, 0 100%); }
      .clip-path-pie-3 { clip-path: polygon(50% 50%, 0 100%, 0 0); }
      .clip-path-pie-4 { clip-path: polygon(50% 50%, 0 0, 211% 0); }
    `}
            </style>
            {/* pie-chart */}
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-40 h-40">
                <i className="fas fa-circle text-red-500 absolute top-0 left-0 text-[10rem] clip-path-pie-1"></i>
                <i className="fas fa-circle text-yellow-400 absolute top-0 left-0 text-[10rem] clip-path-pie-2"></i>
                <i className="fas fa-circle text-green-500 absolute top-0 left-0 text-[10rem] clip-path-pie-3"></i>
                <i className="fas fa-circle text-blue-500 absolute top-0 left-0 text-[10rem] clip-path-pie-4"></i>
              </div>
            </div>
          </div>

          <div className="bg-[#1f2937] p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Weekly Expenses</h3>
            <div className="h-64 flex items-center justify-center text-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
