import React from 'react'
import employeesData from './rows'

export default function Department() {
  return (
    <>
    <div className='grid grid-cols-2 mx-6 gap-16'>
      <div className='col-span-1 border border-gray-200 '>

      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold'> Design Department </h2>
          <p className='text-gray-400'> 20 Members</p>

        </div>
        <a href="" className='text-green'>View All</a>

        
      </div>
      {employeesData
          .filter(emp => emp.department === 'Mobile Development')
          .map((emp) => (
            <div key={emp.id} className="flex justify-between mb-3">
              <div className="flex items-center gap-5">
                <div className="rounded-full w-12 h-12 bg-green flex items-center justify-center">
                  <p className="text-white font-bold text-lg">
                    {emp.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </p>
                </div>
                <h2>{emp.name}</h2>
              </div>
              <a href="#">
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}



      


      </div>
      <div className='col-span-1 border border-gray-200 '>

      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold'> Design Department </h2>
          <p className='text-gray-400'> 20 Members</p>

        </div>
        <a href="" className='text-green'>View All</a>

        
      </div>
      {employeesData
          .filter(emp => emp.department === 'Mobile Development')
          .map((emp) => (
            <div key={emp.id} className="flex justify-between mb-3">
              <div className="flex items-center gap-5">
                <div className="rounded-full w-12 h-12 bg-green flex items-center justify-center">
                  <p className="text-white font-bold text-lg">
                    {emp.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </p>
                </div>
                <h2>{emp.name}</h2>
              </div>
              <a href="#">
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}



      


      </div>
      <div className='col-span-1 border border-gray-200 '>

      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold'> Design Department </h2>
          <p className='text-gray-400'> 20 Members</p>

        </div>
        <a href="" className='text-green'>View All</a>

        
      </div>
      {employeesData
          .filter(emp => emp.department === 'Mobile Development')
          .map((emp) => (
            <div key={emp.id} className="flex justify-between mb-3">
              <div className="flex items-center gap-5">
                <div className="rounded-full w-12 h-12 bg-green flex items-center justify-center">
                  <p className="text-white font-bold text-lg">
                    {emp.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </p>
                </div>
                <h2>{emp.name}</h2>
              </div>
              <a href="#">
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}



      


      </div>
      <div className='col-span-1 border border-gray-200 '>

      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold'> Design Department </h2>
          <p className='text-gray-400'> 20 Members</p>

        </div>
        <a href="" className='text-green'>View All</a>

        
      </div>
      {employeesData
          .filter(emp => emp.department === 'Mobile Development')
          .map((emp) => (
            <div key={emp.id} className="flex justify-between mb-3">
              <div className="flex items-center gap-5">
                <div className="rounded-full w-12 h-12 bg-green flex items-center justify-center">
                  <p className="text-white font-bold text-lg">
                    {emp.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </p>
                </div>
                <h2>{emp.name}</h2>
              </div>
              <a href="#">
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}



      


      </div>
     
      
    </div>
    </>
  )
}
