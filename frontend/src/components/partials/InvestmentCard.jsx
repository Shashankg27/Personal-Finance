import axios from 'axios';
import React from 'react'

const InvestmentCard = ({ investment }) => {
    const handleDelete = async (e) => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/user/deleteInvestment`, {
                data:{ investment},
                withCredentials: true
            });
            if(response.data.success){
                window.location.reload();
            }
            else{
                alert(response.data.message || "Cannot delete investment");
            }
        }
        catch(err){
            console.log("Investment delete error: " + err);
            alert("Cannot delete investment");
        }
    };
    console.log(investment);
  return (
    <div className='bg-[#2b3544] p-3 rounded-lg m-0 flex justify-between'>
      <div className='m-0'>
        <p className='m-0 text-lg font-semibold'>{investment.name}</p>
        <p className='m-0 text-md text-gray-300 font-stretch-75%'>{investment.note}</p>
        <p className='m-0 text-sm text-gray-400'>Purchased: {investment.formattedDate}</p>
      </div>
      <div className='m-0 flex gap-4 items-center justify-center'>
        <div>
            <p className='m-0 text-md text-gray-400 font-semibold'>Principal</p>
            <p className='m-0 text-lg font-semibold'>${investment.principal}</p>
        </div>
        <div>
            <p className='m-0 text-md text-gray-400 font-semibold'>Current</p>
            <p className={`m-0 text-lg font-semibold ${investment.ROI<0?"text-red-400":"text-green-400"}`}>${investment.current}</p>
        </div>
        <div>
            <p className='m-0 text-md text-gray-400 font-semibold'>ROI</p>
            <p className={`m-0 text-lg font-semibold ${investment.ROI<0?"text-red-400":"text-green-400"}`}>{investment.ROI}%</p>
        </div>
        <div className='flex gap-3 items-center justify-center'>
            <i className="fa-solid fa-pen-to-square" style={{color: '#1f9eff'}}></i>
            <i className="fa-solid fa-trash" onClick={handleDelete} style={{color: '#d10000'}}></i>
        </div>
      </div>
    </div>
  )
}

export default InvestmentCard
