import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
    <div className='flex flex-col items-center justify-center w-full h-screen '>
       <div  className='flex flex-col   w-[445px] h-[440px] px-5 gap-5'>
        <div className='w-32'><img src={logo} alt="" /></div>
        
      <div>
          <h2 className='font-bold  text-xl'>Welcome 👋🏻</h2>
        <p className='font-light'>Please Login Here</p>
      </div>
         <form action="" className='flex flex-col gap-10 '>
            <div className='relative h-5 w-full'>
            <input type="text" id='email' className='ps-3 pt-5 outline-none border-green rounded-lg w-full'/>
            <label htmlFor="email" className='absolute ps-2 top-0 left-0 text-green'> Email </label>
        </div>
            <div className='relative h-5 '>
            <input type="password" id='password'  className='ps-3 pt-5 outline-none border-green rounded-lg w-full'/>
            <label htmlFor="password" className='absolute top-0 left-0 ps-2 text-green'> Password </label>
        </div>
        <div className='flex justify-between' >
            <div className='flex gap-2' >
                <input className= 'accent-green-400' type="checkbox" />
            <label htmlFor="">Remember me</label>
            </div>
            <Link to={'/login/forgetpassword'} className='text-green'>forget Password</Link>

        </div>
        
        </form>
        

       </div>
        


    </div>
    </>
  )
}
