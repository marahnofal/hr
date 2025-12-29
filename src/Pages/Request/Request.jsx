import { useFormik } from 'formik'
import React from 'react'
import * as Yup from   'yup'

export default function Request() {
    let today=new Date()
    today.setHours(0,0,0,0)
    let validation=Yup.object().shape({
        Type:Yup.string().required("Required"),
        FromDate:Yup.date().required('Required').min(today,'invalid past dates'),
        ToDate:Yup.date().required('Required').min(Yup.ref('FromDate'),"Does not match with the starting Date"),
        Reason:Yup.string().required('Required'),
    })
    let formik=useFormik({
        initialValues:{
            Type:'',
            FromDate:'',
            EndDate:'',
            Reason:'',
            

            
        },
        onSubmit:(e)=>(
            console.log(e)
            
        ),
        validationSchema:validation
            

        
        

    },
    
)
  return (
    
    <>
    <form action="" className='mx-2'>
<div>
            <select name="Type" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Type} id="" className='px-2  border-2 border-gray-200 outline-0 w-full h-[56px] rounded-lg col-span-1 my-2 '>
            <option  value="">Type</option>
            <option value="planned">Planned Vacation</option>
            <option value="sick">Sick Leave</option>
            <option value="emergency">Emergency</option>
            <option value="mariage">Mariage</option>
        </select>
        {formik.errors.Type&&formik.touched.Type&&<p className='text-red-500'>{formik.errors.Type}</p>}
</div>
<div>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.FromDate} type="date" name="FromDate" id="" className='px-2  border-2 border-gray-200 outline-0 w-full h-[56px] rounded-lg col-span-1 my-2 ' />
    {formik.errors.FromDate&&formik.touched.FromDate&&<p className='text-red-500'>{formik.errors.FromDate}</p>}
</div>
<div>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ToDate} type="date" name="ToDate" id="" className='px-2  border-2 border-gray-200 outline-0 w-full h-[56px] rounded-lg col-span-1 my-2 ' />
    {formik.errors.ToDate&&formik.touched.ToDate&&<p className='text-red-500'>{formik.errors.ToDate}</p>}
</div>
<textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Reason} placeholder='Reason' name="Reason" id="" className='px-2  border-2 border-gray-200 outline-0 w-full h-[100px] rounded-lg col-span-1 my-2  '></textarea>
{formik.errors.Reason&&formik.touched.Reason&&<p className='text-red-500'>{formik.errors.Reason}</p>}
<button type='submit' className='bg-green text-white w-16 h-8 '>Apply</button>
    </form>
    
    </>
  )
}
