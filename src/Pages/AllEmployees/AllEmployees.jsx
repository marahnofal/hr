import React, { useState } from 'react'
import Table from './../../Components/Table/Table';
import employeesData from './employeesData';
import { Link } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import Initials from '../../Components/Initials/Initials';

export default function AllEmployees() {
    const columns=[
        {header:'Name',accessorKey:'name',cell:info=>(
          <div className='flex gap-2 items-center' >
            <Initials name={info.getValue()}/>
            <span>{info.getValue()}</span>
          </div>
        )},
        {header:'Emplyee ID',accessorKey:'employeeId'},
        {header:'Designation',accessorKey:'designation'},
        {header:'Department',accessorKey:'department'},
        
        {header:'Type',accessorKey:'type'},
        {header:'Status',accessorKey:'status'},
        {header:'Action',accessorKey:'action'},
    ]
    const [search,setSearch]=useState('')
    const filteredData=employeesData.filter(emp=>{
      return emp.name.toLowerCase().includes(search.toLowerCase())
    })

  return (
    <>
    <div className="flex justify-between pe-5  w-full">
      <form className="md:max-w-md ">   
    <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <i class="fa-solid fa-magnifying-glass"></i>

        </div>
<Search search={search} setSearch={setSearch}  />
        
    </div>
</form>
<button className='text-white bg-green rounded-xl p-3 '><Link to='/allemployees/addemployee'>Add New Employee</Link></button>

    </div>


    <Table column={columns} rows={filteredData}/>

    
    </>
  )
}
