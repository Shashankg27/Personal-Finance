import React from 'react'

const PlanCard = ( {type, price, features, cta} ) => {
  return (
    <div className='bg-[#374151] rounded-xl flex flex-col gap-2 p-7'>
        <p>{type}</p>
        <div className='flex'>
            <p>{price}</p>
            <p>{(typeof price === 'number') && "/month"}</p>
        </div>
    </div>
  )
}

export default PlanCard
