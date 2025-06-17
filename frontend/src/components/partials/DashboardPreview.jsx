import React from 'react'

const DashboardPreview = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">
      <p className='font-bold text-4xl text-center p-6'>Dashboard Preview</p>
      <div className="bg-[#1a2332] p-8 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
        <div className="bg-green-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
          <div>
            <p className="text-sm">This Month's Income</p>
            <p className="text-2xl font-bold">$5,240</p>
          </div>
        </div>

        <div className="bg-red-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
          <div>
            <p className="text-sm">This Month's Expenses</p>
            <p className="text-2xl font-bold">$3,180</p>
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
          <div>
            <p className="text-sm">Balance Left</p>
            <p className="text-2xl font-bold">$2,060</p>
          </div>
        </div>

        <div className="bg-purple-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
          <div>
            <p className="text-sm">Active Goals</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1f2937] p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Expense Categories</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            
          </div>
        </div>

        <div className="bg-[#1f2937] p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Weekly Expenses</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            
          </div>
        </div>
      </div>
      </div>

      
    </div>
  )
}

export default DashboardPreview
