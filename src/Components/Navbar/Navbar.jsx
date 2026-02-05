import profileImage from '../../assets/pp.png';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import Initials from '../Initials/Initials';

export default function Navbar() {
  const { user } = useAuth();
  const nav_content = {
    '/': {
      header: `Welcome ${user?.name} 👋🏻`,
      title: 'Good Morning',
    },
    '/admin': {
      header: `Welcome ${user?.name.split(' ')[0]} 👋🏻`,
      title: 'Good Morning',
    },
    '/allemployees': {
      header: 'All Employee',
      title: 'All Emloyee Information',
    },
    '/register': {
      header: 'Register',
      title: 'Welcome to Nweave',
    },
    '/login': {
      header: 'Login',
      title: 'Welcome Back',
    },
    '/attendance': {
      header: 'Attendance',
      title: 'All Emloyees Attendance',
    },
    '/checkin': {
      header: 'Daily Check in / Check out',
      title: 'Mark your Attendance',
    },
    '/requestmanagement': {
      header: 'Leave Requests',
      title: 'Leave Requests Management ',
    },
    '/request': {
      header: 'Leave Requests',
      title: 'Create New Request ',
    },
    '/department': {
      header: 'Departments',
      title: 'All Departments',
    },
    '/candidates': {
      header: 'Candidates',
      title: 'Inner Recommendations ',
    },
    '/department/WEB': {
      header: 'Web Department',
      title: 'Department Details ',
    },
    '/department/MOBILE': {
      header: 'Mobile Department',
      title: 'Department Details ',
    },
    '/department/QUALITY': {
      header: 'Quality Department',
      title: 'Department Details ',
    },
    '/department/DESIGN': {
      header: 'Design Department',
      title: 'Department Details ',
    },
    '/showtasks': {
      header: 'Assigned Tasks',
      title: 'What to do ',
    },
    '/assigntask': {
      header: 'Assign Task',
      title: ' To-Do',
    },
  };
  const { pathname } = useLocation();
  const page = nav_content[pathname] || { header: 'page', title: '' };

  return (
    <>
      <nav className="align-center mx-auto flex h-25 w-full justify-between rounded-lg p-[30px]">
        <div className=" justify-center md:flex md:flex-col">
          <h2 className="text-xl font-bold">{page.header}</h2>
          <p>{page.title}</p>
        </div>
        {localStorage.getItem('token') !== null && (
          <div className="md:flex items-center justify-center gap-5 hidden ">
            <form className="mx-auto w-full md:max-w-md">
              <label
                htmlFor="search"
                className="text-heading sr-only mb-2.5 block text-sm font-medium"
              >
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  type="search"
                  id="search"
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base placeholder:text-body block w-full rounded-2xl border border-none p-3 ps-9 text-sm shadow-sm focus:border-0 focus:outline-none"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
            <i className="fa-regular fa-bell text-2xl"></i>
            <div className="flex items-center justify-center gap-5">
              <div className="h-10 w-10">
                <Initials name={user?.name} />
              </div>
              <div className="ms-2 w-full flex-col">
                <h2 className="text-lg font-bold">
                  {user?.name.split(' ')[0]}
                </h2>
                <p className="font-light">{user?.job_title.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
