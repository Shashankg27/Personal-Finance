import React from "react";

const AddTransaction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] text-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Transaction</h2>
          <button className="text-gray-400 hover:text-white text-xl">
            &times;
          </button>
        </div>
        {/* Form */}
        <form className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="food">Food & Dining</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              placeholder="Add a note..."
              rows={2}
              className="w-full px-4 py-2 bg-[#334155] text-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Recurring */}
          <div className="flex items-center">
            <input type="checkbox" id="recurring" className="mr-2" />
            <label className="text-sm">
              Make this a recurring transaction
            </label>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
