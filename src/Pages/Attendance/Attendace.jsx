import React, { useState } from 'react'
import attendanceData from './rows'
import Table from '../../Components/Table/Table'
import Search from '../../Components/Search/Search'

export default function Attendace() {
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
      ),
    },
    {header:'date' ,accessorKey:'date'}
      
      
    ]
        const [search,setSearch]=useState('')
    const filteredData=attendanceData.filter(emp=>{
      return emp.name.toLowerCase().includes(search.toLowerCase())
    })
  return (
    <>
    <Search search={search} setSearch={setSearch}/>
    <Table column={columns} rows={filteredData} />
    
    
    </>
  )
}
