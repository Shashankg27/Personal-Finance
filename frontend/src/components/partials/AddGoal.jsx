import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const AddGoal = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const userData = jwtDecode(token);
      setUser(userData);
    }
  }, []);
  console.log(user);
  const [goalData, setGoalData] = useState({
    name: "",
    note: "",
    creationDate: Date.now,
    targetDate: Date.now,
    amount: 0,
    userId: user._id,
    complete: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(goalData.name ===""){
        alert("Name should not be empty!")
        return;
    }
    if(goalData.note ===""){
        alert("Note should not be empty!")
        return;
    }
    if(goalData.amount <=0){
        alert("Amount should be positive!")
        return;
    }    
    if(goalData.targetDate<= Date.now()){
        alert("Select a future Date")
        return;
    }
    goalData.userId = user._id
    try{
        console.log("goal data;",goalData)
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/addGoal`,
            {goalData:{...goalData}},
            {withCredentials: true}
        );
        if(response.data.success){
            navigate('/goals')
        }
        else{
            alert("Failed to add Goal. Try again!")
        }
    }
    catch(error){
        alert("FAILED!")
        console.log("add Goal error"+ error);

    }    

  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
        <div className="bg-[#1e293b] p-8 rounded-2xl w-full max-w-md shadow-lg ">
          <div className="flex gap-2 items-center justify-center">
            <i className="fas fa-wallet fa-2xl text-blue-500"></i>
            <h2 className="text-white text-2xl font-semibold text-center mb-2">
              FinanceBuddy
            </h2>
          </div>

          <p className="text-gray-300 text-center mb-6">Add a New Goal</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Goal Name */}
            <div>
              <label className="block text-gray-300 mb-1">Goal Name</label>
              <input
                type="text"
                name="GoalName"
                value={goalData.name}
                onChange={(e) =>
                  setGoalData({ ...goalData, name: e.target.value })
                }
                placeholder="Enter Goal name"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-300 mb-1">Note</label>
              <input
                type="text"
                name="note"
                value={goalData.note}
                onChange={(e) =>
                  setGoalData({ ...goalData, note: e.target.value })
                }
                placeholder="Add a note"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-300 mb-1">Amount</label>
              <input
                type="number"
                name="Amount"
                value={goalData.amount}
                onChange={(e) =>
                  setGoalData({
                    ...goalData,
                    amount: e.target.value,
                  })
                }
                placeholder="Enter amount"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Creation Date</label>
              <input
                type="date"
                name="Creation Date"
                value={goalData.creationDate}
                onChange={(e) =>
                  setGoalData({ ...goalData, creationDate: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Target Date</label>
              <input
                type="date"
                name="Target Date"
                value={goalData.targetDate}
                onChange={(e) =>
                  setGoalData({ ...goalData, targetDate: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                className="w-1/2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => navigate('/goals')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGoal;
