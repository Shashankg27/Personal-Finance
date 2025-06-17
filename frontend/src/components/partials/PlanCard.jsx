import React from 'react'

const PlanCard = ( {type, price, features, cta, mp} ) => {
  return (
    <div className='relative'>
        {mp && <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-[#facc15] text-black text-sm font-semibold px-4 py-1 rounded-full shadow-md z-10'>
            Most Popular
        </div>}
        <div className={`bg-[${mp?"#2563eb":"#374151"}] rounded-xl flex flex-col p-8 h-full`}>
            <div className="flex-1 flex flex-col gap-2">
                <p className={`font-bold text-white opacity-${mp?100:90} text-2xl`}>{type}</p>
                <div className='flex items-end'>
                    <p className='font-bold text-4xl'>{price}</p>
                    <p className='text-xl'>{(typeof price === 'number') && "/month"}</p>
                </div>
                <div className='flex flex-col'>
                    {features.map((feature, index) => (
                        <div className='flex gap-3 items-start'>
                            <i className="fa-solid fa-check pt-1.5" style={{ color: mp?"#ffffff":"#4ade80" }} />
                            <p className=''>{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className={`mt-2 !rounded-lg py-2.75 !text-lg font-semibold ${mp ? "bg-white text-[#2563eb]" : "bg-[#4b5563] text-white"}`}>{cta}</button>
        </div>
    </div>
  )
}

export default PlanCard