import React, { useState } from 'react'
import Table from '../../Components/Table/Table'
import employeesData from './../Department/rows';
import Initials from '../../Components/Initials/Initials';
import { leaveData } from './leaves';
import Search from '../../Components/Search/Search';

export default function RequestManagement() {
    const [filter,setFilter]=useState('All')
    const [leaveRequest,setLeaveRequest]=useState(leaveData)
    function statusManagement(id,status){
        setLeaveRequest(prev=>
            prev.map(item=>item.leaveId===id?
            {...item,status:status}:item    
            )
        )
    }


    
    const columns=[
        {header:"Employee Name",accessorKey:"employeeName",cell:info=>(
              <div className='flex gap-2 items-center' >
                        <Initials name={info.getValue()}/>
                        <span>{info.getValue()}</span>
                      </div>

        )},
        {header:"Employee ID",accessorKey:"employeeID"},
        
        {header:"Type",accessorKey:"type"},
        {header:"From",accessorKey:"fromDate"},
        {header:"To",accessorKey:"toDate"},
        {header:"Status",accessorKey:"status" ,cell:info=>{

            const row=info.row.original
            return row.status==='Pending'?<div className='flex  gap-1'>
                <button  onClick={()=>statusManagement(row.leaveId,'Rejected')} className='bg-red-500 text-white  rounded-lg w-22'>Reject</button>
                <button onClick={()=>statusManagement(row.leaveId,'Approved')}  className='bg-green text-white p rounded-lg w-22 '>Accept</button>
            </div>:<p className={row.status==='Approved'?'text-green-600':'text-red-500'}>{row.status}</p>
        }},
    ]
    const filteredLeaveRequest=leaveRequest.filter(row=>
        filter==='All'?true:row.status===filter
    )

  return (
    <>
    <div className='flex justify-between'>
        <Search/>
        <div className='flex items-center'>
            <i className='fa-solid fa-filter text-green'></i>
            <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
            
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
        </select>
        </div>
         </div>
    <div className='mx-auto w-[90%]'>
        <Table column={columns} rows={filteredLeaveRequest}/>
    </div>
    
    
    </>
  )
}
