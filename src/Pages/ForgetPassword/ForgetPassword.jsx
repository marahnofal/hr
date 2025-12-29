import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {
  const navigate=useNavigate()
  let validation=Yup.object().shape({
    Email:Yup.string().required('Email is Required').matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,'Invalid Email')
  })
  let formik=useFormik({
    initialValues:{
      Email:''
    },
    onSubmit:(e)=>(
      console.log('email sent successfully'),
      console.log(e),
      navigate('/login/forgetpassword/otp')

      

      
    ),
    validationSchema:validation

  })
  return (
    <>
     <div className='flex flex-col items-center justify-center w-full h-screen '>
           <div  className='flex flex-col   w-[445px] h-[440px] px-5 gap-5'>
            <a href="" className='font-bold'><i className='fa-solid fa-angle-left'></i>Back </a>
            
          <div>
              <h2 className='font-bold  text-xl'>Forget Password</h2>
            <p className='font-light'>Enter your registered email address. we’ll send you a code to reset your password.</p>
          </div>
             <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-10 '>
                <div className='relative h-5 w-full'>
                <input name='Email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Email} type="text" id='email' className='ps-3 pt-5 outline-none border-green rounded-lg w-full'/>
                <label htmlFor="email" className='absolute ps-2 top-0 left-0 text-green'> Email </label>
                {formik.errors.Email&&formik.touched.Email&&<p className='text-red-500'>{formik.errors.Email}</p>}
            </div>
            <button type='submit' className='mt-5 bg-green w-full h-10  text-white'>Send OTP </button>
        
   
            </form>
            
    
           </div>
            
    
    
        </div>
    </>
  )
}
