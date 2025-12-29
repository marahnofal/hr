import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Admin from '../Admin/Admin'
import AllEmployees from '../AllEmployees/AllEmployees'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <>
   <div className='h-full flex w-full lg:gap-9  '>
    <aside className='w-60'>
        <Sidebar/>
    </aside>
    <div className='flex flex-col w-full'>
        <Navbar/>
        <Outlet/>
        
        


    </div>
   </div>
    

    </>
  )
}
