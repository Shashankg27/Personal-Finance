import React from 'react'

const Cards = ({title,discription}) => {
  return (
    <div className='bg-[#374151] rounded flex flex-col gap-2 p-7 w-full'>
      <p className='font-bold text-xl'>{title}</p>
      <p className='font-semibold text-[#d1d5db] w-[90%]'>{discription}</p>
    </div>
  )
}

export default Cards
