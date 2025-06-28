import React from 'react'

const CategoryCard = ({ category }) => {
    const percentage = (category?.current || 0)/category.budget;
    const rem = category.budget - (category?.current || 0);
  return (
    <div className={`flex flex-col gap-0 m-0 border border-0.75 rounded-xl ${category.type === 'expenseCategories'? "bg-[#322732] !border-red-400":"bg-[#1d3235] !border-green-400"} p-4`}>
        <div className='m-0 flex justify-between'>
            <div className='m-0 p-2'>
                <p className='m-0 font-bold'>{category.name}</p>
                <p className='m-0 font-semibold text-md text-gray-400'>{category.note}</p>
                <p className={`m-0 font-semibold text-sm text-${category.type === 'expenseCategories'? "red-400":"green-400"}`}>{category.type === 'expenseCategories'? "Budget":"Monthly Budget"}: {category.budget}</p>
            </div>
            <div className='m-0'>
                <p className={`m-0 font-semibold text-lg text-${category.type === 'expenseCategories'? "red-400":"green-400"}`}>{category?.current || '$0'}</p>
                <p className='m-0 font-semibold text-md text-gray-400'>This month</p>
                <div className='flex gap-3 p-2'>
                    <i className="fa-solid fa-pen-to-square" style={{color: '#1f9eff'}}></i>
                    <i className="fa-solid fa-trash" style={{color: '#d10000'}}></i>
                </div>
            </div>
        </div>
        <div className='m-0'>
            <div className='m-0 border-3 rounded border-gray-500'></div>
        </div>
        <div className='m-0 flex justify-between font-semibold text-gray-400'>
            <p className='m-0 !text-md'>{percentage}% of budget</p>
            <p className='m-0 !text-md'>${rem} remaining</p>
        </div>
    </div>
  )
}

export default CategoryCard
