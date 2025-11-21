import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";
import axios from "axios";
import { FaUtensils, FaDollarSign, FaGasPump, FaFilm } from 'react-icons/fa';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Logout from "./partials/Logout";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [updatedTransactions, setUpdatedTransactions] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [monthIncome, setMonthIncome] = useState(0);
  const [monthExpense, setMonthExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [timeRange, setTimeRange] = useState('daily'); // 'daily' or 'monthly'

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
      }
  }, []);

  const now = new Date();

  useEffect(() => {
    if (!transactions.length) return;

    let totalInc = 0;
    let totalExp = 0;
    let monthInc = 0;
    let monthExp = 0;
    let saving = 0;

    goals.forEach((goal) => {
      saving += goal.amount;
    });

    const now = new Date();

    // Group expenses by category
    const categoryMap = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);

      if (transaction.type === "expense") {
        totalExp += transaction.amount;
        if (
          date.getUTCMonth() === now.getUTCMonth() &&
          date.getUTCFullYear() === now.getUTCFullYear()
        ) {
          monthExp += transaction.amount;
        }

        // Aggregate by category
        const cat = transaction.category || 'Uncategorized';
        if (!categoryMap[cat]) {
          categoryMap[cat] = 0;
        }
        categoryMap[cat] += transaction.amount;
      } else if (transaction.type === "income") {
        totalInc += transaction.amount;
        if (
          date.getUTCMonth() === now.getUTCMonth() &&
          date.getUTCFullYear() === now.getUTCFullYear()
        ) {
          monthInc += transaction.amount;
        }
      }
    });

    // Format data for Pie Chart
    const expenseCategoriesData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value
    }));

    // Calculate daily/monthly expenses based on timeRange
    let dailyExpensesData = [];
    if (timeRange === 'daily') {
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      dailyExpensesData = daysOfWeek.map(day => ({ name: day, value: 0 }));

      transactions.forEach((transaction) => {
        const date = new Date(transaction.date);

        if (
          transaction.type === "expense" &&
          date.getUTCMonth() === now.getUTCMonth() &&
          date.getUTCFullYear() === now.getUTCFullYear()
        ) {
          const dayIndex = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
          const dayName = daysOfWeek[(dayIndex + 6) % 7]; // Convert to Mon=0, Sun=6
          const dayObj = dailyExpensesData.find(d => d.name === dayName);
          if (dayObj) {
            dayObj.value += transaction.amount;
          }
        }
      });
    } else if (timeRange === 'monthly') {
      // Calculate number of days in the current month
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      dailyExpensesData = Array.from({ length: daysInMonth }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: 0
      }));

      transactions.forEach((transaction) => {
        const date = new Date(transaction.date);

        if (
          transaction.type === "expense" &&
          date.getUTCMonth() === now.getUTCMonth() &&
          date.getUTCFullYear() === now.getUTCFullYear()
        ) {
          const dayOfMonth = date.getDate(); // 1-31
          const dayIndex = dayOfMonth - 1; // 0-30
          if (dayIndex < dailyExpensesData.length) {
            dailyExpensesData[dayIndex].value += transaction.amount;
          }
        }
      });
    }

    setTotalIncome(totalInc);
    setTotalExpense(totalExp);
    setMonthIncome(monthInc);
    setMonthExpense(monthExp);
    setBalance(totalInc - totalExp);
    setSavings(saving);
    setExpenseCategories(expenseCategoriesData);
    setDailyExpenses(dailyExpensesData);
  }, [transactions, timeRange]); // Add timeRange to dependency array

  return (
    <div className="flex">
      <div>
        <SideBar focus="Dashboard" />
      </div>
      <div className="flex-1 bg-[#111827]">
        {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700 text-white">
            <h3 className="text-2xl font-semibold">Dashboard</h3>
            <Logout />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
            <div className="bg-[#16A34A] rounded-xl p-4 shadow-md">
              <p className="text-base text-white mb-1">This Month's Income</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl text-white font-bold">{monthIncome}</p>
                <i
                  className="fa-solid fa-arrow-up text-3xl"
                  style={{ color: "#BBF7D0" }}
                />
              </div>
            </div>

            <div className="bg-[#EF4444] rounded-xl p-4 shadow-md">
              <p className="text-base text-white mb-1">This Month's Expenses</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl text-white font-bold">{monthExpense}</p>
                <i
                  className="fa-solid fa-arrow-down text-3xl"
                  style={{ color: "#FEE2E2" }}
                />
              </div>
          </div>

          <div className="bg-[#2563EB] rounded-xl p-4 shadow-md">
              <p className="text-base text-white mb-1">Balance Left</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl text-white font-bold">{balance}</p>
                <i className="fas fa-wallet text-3xl" style={{color: "#ffffff"}}></i>
              </div>
          </div>

          <div className="bg-[#7E22CE] rounded-xl p-4 shadow-md">
              <p className="text-base text-white mb-1">Total Savings</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl text-white font-bold">{savings}</p>
                <i
                  className="fas fa-piggy-bank text-3xl"
                  style={{ color: "#E9D5FF" }}
                />
              </div>
          </div>
        </div>

        {/* New Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3">
          {/* Expense Categories Pie Chart */}
          <div className="bg-[#1e293b] rounded-xl p-4 shadow-md">
            <h4 className="text-xl font-semibold text-white mb-4">Expense Categories</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[
                        '#EF4444', // Food & Dining
                        '#F59E0B', // Transportation
                        '#EAB308', // Entertainment
                        '#10B981', // Utilities
                        '#3B82F6', // Shopping
                        '#A855F7'  // Healthcare
                      ][index % 6]} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Expenses Overview Bar Chart */}
          <div className="bg-[#1e293b] rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Expenses Overview</h4>
              <select 
                className="bg-[#1f2937] text-white text-sm px-2 py-1 rounded border !border-gray-700"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#ffffff' }} />
                <YAxis tick={{ fill: '#ffffff' }} />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name={timeRange === 'monthly' ? "Daily Expenses (Current Month)" : "Daily Expenses (Current Week)"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Goals & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3">
          {/* Active Goals Section */}
          <div className="bg-[#1e293b] rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Active Goals</h4>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium" onClick={() => navigate('/goals')}>View All</button>
            </div>
            <div className="space-y-2">
              {goals.map((goal) => {
                const progress = Math.min(100, Math.round((goal.amount / goal.targetAmount) * 100)) || 0;
                return (
                  <div 
                    key={goal._id} 
                    className="bg-[#1f2937] rounded-lg p-2 border !border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h5 className="text-white text-sm font-medium">{goal.name}</h5>
                        <p className="text-gray-400 text-xs">{goal.note || ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm font-medium">${goal.amount} / ${goal.targetAmount}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div 
                        className={`h-1.5 rounded-full ${
                          progress >= 75 ? 'bg-green-500' : 
                          progress >= 50 ? 'bg-yellow-500' : 
                          'bg-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400">{progress}% complete</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-[#1e293b] rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Recent Transactions</h4>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium" onClick={() => navigate('/transactions')}>View All</button>
            </div>
            <div className="space-y-2">
              {transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 4)
                .map((transaction) => {
                  const date = new Date(transaction.date);
                  const now = new Date();
                  const diffTime = Math.abs(now - date);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  let timeLabel = '';
                  if (diffDays === 0) {
                    timeLabel = 'Today';
                  } else if (diffDays === 1) {
                    timeLabel = 'Yesterday';
                  } else {
                    timeLabel = `${diffDays} days ago`;
                  }

                  // Icon mapping based on category
                  const getIcon = (category) => {
                    switch (category.toLowerCase()) {
                      case 'grocery':
                      case 'food & dining':
                        return <FaUtensils className="text-white" />;
                      case 'salary':
                      case 'income':
                        return <FaDollarSign className="text-white" />;
                      case 'gas station':
                      case 'transportation':
                        return <FaGasPump className="text-white" />;
                      case 'entertainment':
                      case 'netflix subscription':
                        return <FaFilm className="text-white" />;
                      default:
                        return <FaDollarSign className="text-white" />;
                    }
                  };

                  return (
                    <div 
                      key={transaction._id} 
                      className="flex items-center justify-between p-2 bg-[#1f2937] rounded-lg border !border-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-full ${
                          transaction.type === 'income' ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          {getIcon(transaction.category)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{transaction.name}</p>
                          <p className="text-gray-400 text-xs">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-xs ${
                          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </p>
                        <p className="text-gray-400 text-xs">{timeLabel}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;