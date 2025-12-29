import { Formik, useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

export default function ResetPasword() {
  const validation=Yup.object().shape({
    Password:Yup.string().required('Password is Required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Invalid Password at least one uppercase Letter , one Lowercase Letter , number and special charachter'),
    ConfirmPassword:Yup.string().required("Confirm Password is required").oneOf([Yup.ref('Password')]),
  })

  let formik=useFormik({
    initialValues:{
    Password:'',
    ConfirmPassword:''
  },
  onsubmit:()=>(
    console.log('Password reset')
  ),
  validationSchema:validation
    
  } )

  return (
      <>
        <div className='flex flex-col items-center justify-center w-full h-screen '>
           <div  className='flex flex-col   w-[445px] h-[440px] px-5 gap-5'>
             <a href="" className='font-bold'><i className='fa-solid fa-angle-left'></i>Back </a>
            
          <div>
              <h2 className='font-bold  text-xl'>Reset Password</h2>
            <p className='font-light'>Write new password and confirm it</p>
          </div>
             <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-10 '>
                <div className='relative h-5 w-full my-5'>
                <input name='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Password} type="password" id='email' className='ps-3 pt-5 outline-none border-green rounded-lg w-full'/>
                <label htmlFor="email" className='absolute ps-2 top-0 left-0 text-green'> Password </label>
                {formik.errors.Password&&formik.touched.Password&&<p className= 
                'text-red-500'>{formik.errors.Password}</p>}
            </div>
                <div className='relative h-5 my-5'>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ConfirmPassword} name='ConfirmPassword' type="password" id='password'  className='ps-3 pt-5 outline-none border-green rounded-lg w-full'/>
                <label htmlFor="password" className='absolute top-0 left-0 ps-2 text-green'> Password Confirmation </label>
                {formik.errors.ConfirmPassword&&formik.touched.ConfirmPassword&&<p className= 
                'text-red-500'>{formik.errors.Password}</p>}
            </div>
           
            <button className='bg-green w-full h-10 mt-10  text-white'>Reset</button>
            </form>
            
    
           </div>
            
    
    
        </div>
        </>
   
  )
}
