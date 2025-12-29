import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './Pages/Login.jsx/Login'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import Otp from './Pages/Otp/Otp'
import ResetPasword from './Pages/ResetPassword/ResetPasword'
import CardState from './Components/CardState/CardState';
import Admin from './Pages/Admin/Admin'
import Layout from './Pages/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllEmployees from './Pages/AllEmployees/AllEmployees'
import AddEmployee from './Pages/AddEmployee/AddEmployee'
import Department from './Pages/Department/Department'
import Register from './Pages/Register/Register'
import Attendace from './Pages/Attendance/Attendace'
import Request from './Pages/Request/Request';
import Checkin from './Pages/Checkin/Checkin'



function App() {
  const [count, setCount] = useState(0)
  let route=createBrowserRouter([
    {path:'' , element:<Layout/>,children:[
      {index:true,element:<Admin/>},
      {path:'/allemployees',element:<AllEmployees/>},
      {path:'/allemployees/addemployee',element:<AddEmployee/>},
      {path:'/department',element:<Department/>},
      {path:'/register',element:<Register/>},
      {path:'/login',element:<Login/>},
      {path:'/attendance',element:<Attendace/>},
      {path:'/request',element:<Request/>},
      {path:'/login/forgetpassword',element:<ForgetPassword/>},
      {path:'/login/forgetpassword/otp',element:<Otp/>},
      {path:'/login/forgetpassword/otp/resetpassword',element:<ResetPasword/>},
      {path:'/checkin',element:<Checkin/>},

    ]}
    
  ])

  return (
    <>
    <RouterProvider router={route}></RouterProvider>
    
      
          
      


    
    
    

    </>
  )
}

export default App
