import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddEmployee from './Pages/AddEmployee/AddEmployee';
import Admin from './Pages/Admin/Admin';
import AllEmployees from './Pages/AllEmployees/AllEmployees';
import Attendace from './Pages/Attendance/Attendace';
import Checkin from './Pages/Checkin/Checkin';
import Department from './Pages/Department/Department';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import Layout from './Pages/Layout/Layout';
import Login from './Pages/Login.jsx/Login';
import Otp from './Pages/Otp/Otp';
import Register from './Pages/Register/Register';
import Request from './Pages/Request/Request';
import RequestManagement from './Pages/RequestManagement/RequestManagement';
import ResetPasword from './Pages/ResetPassword/ResetPasword';
import CreateDepartment from './Pages/CreateDepartment/CreateDepartment';
import DepartmentEmployees from './Pages/DepartmentEmployees/DepartmentEmployees';
import ProtectedRoute from './routes/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import JobVacancy from './Components/JobVacancy/JobVacancy';
import Candidates from './Pages/Candidates/Candidates';
import PublicRoute from './routes/PublicRoute';
import AssignTasks from './Pages/AssugnTasks/AssignTasks';
import ShowTasks from './Pages/ShowTasks/ShowTasks';

function App() {
  let route = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin',
          element: (
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          ),
        },
        {
          path: '/allemployees',
          element: (
            <ProtectedRoute allowedRole={['admin', 'manager']}>
              <AllEmployees />
            </ProtectedRoute>
          ),
        },
        {
          path: '/allemployees/addemployee',
          element: (
            <ProtectedRoute allowedRole={['admin', 'manager']}>
              <AddEmployee />
            </ProtectedRoute>
          ),
        },
        {
          path: '/department',
          element: (
            <ProtectedRoute allowedRole={['admin']}>
              <Department />
            </ProtectedRoute>
          ),
        },
        {
          path: '/role',
          element: (
            <ProtectedRoute allowedRole={['admin', 'employee', 'manager']}>
              <JobVacancy />
            </ProtectedRoute>
          ),
        },
        { path: '/register', element: <PublicRoute><Register /> </PublicRoute>  },
        { path: '/login', element:<PublicRoute><Login /> </PublicRoute>  },
        {
          path: '/attendance',
          element: (
            <ProtectedRoute>
              <Attendace />
            </ProtectedRoute>
          ),
        },
        {
          path: '/request',
          element: (
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          ),
        },
        { path: '/login/forgetpassword', element: <ForgetPassword /> },
        { path: '/login/forgetpassword/otp', element: <Otp /> },
        {
          path: '/login/forgetpassword/otp/resetpassword',
          element: <ResetPasword />,
        },
        {
          path: '/checkin',
          element: (
            <ProtectedRoute>
              <Checkin />
            </ProtectedRoute>
          ),
        },
        {
          path: '/requestmanagement',
          element: (
            <ProtectedRoute allowedRole={['admin', 'manager']}>
              <RequestManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: '/assigntask',
          element: (
            <ProtectedRoute allowedRole={['admin', 'manager']}>
              <AssignTasks />
            </ProtectedRoute>
          ),
        },
        {
          path: '/showtasks',
          element: (
            <ProtectedRoute allowedRole={['employee', 'manager','admin']}>
              <ShowTasks />
            </ProtectedRoute>
          ),
        },
        {
          path: '/department/createdepartment',
          element: (
            <ProtectedRoute>
              <CreateDepartment />
            </ProtectedRoute>
          ),
        },
        {
          path: '/department/:department',
          element: (
            <ProtectedRoute allowedRole={['admin']}>
              <DepartmentEmployees />
            </ProtectedRoute>
          ),
        },
        {
          path: '/candidates',
          element: (
            <ProtectedRoute allowedRole={['employee', 'admin', 'manager']}>
              <Candidates />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
