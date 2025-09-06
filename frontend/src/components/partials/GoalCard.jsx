import axios from "axios";
import React from "react";

const GoalCard = ({ goal }) => {
  const percentage = (
    ((goal?.done || 0) / goal.amount) *
    100
  ).toFixed(1);
  const remaining = goal.amount - (goal?.done || 0);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/user/deleteGoal`,
        {
          data: { goal },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        window.location.reload();
      } else {
        alert(response.data.message || "Cannot delete goal");
      }
    } catch (err) {
      console.error("Error deleting goal:", err);
      alert("Server side issue!");
    }
  };

  const formattedDate = new Date(goal.targetDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-0 m-0 border border-0.75 rounded-xl bg-[#1d3235] !border-green-400 p-4">
      <div className="m-0 flex justify-between">
        <div className="m-0 p-2">
          <p className="m-0 font-bold">{goal.name}</p>
          <p className="m-0font-semibold text-md text-gray-400">{goal.note}</p>
          <p className="m-0 font-semibold text-sm text-blue-400">
            Target Date: {formattedDate}
          </p>
        </div>
        <div className="m-0">
          <p className="m-0 font-semibold text-lg text-blue-400">
            ${goal?.done || 0}
          </p>
          <p className="m-0 font-semibold text-md text-gray-400">of ${goal.amount}</p>
          <div className="flex gap-3 p-2">
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "#1f9eff" }}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={handleDelete}
              style={{ color: "#d10000" }}
            ></i>
          </div>
        </div>
      </div>
      <div className="m-0">
        <div className="w-full h-2 bg-gray-600 rounded-full">
          <div
            className="h-full bg-blue-400 rounded-full"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
      <div className="m-0 flex justify-between font-semibold text-gray-400">
        <p className="m-0 !text-md">{percentage}% complete</p>
        <p className="m-0 !text-md">${remaining} remaining</p>
      </div>
    </div>
  );
};

export default GoalCard;
