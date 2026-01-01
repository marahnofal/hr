import React from 'react'
import CardState from './../../Components/CardState/CardState';
import users2 from '../../assets/users2.png'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Calender from '../../Components/Calender/Calender';
import AttendanceChart from '../../Components/AttendanceChart/AtendanceChart';
import { data,monthlyData,tasks } from '../../assets/data';
import Table from '../../Components/Table/Table';

import attendanceData from './rows';
import Search from '../../Components/Search/Search';







export default function Admin() {
   const columns=[
      {header:'Name', accessorKey:'name',cell:info=>(
        <div className="flex items-center gap-2">
        <img
          src={info.row.original.image}   
          alt={info.getValue()}
          className="w-[36px] h-[36px] rounded-full"
        />
        <span>{info.getValue()}</span>   
      </div>
      ) },
      {header:'Designation', accessorKey:'designation'},
      {header:'Type', accessorKey:'type'},
      {header:'Check In Time', accessorKey:'checkIn'},
      {header:'Status', accessorKey:'status',cell:info=>(
           <span
        className={`px-2 py-1 rounded-full text-xs font-medium
          ${info.getValue() === 'Late'
            ? 'bg-red-100 text-red-500'
            : 'bg-green-100 text-green-500'
          }`}
      >
        {info.getValue()}
      </span>
      )}
      
      
      
    ]

  return (
    
    <>
    
    <div className='grid grid-cols-3 w-full  '>
      
  
    <div className='grid grid-cols-1 w-full gap-2 md:grid-cols-2 col-span-3 md:col-span-2  ms-5 '>
      <div className='col-span-2 md:col-span-1'><CardState image={users2} title={'Total Employee'} records={560} percentage={12}/></div>
      <div className='col-span-2 md:col-span-1'><CardState image={users2} title={'Total Employee'} records={560} percentage={12}/></div>
      <div className='col-span-2 md:col-span-1'><CardState image={users2} title={'Total Employee'} records={560} percentage={12}/></div>
      <div className='col-span-2 md:col-span-1'><CardState image={users2} title={'Total Employee'} records={560} percentage={12}/></div>
     
        <div className='md:col-span-2 col-span-3 '>
          <AttendanceChart data={data} monthlyData={monthlyData}  />
          <Table column={columns} rows={attendanceData} />
          
        </div>
       
    </div>  
    <div className='md:col-span-1 col-span-3'>
      <Calender tasks={tasks}/>
      

    </div>
   
     
</div>
    

    
        
    
    </>
  )
}
