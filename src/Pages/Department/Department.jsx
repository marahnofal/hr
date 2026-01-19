import React from 'react'
import employeesData from './rows'
import { Link } from 'react-router-dom'
import departmentsData from './rows'

export default function Department() {
  return (
    <>
    <div className='grid grid-cols-2 gap-2 mx-6 ' >
  {departmentsData.map(dep=>(
      
      <div className='col-span-1 text-center border border-gray-400'>
        <div className="flex flex-col gap-5 py-4">
            <p className='text-4xl font-bold text-gray-600 '>{dep.name}</p>
        <p className='text-gray-500 text-lg'>{dep.description}</p>
        <p className=' text-gray-600 font-bold text-2xl '><i className='fa-solid fa-user-group text-green'></i>{dep.employeesCount}</p>
        <Link to={`/department/${dep.name}`} ><i className='fa-solid fa-chevron-right text-green font-extrabold text-3xl'></i></Link>

        </div>
      

      </div>
    
  ))}
  </div>
    </>
  )
}
