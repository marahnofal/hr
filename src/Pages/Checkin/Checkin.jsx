import React, { useState } from 'react'
import { useLive } from '../../hooks/useLive.js'
import { logo } from '../../assets/data';

export default function Checkin() {
    
    let{time,date}=useLive()
    const [checked,setCheck]=useState('')
    const [checkIn, setCheckIn] = useState({
  time: null,
  date: null,
  timeStamp:null,
  
  
});
    const [checkOut, setCheckOut] = useState({
  time: null,
  date: null,
  timeStamp:null
  
});
let checkinEvent=()=>{
  if (checkIn.date===date) return
    const newCheckin={
        time:time,
        date:date,
        timeStamp:Date.now()
        
        
    }
    setCheckIn(newCheckin)
    setCheck('checked In')
    
    
}
let checkoutEvent=()=>{
  if (!checkIn.timeStamp) return
  if (checkOut.date===date) return
    const newCheckout={
        time:time,
        date:date,
        timeStamp:Date.now()
        
    }
    setCheckOut(newCheckout)
    setCheck('checked out')
    

    
}
function duration(){
  if(!checkIn.timeStamp||!checkOut.timeStamp)return'--'
  let  d=checkOut.timeStamp-checkIn.timeStamp
    
    const hours = Math.floor(d / (1000 * 60 * 60))
    const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((d % (1000 * 60)) / 1000)

    return  `${hours}h ${minutes}m ${seconds}s`

}

  return (
    <>
    <div className=' flex justify-center items-center  h-screen '>
      
      <div className='text-center flex flex-col gap-5 p-12 rounded-2xl shadow-2xl items-center'>
        <img src={logo} className='w-24' alt="" />
        
        <p className='text-4xl font-light'>Welcome john</p>
        <h1 className="text-7xl font-bold">{time}</h1>
        <p className=' text-gray-400'><i className="fa-regular fa-calendar text-green"></i>{date}</p>
        
        <h1 className='font-bold'>{checked?checked:'--'}</h1>
        <p className='text-2xl'>checked In Time: {checkIn.time}</p>
        <p className='text-2xl'> checked Out Time: {checkOut.time}</p>
        <p className='text-2xl'>Duration: {checkIn.timeStamp&&checkOut.timeStamp&&duration()}</p>
    <div className='flex justify-around  w-[300px]'>
          <button onClick={checkinEvent} className='text-white bg-green rounded-xl p-3 '>Checkin</button>
        <button className='text-white bg-green rounded-xl p-3 ' onClick={checkoutEvent}>Check out</button>
    </div>


    </div>
    </div>


    </>
  )
}
