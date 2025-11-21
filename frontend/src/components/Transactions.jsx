import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import Logout from "./partials/Logout";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Transactions = () => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // SORT STATE
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

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
          setFilteredTransactions(res.data.userTransactions);
        });

      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/user/getGoals`, {
          withCredentials: true,
        })
        .then((res) => setGoals(res.data.userGoals));

      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/user/getLoans`, {
          withCredentials: true,
        })
        .then((res) => setLoans(res.data.userLoans));
    }
  }, []);

  // ✅ FILTER + SEARCH + SORT
  useEffect(() => {
    let temp = [...transactions];

    if (search.trim() !== "") {
      temp = temp.filter((t) =>
        `${t.name} ${t.category} ${t.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (selectedType !== "") {
      temp = temp.filter((t) => t.type === selectedType);
    }

    if (selectedCategory !== "") {
      temp = temp.filter((t) => t.category === selectedCategory);
    }

    const today = new Date();
    if (selectedDate === "This Month") {
      temp = temp.filter(
        (t) => new Date(t.date).getMonth() === today.getMonth()
      );
    }
    if (selectedDate === "Last Month") {
      temp = temp.filter(
        (t) => new Date(t.date).getMonth() === today.getMonth() - 1
      );
    }
    if (selectedDate === "Last 3 months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      temp = temp.filter((t) => new Date(t.date) >= threeMonthsAgo);
    }
    if (selectedDate === "This Year") {
      temp = temp.filter(
        (t) => new Date(t.date).getFullYear() === today.getFullYear()
      );
    }

    temp.sort((a, b) => {
      if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredTransactions(temp);
  }, [
    search,
    selectedCategory,
    selectedType,
    selectedDate,
    sortBy,
    sortOrder,
    transactions,
  ]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/user/deleteTransaction`,
        {
          data: { id },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setTransactions((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      alert("Cannot delete transaction!");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedDate("");
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar stays full height */}
      <div className="h-full">
        <SideBar focus="Transactions" />
      </div>

      {/* ✅ Content scrolls independently */}
      <div className="flex-1 bg-[#0f172a] text-white h-full overflow-y-auto">
        <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 border !border-gray-700">
          <h3 className="text-2xl font-semibold">Transactions</h3>
          <div className="flex items-center gap-3">
            <Link
              to="addTransaction"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md !no-underline"
            >
              <i className="fa-solid fa-plus p-1" /> Add Transaction
            </Link>
            <Logout />
          </div>
        </div>

        {/* Filters */}
        <div className="p-3">
          <div className="bg-[#1e293b] p-4 rounded-xl flex gap-4">

            {/* SEARCH */}
            <div className="flex-1">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-3 pr-3 py-2 rounded-md bg-[#334155] text-white outline-none"
              />
              <p className="text-sm text-gray-400 mt-3">
                Showing {filteredTransactions.length} transactions
              </p>
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col w-[23%]">
              <label>Category</label>
              <select
                className="bg-[#334155] text-white px-3 py-2 rounded-md"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">All Categories</option>
                {filteredTransactions.map((t) => (
                  <option key={t._id} value={t.category}>
                    {t.category}
                  </option>
                ))}
              </select>
            </div>

            {/* TYPE */}
            <div className="flex flex-col w-[23%]">
              <label>Type</label>
              <select
                className="bg-[#334155] text-white px-3 py-2 rounded-md"
                onChange={(e) => setSelectedType(e.target.value)}
                value={selectedType}
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="goal">Goal</option>
                <option value="loan">Loan</option>
              </select>
            </div>

            {/* DATE RANGE */}
            <div className="flex flex-col w-[23%]">
              <label>Date Range</label>
              <select
                className="bg-[#334155] text-white px-3 py-2 rounded-md"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              >
                <option value="">All Time</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 months</option>
                <option>This Year</option>
              </select>

              <button
                className="text-blue-400 hover:underline text-sm mt-2 ml-auto"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="p-3">
          <div className="bg-[#1e293b] rounded-xl">
            <div className="flex justify-between items-center p-4">
              <p className="font-semibold text-lg">All Transactions</p>
              <i
                className="fa-solid fa-sort cursor-pointer"
                onClick={toggleSort}
              />
            </div>

            {filteredTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="border-y !border-gray-700 px-4 py-3 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{transaction.name}</p>
                  <p className="text-gray-400 text-md">{transaction.category}</p>
                  <p className="text-gray-400 text-md">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.description}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <div>
                    <p
                      className={`text-${
                        transaction.type === "expense" ||
                        transaction.type === "goal" ||
                        transaction.type === "loan"
                          ? "red-500"
                          : "green-500"
                      }`}
                    >
                      {(transaction.type === "expense" ||
                      transaction.type === "goal" ||
                      transaction.type === "loan"
                        ? "-"
                        : "+") + "$" + transaction.amount}
                    </p>
                    <p className="text-gray-400">{transaction.type}</p>
                  </div>

                  <i
                    className="fa-solid fa-trash cursor-pointer"
                    onClick={() => handleDelete(transaction._id)}
                    style={{ color: "#d10000" }}
                  ></i>
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <p className="text-center py-6 text-gray-400">
                No transactions found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
