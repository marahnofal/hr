import React from 'react'
import { Link } from 'react-router-dom'

export default function Otp() {
  return (
     <>
     <div className='flex flex-col items-center justify-center w-full h-screen '>
           <div  className='flex flex-col   w-[445px] h-[440px] px-5 gap-5'>
            
            <a href="" className='font-bold'><i className='fa-solid fa-angle-left'></i>Back </a>
            
          <div>
              <h2 className='font-bold  text-5xl'>Enter OTP</h2>
            <p className='font-light'>We have share a code of your registered email address robertallen@example.com</p>
          </div>
             <form action="" className='flex flex-wrap  gap-5 '>
                
                 <input type="text" maxLength="1"
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                     
                    transition-transform duration-300 hover:scale-110"></input>
                
                 <input type="text" maxLength="1"
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                     
                    transition-transform duration-300 hover:scale-110"></input>
                
                 <input type="text" maxLength="1"
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                     
                    transition-transform duration-300 hover:scale-110"></input>
                
                 <input type="text" maxLength="1"
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                     
                    transition-transform duration-300 hover:scale-110"></input>
                
                 <input type="text" maxLength="1"
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                     
                    transition-transform duration-300 hover:scale-110"></input>
                
                 <input type="text" maxLength="1"
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                     
                    transition-transform duration-300 hover:scale-110"></input>
                
            
            <button className='bg-green w-full h-10 mt-10  text-white'><Link to='/login/forgetpassword/otp/resetpassword'>Submit</Link></button>
        
   
            </form>
            
    
           </div>
            
    
    
        </div>
    </>
  )
}
