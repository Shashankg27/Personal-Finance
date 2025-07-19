import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Transactions = () => {
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [updatedTransactions, setUpdatedTransactions] = useState([]);

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            const userData = jwtDecode(token);
            setUser(userData);

            const response = axios.get(`${import.meta.env.VITE_BACKEND_API}/user/getTransactions`, {
                withCredentials: true
            })
            .then((res) => {
                setTransactions(res.data.userTransactions);
            })
            .catch((err) => {
                console.error('Error fetching transactions:', err);
            });
            const goalResponse = axios
              .get(`${import.meta.env.VITE_BACKEND_API}/user/getGoals`, {
                withCredentials: true,
              })
              .then((res) => {
                setGoals(res.data.userGoals);
              })
              .catch((error) => {
                console.log("Error fetching goals! ", error);
            });
        }
    }, []);

    console.log("transactions:");
    console.log(transactions);

    const handleDelete = async (id) => {
      try{
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/user/deleteTransaction`, {
            data: {
                id
            },
            withCredentials: true
        });
        if(response.data.success){
            window.location.reload();
        }
      }
      catch(err){
        alert("Cannot delete transaction!");
        console.log("Delete transaction error:", err);
      }
    }

  return (
    <div className="flex">
      <div>
        <SideBar focus="Transactions" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Transactions</h3>
            <div className="flex items-center gap-3">
              <Link to='addTransaction' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fa-solid fa-plus p-1" />
                Add Transaction
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="bg-[#1e293b] p-4 rounded-xl">
              {/* Search */}
              <div className="flex gap-4">
                <div>
                  <label className="block text-white mb-1">Search</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search transactions"
                      className=" pl-10 pr-3 py-2 rounded-md bg-[#334155] text-white placeholder-gray-400 outline-none"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    Showing {transactions.length} transactions
                  </p>
                </div>

                <div className="flex flex-col w-[25%]">
                  {/* Category */}
                  <label className="block text-white mb-1">Category</label>
                  <select className="bg-[#334155] text-white px-3 py-2 rounded-md w-full">
                    <option>All Categories</option>
                    {(selectedType === '' || selectedType === 'income') && user.incomeCategories && user.incomeCategories.map((category, index) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
                    {(selectedType === '' || selectedType === 'expense') && user.expenseCategories && user.expenseCategories.map((category, index) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
                    {(selectedType === '' || selectedType === 'goals') && goals && goals.map((goal, index) => (
                      <option value={goal.name}>{goal.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-[25%]">
                  {/* Type */}
                  <label className="block text-white mb-1">Type</label>
                  <select className="bg-[#334155] text-white px-3 py-2 rounded-md w-full"
                  onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value=''>All Types</option>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
                    <option value='goals'>Goals</option>
                  </select>
                </div>

                <div className="flex flex-col w-[25%]">
                  {/*Date range */}
                  <label className="block text-white mb-1">Date Range</label>
                  <select className="bg-[#334155] text-white px-3 py-2 rounded-md w-full">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 months</option>
                    <option>This Year</option>
                    <option>Custom range</option>
                  </select>

                  {/* Clear Filters */}
                  <div className="ml-auto">
                    <button className="text-blue-400 hover:underline text-sm mt-3">
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="bg-[#1e293b] rounded-xl">
              <div className="flex justify-between items-center">
                  <div>
                    <p className="p-4 font-semibold text-lg">All Transactions</p>
                  </div>
                  <div className="p-4 flex gap-3">
                    <i className="fa-solid fa-sort" />
                    <i className="fa-solid fa-filter" />
                  </div>
              </div>
              <div className="flex flex-col">
                {transactions && transactions.map((transaction, index) => (
                  <div className="border-y !border-gray-700">
                    <div className="px-4 py-3 flex justify-between">
                      <div>
                        <p className="font-semibold">{transaction.name}</p>
                        <div className="flex gap-2 items-center">
                          <p className="text-gray-400 text-md">{transaction.category}</p>
                          <span className="text-gray-400 text-xl leading-none">•</span>
                          <p className="text-gray-400 text-md">{transaction.date}</p>
                        </div>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex flex-col gap-1">
                          <p className={`text-${transaction.type==='expense'?'red-500':'green-500'}`}>{(transaction.type==='expense' || transaction.type === 'goal')?'-':'+'}${transaction.amount}</p>
                          <p className="text-gray-400">{transaction.type}</p>
                        </div>
                        <i className="fa-solid fa-pen-to-square" style={{color: '#1f9eff'}}></i>
                        <i className="fa-solid fa-trash" onClick={() => handleDelete(transaction._id)} style={{color: '#d10000'}}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
