import axios from 'axios';
import React from 'react'

const LoanCard = ({ loan }) => {
    const date = new Date(loan.startDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const loanYear = Math.floor(loan.timePeriod/12);
    const loanMonth = loan.timePeriod - loanYear*12;

    const paidPer = ((loan.principal - loan.remAmount)/loan.principal) *100;

    const day = date.getDate();
    const now = new Date();
    const currMonth = now.getMonth();
    const currYear = now.getFullYear();
    const nextDue = new Date(currYear, currMonth, day);

    const handleDelete = async (e) => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/user/deleteLoan`, {
                data: {loan},
                withCredentials: true
            });
            if(response.data.success){
                window.location.reload();
            }
            else{
                alert(response.data.message || "Cannot delete loan!");
            }
        }
        catch(err){
            console.log("Loan delete error: " + err);
            alert("Cannot delete loan!");
        }
    }
  return (
    <div className='bg-[#2b3544] p-3 rounded-lg m-0 flex flex-col gap-2'>
        <div className='flex justify-between'>
            <div>
                <p className='text-lg font-semibold'>{loan.name}</p>
                <p className='text-md text-gray-300 font-semibold'>{loan.from}</p>
                <p className='text-sm text-gray-400'>Started: {month} {year} &bull; {loanYear} years {loanMonth} months</p>
            </div>
            <div className='m-0 flex gap-4 items-center justify-center'>
                <div>
                    <p className='m-0 text-md text-gray-400 font-semibold'>Principal</p>
                    <p className='m-0 text-lg font-semibold'>${loan.principal}</p>
                </div>
                <div>
                    <p className='m-0 text-md text-gray-400 font-semibold'>Outstanding</p>
                    <p className={`m-0 text-lg font-semibold text-red-400`}>${loan.remAmount}</p>
                </div>
                <div>
                    <p className='m-0 text-md text-gray-400 font-semibold'>ROI</p>
                    <p className={`m-0 text-lg font-semibold `}>{loan.ROI}%</p>
                </div>
                <div className='flex gap-3 items-center justify-center'>
                    <i className="fa-solid fa-trash" onClick={handleDelete} style={{color: '#d10000'}}></i>
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <p className='font-semibold'>Progress</p>
                <p className='font-semibold'>{paidPer.toFixed(2)}% paid</p>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                <div
                className={`h-full rounded-full bg-[#fb923c]`}
                style={{ width: `${paidPer}%` }}
                ></div>
            </div>
            <div className='flex justify-between'>
                <p className='text-gray-400'>Monthly: ${loan.nextEMIAmount}</p>
                <p className='text-gray-400'>Next Due: {nextDue.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
        </div>
    </div>
  )
}

export default LoanCard
