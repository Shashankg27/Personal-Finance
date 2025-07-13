import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Income = () => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const userData = jwtDecode(token);
      setUser(userData);
      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/user/getTransactions`, {
          withCredentials: true,
        })
        .then((res) => {
          setTransactions(res.data.userTransactions);
        })
        .catch((err) => {
          console.error("Error fetching transactions:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (user.expenseCategories) {
      setCategories(user.expenseCategories);
    }
  }, [user]);

  useEffect(() => {
    const updatedCategories = [...categories];

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        const categoryIdx = updatedCategories.findIndex(
          (category) => category.name === transaction.category
        );

        if (categoryIdx !== -1) {
          const category = { ...updatedCategories[categoryIdx] };
          if (typeof category.used !== "number") category.used = 0;
          category.used += transaction.amount;
          updatedCategories[categoryIdx] = category;
        }
      }
    });

    setCategories(updatedCategories);
  }, [transactions]);

  let total_budget = 0;
  let spent_this_month = 0;
  user.expenseCategories &&
    user.expenseCategories.forEach((category) => {
      total_budget += parseInt(category.budget);
    });
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      spent_this_month += transaction.amount;
    }
  });

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/user/deleteTransaction`,
        {
          data: {
            id,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        window.location.reload();
      }
    } catch (err) {
      alert("Cannot delete transaction!");
      console.log("Delete transaction error:", err);
    }
  };

  return (
    <div className="flex">
      <div>
        <SideBar focus="Income" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Income & Budget</h3>
            <div className="flex items-center gap-3">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fa-solid fa-plus p-1" />
                Add Income
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fas fa-chart-bar p-1" />
                Set Budget
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Total Budget
                <i className="fa-solid fa-wallet" style={{ color: "#5DA8FF" }} />
              </h4>
              <p className="text-4xl font-bold text-[#5ea8ff] mt-3">${total_budget}</p>
              <p className="text-sm text-gray-400">Monthly Budget limit</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Spent This Month
                <i className="fa-solid fa-credit-card" style={{ color: "#F26C6C" }} />
              </h4>
              <p className="text-4xl font-bold text-[#F26C6C] mt-3">${spent_this_month}</p>
              <p className="text-sm text-gray-400">
                {((spent_this_month / total_budget) * 100).toFixed(2)}% of budget used
              </p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Remaining Budget
                <i className="fa-solid fa-piggy-bank" style={{ color: "#5BE38D" }} />
              </h4>
              <p className="text-4xl font-bold text-[#5BE38D] mt-3">
                ${total_budget - spent_this_month}
              </p>
              <p className="text-sm text-gray-400">
                {(((total_budget - spent_this_month) / total_budget) * 100).toFixed(2)}% remaining
              </p>
            </div>
          </div>

          {/* Incomes & Budgets */}
          <div className="flex p-3 gap-3 w-full">
            {/* Income Section */}
            <div className="bg-[#1e293b] w-[50%] rounded-xl pb-3">
              <div className="p-3 flex justify-between items-center">
                <p className="text-lg font-semibold m-0">Income Sources</p>
                <i className="fa-solid fa-plus m-0" style={{ color: "#36fe74" }} />
              </div>
              <div className="bg-gray-700 w-full pt-0.25"></div>
              <div className="flex flex-col gap-2 p-3">
                {transactions &&
                  transactions.map(
                    (transaction) =>
                      transaction.type === "income" && (
                        <div
                          key={transaction._id}
                          className="bg-[#2b3544] rounded-lg px-3 py-2 flex justify-between"
                        >
                          <div>
                            <p className="text-xl font-semibold">{transaction.name}</p>
                            <p className="text-gray-400 font-semibold">
                              {transaction?.recurring === true ? "Recurring" : "One time"}
                            </p>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="flex flex-col gap-2 items-end">
                              <p className="text-green-500 font-bold text-lg">
                                ${transaction.amount}
                              </p>
                              {transaction.recurring && (
                                <i
                                  className="fa-solid fa-rotate-right text-xs"
                                  style={{ color: "#60a5fa" }}
                                />
                              )}
                            </div>
                            <i
                              className="fa-solid fa-pen-to-square"
                              style={{ color: "#1f9eff" }}
                            ></i>
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(transaction._id)}
                              style={{ color: "#d10000" }}
                            ></i>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>

            {/* Budget Categories Section */}
            <div className="bg-[#1e293b] w-[50%] rounded-xl pb-3">
              <div className="p-3 flex justify-between items-center">
                <p className="text-lg font-semibold m-0">Category budgets</p>
                <i className="fa-solid fa-plus m-0" style={{ color: "#60a5fa" }} />
              </div>
              <div className="bg-gray-700 w-full pt-0.25"></div>
              <div className="flex flex-col gap-2 p-3">
                {categories &&
                  categories.map((category, index) => {
                    const used = category.used || 0;
                    const budget = parseFloat(category.budget);
                    const percentUsed = Math.min((used / budget) * 100, 100).toFixed(2);
                    const overBudget = used > budget;

                    return (
                      <div key={index} className="bg-[#2b3544] rounded-lg px-4 py-3">
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-semibold">{category.name}</p>
                          <div className="flex gap-3 items-center">
                            <p className="text-gray-300 text-lg">
                              ${used.toFixed(2)}/${budget}
                            </p>
                            <i
                              className="fa-solid fa-pen-to-square text-blue-400"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </div>
                        </div>

                        <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              overBudget ? "bg-red-500" : "bg-blue-500"
                            }`}
                            style={{ width: `${percentUsed}%` }}
                          ></div>
                        </div>

                        <p
                          className={`mt-1 text-sm font-medium ${
                            overBudget ? "text-red-400" : "text-green-400"
                          }`}
                        >
                          {overBudget
                            ? `Over budget by $${(used - budget).toFixed(2)}`
                            : `$${(budget - used).toFixed(2)} remaining`}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
