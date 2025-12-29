import React from 'react'
import {users2} from '../../assets/data' 
export default function CardState({image,title,records,percentage}) {
  return (
    <>
    <div className=' p-5 flex flex-col border-2 border-gray-200 rounded-lg justify-between me-5 '>
        <div className='flex gap-4'>
            <div className='w-5 h-5 '><img src={image} className='w-full' alt="" /></div>
            <h2>{title}</h2>
        </div>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-bold'>{records}</h2>
            <div className='flex justify-center items-center secondary-bg'>
                <i className='fa-solid fa-caret-up icon-color text-lg'></i>
                <p className='text-green'> {percentage}</p>
            </div>
            

        </div>
        <hr className='text-gray-200 w-full'/>
        <p className='text-gray-300 text-xs'>Upadate:July 16, 2025</p>




    </div>
    
    </>
  )
}
