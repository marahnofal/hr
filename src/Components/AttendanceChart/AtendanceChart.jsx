import React, { useState } from 'react'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function AttendanceChart({data,monthlyData}) {
    const [range,setRange]=useState('week')
   
  return (
    <>
    <div className='flex w-full justify-between'>
        <h2>Attendance Overview</h2>
        <select name="border rounded px-3 yy-1 appearance-none focus:ring-green-100" onChange={(e)=>setRange(e.target.value)}>
            <option value='week'>This Week</option>
            <option class value='month'>This Month</option>
        </select>
    </div>
      <BarChart
      style={{ width: '100%', maxHeight: '60vh', aspectRatio: 1.618 }}
      responsive
      data={range==='week'?data:monthlyData}
       
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis  />
      <Tooltip />
      <Legend />
      <Bar dataKey="present" stackId="a" fill="#89C43D" background barSize={15} radius={[10,10,10,10]} />
      <Bar dataKey="late" stackId="a" fill="#FEB85B" background barSize={25} radius={[10,10,10,10]} />
      <Bar dataKey="absent" stackId="a" fill="#F45B69" background barSize={25} radius={[10,10,10,10]} />
    </BarChart>
    </>
  );
};
