import React, { useEffect, useState } from 'react'
import SideBar from './partials/SideBar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoanCard from './partials/LoanCard';
import Logout from './partials/Logout';

const Loan = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
    const [user, setUser] = useState({});
    const [loans, setLoans] = useState([]);
    const [transactions, setTransactions] = useState([]);
    let totalLoan = 0;
    let paid = 0;
    let outstanding = 0;
    let monthly = 0.00;
  
    useEffect(() => {
      const token = getCookie("token");
      if (token) {
        const userData = jwtDecode(token);
        setUser(userData);
      }
            axios
              .get(`${import.meta.env.VITE_BACKEND_API}/user/getLoans`, {
                withCredentials: true,
              })
              .then((res) => {
                setLoans(res.data.userLoans.map(loan => ({ ...loan, lastPaid: -1 })).sort((a, b) => new Date(a.startDate).getDate() - new Date(b.startDate).getDate()));
              })
              .catch((error) => {
                console.log("Error fetching Loans! ", error);
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
    }, []);
    
    loans.map((loan, index) => {
      loans[index] = { ...loan, remAmount: loan.principal, remMonths: loan.timePeriod };
    })
    console.log("lsodas: ");
    console.log(loans);
    transactions.map((transaction) => {
      if(transaction.type === 'loan'){
        const idx = loans.findIndex(loan => loan.name === transaction.category);
        if(idx !== -1) loans[idx] = { ...loans[idx], remAmount: loans[idx].remAmount-transaction.amount, lastPaid: loans[idx].lastPaid===-1?transaction.date: new Date(Math.max(loans[idx].lastPaid, transaction.date)) };
      }
    });
    
loans.map((loan, index) => {
  let remMonths = loan.timePeriod;

  if (!loan.completed) {
    if (loan.lastPaid !== -1) {
      const paidDate = new Date(loan.lastPaid);
      const startDate = new Date(loan.startDate);
      const totalMonthsPassed =
        (paidDate.getFullYear() - startDate.getFullYear()) * 12 +
        (paidDate.getMonth() - startDate.getMonth());
      remMonths = loan.timePeriod - totalMonthsPassed;
    }

    // Monthly interest rate
    const r = loan.ROI / 12 / 100;
    const P = loan.remAmount;
    const n = remMonths;

    // EMI formula
    let emi = 0;
    if (r !== 0 && n > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0) {
      emi = P / n;
    }

    emi = parseFloat(emi.toFixed(2));

    loans[index] = {
      ...loan,
      remMonths: n,
      nextEMIAmount: emi,
    };
  }
  
  totalLoan += loan.principal;
  paid += loan.principal - loan.remAmount;
  outstanding += loan.remAmount;
  monthly += (loans[index].nextEMIAmount || 0);
});


    // loans.forEach((loan, index) => {
    //   let nextEMIAmount = 0;

    //   if(!loan.completed && loan.remMonths > 0){
    //     const P = loan.remAmount;
    //     const R = loan.ROI/12/100;
    //     const N = loan.remMonths;

    //     nextEMIAmount = (P*R*Math.pow(1+R, N))/(Math.pow(1+R, N)-1);
    //   }

    //   loans[index].nextEMIAmount = Number(nextEMIAmount.toFixed(2));
    // });


    monthly = monthly.toFixed(2);
    console.log("Loans: ");
    console.log(loans);

  return (
    <div className="flex">
      <div>
        <SideBar focus="Loans" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] h-full text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Loans</h3>
            <div className="flex items-center gap-4">
              <Link to='addLoan' className="bg-[#ea580c] hover:bg-blue-600 text-white px-4 py-2 !rounded-md !no-underline">
                <i className="fas fa-plus p-1" />
                Add loan
              </Link>
              <div className="flex items-center gap-2">
                <Logout />
              </div>
            </div>
          </div>

          {/* Cards section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
            <div className="bg-[#1e293b] rounded-lg p-6 flex flex-col justify-between">
              <h4 className="text-xl text-white font-semibold flex items-center justify-between">
                Total Borrowed
                <i className="fas fa-hand-holding-dollar" style={{ color: "#fb923c" }} />
              </h4>
              <div className='flex flex-col gap-2'>
                <p className="text-4xl font-bold text-[#fb923c] mt-3">${totalLoan}</p>
                <p className="text-sm text-gray-400">Principal Amount</p>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6 flex flex-col justify-between">
              <h4 className="text-xl text-white font-semibold flex items-center justify-between">
                Outstanding
                <i className="fas fa-triangle-exclamation" style={{ color: "#f87171", fontSize: 20 }}/>

              </h4>
              <div className='flex flex-col gap-2'>
                <p className="text-4xl font-bold text-[#f87171] mt-3">${outstanding}</p>
                <p className="text-sm text-gray-400">Remaining Balance</p>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6 flex flex-col justify-between">
              <h4 className="text-xl text-white font-semibold flex justify-between items-center">
                Total Paid
                <i className="fas fa-circle-check" style={{ color: "#4ade80", fontSize: 20 }}></i>

              </h4>
              <div className='flex flex-col gap-1'>
                <p className="text-4xl font-bold text-[#4ade80] mt-4">${paid}</p>
                <p className="text-sm text-gray-400">Payments Made</p>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6 flex flex-col justify-between">
              <h4 className="text-xl text-white font-semibold flex items-center justify-between">
                Monthly Payment
                <i className="fas fa-calendar" style={{ color: "#60a5fa", fontSize: 20 }}></i>

              </h4>
              <div className='flex flex-col gap-1'>
                <p className="text-4xl font-bold text-[#60a5fa] mt-3">${monthly}</p>
                <p className="text-sm text-gray-400">Montly Payment</p>
              </div>
            </div>
          </div>
          <div className='p-3 flex gap-4'>
            <div className='bg-[#1f2937] p-3 rounded-lg w-[66%] flex flex-col gap-2'>
              <p className='text-xl font-bold'>Active Loans</p>
              <div className='border !border-gray-700'></div>
              <div className='flex flex-col gap-2'>
                {
                  loans && loans.map(loan => (
                    <LoanCard loan={loan}/>
                  ))
                }
              </div>
            </div>
            <div className='flex flex-col gap-3 w-[34%]'>
                <div className='bg-[#1f2937] p-3 rounded-lg flex gap-3 flex-col'>
                  <p className='text-xl font-bold'>Payment Schedule</p>
                  <div className='flex flex-col gap-2'>
                    {
                      loans && loans.map((loan, index) => {
                        if(!loan.complete){
                          return (
                            <div className='border !border-red-500 rounded-lg p-2 bg-[#322732] flex justify-between items-center'>
                              <div>
                                <p className='text-md font-semibold'>{loan.name}</p>
                                <p className='text-sm text-gray-400'>Due in {(new Date().getDate() - new Date(loan.startDate).getDate())} days</p>
                              </div>
                              <div>
                                <p className='font-bold text-xl text-red-400'>${loan.nextEMIAmount}</p>
                              </div>
                            </div>
                          );
                        }
                        else return null;
                      })
                    }
                  </div>
                </div>
                <div className='bg-[#1f2937] p-3 rounded-lg'>
                  <div className='flex flex-col gap-2.5'>
                    <p className='text-xl font-bold'>Quick Actions</p>
                    <Link to='addLoan' className='py-1 px-3 w-full bg-[#374151] rounded-lg text-white !no-underline'><span className='text-[#fb923c] text-xl'>+</span> Add New Loan</Link>
                    <Link to='/transactions/addTransaction' className='py-1 px-3 w-full bg-[#374151] rounded-lg text-white !no-underline'><i className="fa-solid fa-credit-card" style={{color: '#4ade80'}}></i> Make Payment</Link>
                    <Link to='/reports' className='py-1 px-3 w-full bg-[#374151] rounded-lg text-white !no-underline'><i className="fa-solid fa-file-pdf" style={{color: '#c084fc'}}></i> Export Report</Link>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loan
