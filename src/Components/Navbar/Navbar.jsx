import React from 'react'

import profileImage from '../../assets/pp.png'
import { useLocation } from 'react-router-dom'
export default function Navbar() {
  
  const nav_content={
    '/':{
      header:'Welcome Robert 👋🏻',
      title:'Good Morning'
    },
    '/allemployees':{
      header:'All Employee',
      title:'All Emloyee Information'

    },
    '/attendance':{
      header:'Attendance',
      title:'All Emloyees Attendance'

    },
    '/checkin':{
      header:'Daily Check in / Check out',
      title:'Mark your Attendance'

    },
    '/requestmanagement':{
      header:'Leave Requests',
      title:'Leave Requests Management '

    }

  }
  const {pathname}=useLocation()
  const page=nav_content[pathname]||{header:'page', title:''}
  return (
    <>
    
    <nav className='w-full h-25  p-[30px] flex align-center justify-between rounded-lg mx-auto'>
      <div className='md:flex md:flex-col justify-center hidden '>
        <h2 className='font-bold text-xl'>{page.header}</h2>
        <p>{page.title}</p>
      </div>
      
<div className='flex justify-center items-center gap-5'>
  <form className="md:max-w-md mx-auto w-full ">   
    <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <i className="fa-solid fa-magnifying-glass"></i>

        </div>
        <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:border-0 focus:outline-none  border-none shadow-sm placeholder:text-body rounded-2xl" placeholder="Search" required />
        
    </div>
</form>
<i className='fa-regular fa-bell text-2xl'></i>
<div className='flex '>
  <div className='w-10 h-10'><img src={profileImage} className='w-full' alt="" /></div>
  <div className='flex-col ms-2'>
    <h2 className='font-bold text-lg'>Robertson</h2>
    <p className='font-light'>HR Manager</p>
  </div>

</div>


</div>



    </nav>
    
    </>
  )
}
