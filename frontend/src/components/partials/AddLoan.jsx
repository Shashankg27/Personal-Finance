import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const AddLoan = () => {
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
  const [goalData, setGoalData] = useState({});
  const [loanData, setLoanData] = useState({
    name: "",
    from: "",
    startDate: Date.now,
    timePeriod: [0, 0],
    principal: 0,
    userId: user._id,
    ROI: 0,
    complete: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(loanData.name ===""){
        alert("Name should not be empty!")
        return;
    }
    if(loanData.from ===""){
        alert("Source should be mentioned!")
        return;
    }
    if(loanData.timePeriod <= 0){
        alert("Mention a valid time period!");
        return;
    }
    if(loanData.principal <=0){
        alert("Amount should be positive!")
        return;
    }    
    if(loanData.ROI < 0){
        alert("Invalid rate of interest!");
        return;
    }

    loanData.timePeriod = parseInt(loanData.timePeriod[0]) * 12 + parseInt(loanData.timePeriod[1]);

    loanData.userId = user._id;
    // console.log(loanData);
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/addLoan`,
            { loanData: { ...loanData } },
            { withCredentials: true }
        );
        if(response.data.success){
            navigate('/loans')
        }
        else{
            alert("Failed to add Loan. Try again!")
        }
    }
    catch(error){
        alert("FAILED!")
        console.log("Add Loan error"+ error);
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

          <p className="text-gray-300 text-center mb-6">Add a New Loan</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Goal Name */}
            <div>
              <label className="block text-gray-300 mb-1">Loan Name</label>
              <input
                type="text"
                name="LoanName"
                value={loanData.name}
                onChange={(e) =>
                  setLoanData({ ...loanData, name: e.target.value })
                }
                placeholder="Enter Loan name"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-300 mb-1">Source</label>
              <input
                type="text"
                name="from"
                value={loanData.from}
                onChange={(e) =>
                  setLoanData({ ...loanData, from: e.target.value })
                }
                placeholder="Name of loan provider"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-300 mb-1">Principal</label>
              <input
                type="number"
                name="principal"
                value={loanData.principal}
                onChange={(e) =>
                  setLoanData({
                    ...loanData,
                    principal: e.target.value,
                  })
                }
                placeholder="Enter amount"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">ROI</label>
              <input
                type="number"
                name="roi"
                value={loanData.ROI}
                onChange={(e) =>
                  setLoanData({
                    ...loanData,
                    ROI: e.target.value,
                  })
                }
                placeholder="Enter the rate of interest"
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Start Date</label>
              <input
                type="date"
                name="StartDate"
                value={loanData.startDate}
                onChange={(e) =>
                  setLoanData({ ...loanData, startDate: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-gray-300">Time Period</p>
            <div className="flex gap-2">
                <div>
                <label className="block text-gray-300 mb-1">Years</label>
                <input
                    type="number"
                    name="years"
                    value={loanData.timePeriod[0]}
                    onChange={(e) =>
                    setLoanData({
                        ...loanData,
                        timePeriod: [e.target.value, loanData.timePeriod[1]],
                    })
                    }
                    placeholder="Enter the rate of interest"
                    className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div>
                <label className="block text-gray-300 mb-1">Months</label>
                <input
                    type="number"
                    name="month"
                    value={loanData.timePeriod[1]}
                    onChange={(e) =>
                    setLoanData({
                        ...loanData,
                        timePeriod: [loanData.timePeriod[0], e.target.value],
                    })
                    }
                    placeholder="Enter the rate of interest"
                    className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
            >
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLoan;