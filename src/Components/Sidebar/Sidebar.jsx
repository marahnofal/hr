import React from 'react'
import {logo,
  logoIcon,
  apps,
  users,
  calender,
  cash,
  settings,
  connections,
  user,
  notepad,
  notes,
  user_setting,
  sun,
  moon,
  darkmoon,}from '../../assets/data'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    const sidebar = [
        {
            id:0,
            Label: 'Dashboard'
            , icon: apps,
            path:'/'
        },
        {
            id:1,
            Label: 'All Employees'
            , icon: users,
            path:'/allemployees'

        },
        {
            id:2,
            Label: 'All Departments'
            , icon: connections,
            path:'/department'
        },
        {
            id:3,
            Label: 'Attendance'
            , icon: calender,
            path:'attendance'
        },
        {
            id:4,
            Label: 'Payroll'
            , icon: cash
        },
        {
            id:5,
            Label: 'Jobs'
            , icon: apps
        },
        {
            id:6,
            Label: 'Candidates'
            , icon: user
        },
        {
            id:7,
            Label: 'Leaves'
            , icon: notepad
        },
        {
            id:8,
            Label: 'Holidays'
            , icon: notes
        },
        {
            id:9,
            Label: 'Roles'
            , icon: user_setting
        },
        {
            id:10,
            Label: 'Settings'
            , icon: settings
        },
    ]
    return (
        <>
            <nav className='w-[65px] md:w-60 h-full   sidebar rounded-lg  overflow-y-auto no-scrollbar fixed '>
                <div className='flex flex-col pt-[30px] md:ps-[30px]  ps-[15px] xl:justify-between xl:gap-1 h-screen '>
                    <div className='md:w-[108px] md:h-[30px] w-[35px] h-[30px]'>
                        <img src={logo} alt="" className='hidden md:block w-full' />
                        <img src={logoIcon} alt="" className='block md:hidden w-full' />
                    </div>
                    <div>
                        {sidebar.map((item) => (
                            <Link to={item.path} key={item.id}>
                                <div className="flex gap-5 xl:py-5 py-3">
                                    <img src={item.icon} alt="" />
                                    <p className='hidden md:block'>{item.Label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-col md:flex-row gap-3 pb-4 md:w-full  md:justify-center md:items-center md:pe-10 pe-2 '>
                        <button className="flex items-center gap-2  py-2 px-3 rounded-lg text-white pe-3 bg-green">
                            <img className="md:w-full " src={sun} alt="sun" />
                            <span className="hidden md:inline">Light</span>
                        </button>
                        <button className="flex items-center gap-2 shadow-2xl py-2 pe-3 rounded-lg ">
                            <img className='md:w-full ' src={darkmoon}  alt="dark"  />
                            <span className="hidden md:inline">Dark</span>
                        </button>



                    </div>

                </div>
            </nav>

        </>

    )
}
