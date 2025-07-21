import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const AddTransaction = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);
  useEffect(() => {
      const token = getCookie('token');
      if (token) {
          const userData = jwtDecode(token);
          setUser(userData);
      }
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
      const loanResponse = axios
        .get(`${import.meta.env.VITE_BACKEND_API}/user/getLoans`, {
          withCredentials: true,
        })
        .then((res) => {
          setLoans(res.data.userLoans);
        })
        .catch((error) => {
          console.log("Error fetching loans! ", error);
        });
  }, []);

  const options = {
    income: user.incomeCategories,
    expense: user.expenseCategories,
    goal: goals,
    loan: loans
  }
        
  // console.log(user._id);
  const [transactionData, setTransactionData] = useState({
    name: "",
    type: "expense",
    category: "",
    description: "",
    amount: 0,
    userId: "",
    recurring: false,
    date: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    transactionData.userId = user._id;
    // console.log(transactionData);
    if(transactionData.name === ""){
      alert("Add name");
      return;
    }
    if(transactionData.amount < 0){
      alert("Amount Cannot be negative!");
      return;
    }
    if(transactionData.category === ""){
      alert("Select Category!");
      return;
    }
    
    if(transactionData.description === '') delete transactionData.description;
    if(transactionData.date === '') delete transactionData.date;

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/addTransaction`, {
        transactionData: { ...transactionData }
      }, {
        withCredentials: true
      });
      if (response.data.success) {
          navigate('/transactions');
        } else {
          alert("Failed! Try to add transaction.");
        }
    } catch (err) {
      console.log("Add transaction error: " + err);
      alert('Failed!');
    }
  }
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type='text'
              placeholder="Name"
              name="name"
              onChange={(e) => setTransactionData({ ...transactionData, name: e.target.value })}
              className="w-full px-4 py-2 bg-[#334155] text-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Amount */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              name="amount"
              onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}
              className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select name="type" onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value })} className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="goal">Goal</option>
              <option value="loan">Loan</option>
            </select>
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select name="category" onChange={(e) => setTransactionData({ ...transactionData, category: e.target.value })} className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Category</option>
              { options[transactionData.type] && 
                options[transactionData.type].map((option) => (
                  <option value={option.name}>{option.name}</option>
                ))
              }
            </select>
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              name="date"
              onChange={(e) => setTransactionData({ ...transactionData, date: e.target.value })}
              className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              placeholder="Add a note..."
              name="description"
              onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 bg-[#334155] text-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Recurring */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="recurring" className="mr-2" checked={transactionData.recurring} name="recurring" onChange={(e) => setTransactionData({ ...transactionData, recurring: e.target.checked })}/>
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
