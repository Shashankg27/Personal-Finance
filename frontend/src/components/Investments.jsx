import React, { useEffect, useState } from 'react';
import SideBar from './partials/SideBar';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import InvestmentCard from './partials/InvestmentCard';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Investments = () => {
const [user, setUser] = useState({});
const [investments, setInvestments] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [updatedInvestments, setUpdatedInvestments] = useState([]);

useEffect(() => {
    const token = getCookie('token');
    if (token) {
        const userData = jwtDecode(token);
        setUser(userData);

        axios.get(`${import.meta.env.VITE_BACKEND_API}/user/getInvestments`, {
            withCredentials: true
        })
        .then((res) => {
            setInvestments(res.data.investments);
        })
        .catch((err) => {
            console.error('Error fetching investments:', err);
        });
    }
}, []);

useEffect(() => {
        const filteredInvestments = selectedCategory
            ? investments.filter(inv => inv.category === selectedCategory)
            : investments;

        const updated = filteredInvestments.map((investment) => {
            const startDate = new Date(investment.date);
            const currentDate = new Date();
            const diffInYears = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
            const diffInMonths = diffInYears * 12;

            // ✅ Convert ROI to decimal before applying
            const roiDecimal = investment.ROI / 100;

            // Compounded annual returns (handles negative ROI properly)
            const currentValue = investment.principal * (Math.pow((1 + roiDecimal), diffInYears) || 1);

            const monthlyReturns = diffInMonths > 0
                ? (currentValue - investment.principal) / diffInMonths
                : 0;

            return {
                ...investment,
                current: parseFloat(currentValue.toFixed(2)),
                monthlyReturns: parseFloat(monthlyReturns.toFixed(2)),
                formattedDate: startDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };
        }).sort((a, b) => b.ROI - a.ROI);

        setUpdatedInvestments(updated);
    }, [selectedCategory, investments]);

    console.log("Sorted investments: ");
    console.log(updatedInvestments);

    let totalInvested = 0, currentValue = 0, totalReturns = 0, monthlyReturns = 0;
    updatedInvestments.forEach((investment) => {
        totalInvested += investment.principal;
        currentValue += investment.current;
        monthlyReturns += investment.monthlyReturns;
    });

    monthlyReturns = monthlyReturns.toFixed(2);
    currentValue = currentValue.toFixed(2);
    totalReturns = (currentValue - totalInvested).toFixed(2);
    const currentROI = ((totalReturns / totalInvested) * 100).toFixed(2);

    console.log("user:");
    console.log(user);
    console.log(user.investmentCategories);


    if (!user) return <div className="text-white p-4">Loading...</div>;

    return (
        <div className='flex'>
            <div>
                <SideBar />
            </div>
            <div className='flex-1 bg-[#111827]'>
                <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700 text-white">
                    <h3 className="text-2xl font-semibold">Investments & Savings</h3>
                    <div className="flex items-center gap-4">
                        <Link to='/investments/addInvestments' className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 !rounded-md !no-underline">
                            + Add Investment
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">{user.name}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
                    <div className="bg-[#1e293b] rounded-lg p-4">
                        <p className="text-xl text-white font-semibold flex items-center gap-8">
                            Total Invested <i className="fas fa-chart-line text-blue-400"/>
                        </p>
                        <p className="text-2xl text-blue-400 font-bold mt-1">
                            ${totalInvested}
                        </p>
                        <p className="text-sm text-gray-400">Principal Amount</p>
                    </div>

                    <div className="bg-[#1e293b] rounded-lg p-4">
                        <p className="text-xl text-white font-semibold flex items-center gap-8">
                            Current Values 
                            <i className="fa-solid fa-dollar-sign text-green-400" />
                        </p>
                        <p className={`text-2xl font-bold ${currentValue>totalInvested? "text-green-400": "text-red-400"} mt-1`}>
                            ${currentValue}
                        </p>
                        <p className="text-sm text-gray-400">Market Value</p>
                    </div>

                    <div className="bg-[#1e293b] rounded-lg p-4">
                        <p className="text-xl text-white font-semibold flex items-center gap-8">
                            Total Returns 
                            <i className="fas fa-spinner fa-spin text-2xl text-red-400"></i>
                        </p>
                        <p className={`text-2xl font-bold ${currentValue>totalInvested? "text-green-400": "text-red-400"} mt-1`}>
                            ${totalReturns}
                        </p>
                        <p className={`text-md font-semibold ${currentValue>totalInvested? "text-green-400": "text-red-400"}`}>{currentValue>totalInvested? "+" : "-"}{currentROI}%</p>
                    </div>

                    <div className="bg-[#1e293b] rounded-lg p-4">
                        <p className="text-xl text-white font-semibold flex items-center gap-8">
                            Monthly Returns
                            <i className="fa-solid fa-calendar text-purple-400" />
                        </p>
                        <p className="text-2xl font-bold text-purple-400 mt-1">
                            ${monthlyReturns}
                        </p>
                        <p className="text-sm text-gray-400">This month</p>
                    </div>
                </div>
                <div className='flex gap-4 p-3 w-full text-white'>
                    <div className='w-[78%] p-4 rounded-xl bg-[#1e293b] h-min'>
                        <div className='flex justify-between'>
                            <p className='text-xl font-semibold'>Investment portfolio</p>
                            <div className='bg-[#374151] h-min p-1.5 rounded-lg'>
                                <select name="category" id="category" onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value="" className='text-white bg-[#374151]'>Select Type</option>
                                    {user.investmentCategories && user.investmentCategories.map((category, index) => (
                                    <option key={index} value={category.name} className='text-white bg-[#374151]'>
                                        {category.name}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='border !border-gray-700 mb-4'></div>
                        <div className='flex p-1 flex-col gap-2'>
                            {updatedInvestments.map((investment, index) => (
                                <InvestmentCard investment={investment}/>
                            ))}
                        </div>
                    </div>
                    <div className='w-[28%] flex flex-col gap-3'>
                        <div className='bg-[#1e293b] rounded-lg p-4'>
                            <p className='font-semibold text-xl'>Top Performers</p>
                            <div className='flex flex-col gap-3'>
                                {updatedInvestments.slice(0, 3).map((investment, index) => (
                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='m-0 text-md font-semibold'>{investment.name}</p>
                                            <p className='m-0 text-sm text-gray-400'>{investment.note.slice(0, 6) + (investment.note.length>5?'...':'')}</p>
                                        </div>
                                        <div>
                                            <p className={`m-0 ${investment.ROI>0?'text-green-400':'text-red-400'} font-bold`}>{(investment.ROI>0?'+':'') + investment.ROI}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='bg-[#1e293b] rounded-lg p-4 flex flex-col gap-2'>
                            <p className='font-semibold text-xl'>Quick Actions</p>
                            <Link to='/investments/addInvestments' className='py-1.5 px-3 w-full bg-[#374151] rounded-lg text-white !no-underline'><span className='text-green-400 text-xl'>+</span> Add New Investment</Link>
                            <Link to='/categories/addCategory' className='py-1.5 px-3 w-full bg-[#374151] rounded-lg text-white !no-underline' state={{ value: "investmentCategories" }}><span className='text-green-400 text-xl'>+</span> Add New Investment Category</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investments;
