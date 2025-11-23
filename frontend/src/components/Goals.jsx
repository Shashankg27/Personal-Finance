import React, { useEffect, useState } from "react";
import SideBar from "./partials/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import GoalCard from "./partials/GoalCard";
import Logout from "./partials/Logout";

const Goals = () => {
  const [user, setUser] = useState({});
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/data/user`, {
        withCredentials: true,
      })
      .then((res) => {
        const userData = res.data;
        setUser(userData);

        axios
          .get(`${import.meta.env.VITE_BACKEND_API}/user/getGoals`, {
            withCredentials: true,
          })
          .then((res) => {
            setGoals(res.data.userGoals.map(goal => ({ ...goal, done: 0 })));
          })
          .catch((error) => {
            console.log("Error fetching goals! ", error);
          });

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
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const now = new Date();

  useEffect(() => {
    let thisMonthTotal = 0;
    let lastMonthTotal = 0;
    const now = new Date();

    const updatedGoals = [...goals];

    transactions.forEach((transaction) => {
      if (transaction.type !== "goal") return;

      const txDate = new Date(transaction.date);
      const txMonth = txDate.getMonth();
      const txYear = txDate.getFullYear();

      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const lastMonthDate = new Date(now);
      lastMonthDate.setMonth(currentMonth - 1);
      const lastMonthMonth = lastMonthDate.getMonth();
      const lastMonthYear = lastMonthDate.getFullYear();

      if (txMonth === currentMonth && txYear === currentYear) {
        thisMonthTotal += transaction.amount;
      }

      if (txMonth === lastMonthMonth && txYear === lastMonthYear) {
        lastMonthTotal += transaction.amount;
      }

      const idx = updatedGoals.findIndex(
        (goal) => goal.name === transaction.category
      );
      if (idx !== -1) {
        updatedGoals[idx].done = (updatedGoals[idx].done || 0) + transaction.amount;
        if(updatedGoals[idx].done >= updatedGoals[idx].amount) updatedGoals[idx].complete = true;
      }
    });

    setThisMonth(thisMonthTotal);
    setLastMonth(lastMonthTotal);
    setGoals(updatedGoals);
  }, [transactions]);

  let thisMonthTarget = 0;
  goals.forEach((goal) => {
    if (goal.complete) return;

    const createdAt = new Date(goal.creationDate);
    const targetAt = new Date(goal.targetDate);

    if (now < createdAt || now > targetAt) return;

    const totalMonths =
      (targetAt.getFullYear() - createdAt.getFullYear()) * 12 +
      (targetAt.getMonth() - createdAt.getMonth()) +
      1;

    const monthlyTarget = goal.amount / totalMonths;

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (now >= createdAt && now <= targetAt) {
      thisMonthTarget += monthlyTarget;
    }
  });

  const monthlyCompletion = thisMonthTarget
    ? Math.min((thisMonth / thisMonthTarget) * 100, 100).toFixed(1)
    : 0;

  return (
    <div className="flex">
      <div>
        <SideBar focus="Goals" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Goals</h3>
            <div className="flex items-center gap-3">
              <Link
                to="addGoal"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline"
              >
                <i className="fa-solid fa-plus p-2" />
                Add Goal
              </Link>
              <div className="flex items-center gap-2">
                <Logout />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Total Goals
                <i
                  className="fas fa-bullseye"
                  style={{ color: "#4ea3ff", fontSize: 20 }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#5ea8ff] mt-3">
                {goals.filter(goal => !goal.complete).length}
              </p>
              <p className="text-sm text-gray-400">Active Goals</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Completed
                <i
                  className="fas fa-circle-check"
                  style={{ color: "#2ee97b", fontSize: 20 }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#2ee97b] mt-3">
                {goals.filter(goal => goal.complete).length}
              </p>
              <p className="text-sm text-gray-400">Goals Achieved</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-8">
                Total Target
                <i
                  className="fas fa-dollar-sign"
                  style={{ color: "#c27cfb", fontSize: 20 }}
                />
              </h4>
              <p className="text-4xl font-bold text-[#c27cfb] mt-3">
                ${goals.reduce((acc, goal) => acc + goal.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Combined targets</p>
            </div>
          </div>

          <div className="p-3 flex gap-4 w-full">
            <div className="flex flex-col gap-4 w-[66%]">
              <div className="bg-[#1e293b] p-4 rounded-lg">
                <p className="text-xl font-bold">Active Goals</p>
                <div className="border !border-gray-700 !mb-4"></div>
                <div className="flex gap-3 flex-col">
                  {goals.map((goal, index) => (
                    <React.Fragment key={goal._id}>
                      {!goal.complete && <GoalCard goal={goal} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="bg-[#1e293b] p-4 rounded-lg">
                <p className="text-xl font-bold">Complete Goals</p>
                <div className="border !border-gray-700 !mb-4"></div>
                <div className="flex gap-3 flex-col">
                  {goals.map((goal, index) => (
                    <React.Fragment key={goal._id}>
                      {goal.complete && <GoalCard goal={goal} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-[34%]">
              <div className="bg-[#1e293b] p-4 rounded-lg">
                <p className="text-xl font-bold pb-3">Monthly Progress</p>
                <div className="flex justify-between mb-1">
                  <p className="font-semibold">This Month</p>
                  <p className="font-semibold">${thisMonth}</p>
                </div>
                <div className="flex justify-between mb-1">
                  <p className="font-semibold">Target</p>
                  <p className="font-semibold">${thisMonthTarget.toFixed(2)}</p>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full mb-2">
                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${monthlyCompletion}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 text-right">
                  {monthlyCompletion}% of goal
                </p>
                <div className="flex justify-between mt-4">
                  <p className="font-semibold">Last Month</p>
                  <p className="font-semibold">${lastMonth}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Goals;
