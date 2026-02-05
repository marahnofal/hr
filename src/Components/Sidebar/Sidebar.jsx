import { Link, useNavigate } from 'react-router-dom';

// Icons
import { LuListTodo } from "react-icons/lu";
import { MdOutlineAddTask } from "react-icons/md";

import { MdOutlineDashboard, MdOutlinePeople } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { CiSun } from 'react-icons/ci';
import { FaRegMoon } from 'react-icons/fa';
import { RiUserSettingsLine, RiUserCommunityLine } from 'react-icons/ri';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { PiNotepad } from 'react-icons/pi';
import { SlCalender } from 'react-icons/sl';
import { CiCircleCheck } from 'react-icons/ci';
import { CiSquareQuestion } from 'react-icons/ci';

import { IoMdPeople } from 'react-icons/io';
// Theme hook ✅
import { useTheme } from '../../context/ThemeContext/ThemeContext.jsx';

// Assets
import { darkmoon, sun, logo, logoIcon, lightLogo } from '../../assets/data';
import { useAuth } from '../../context/ThemeContext/AuthContext.jsx';

export default function Sidebar() {
  const { user } = useAuth();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const sidebar = [
    {
      id: 0,
      label: 'Dashboard',
      icon: MdOutlineDashboard,
      path: '/',
      role: ['admin', 'manager', 'employee'],
    },
    {
      id: 1,
      label: 'Employees',
      icon: MdOutlinePeople,
      path: '/allemployees',
      role: ['manager', 'admin'],
    },
    {
      id: 2,
      label: 'Departments',
      icon: RiUserCommunityLine,
      path: '/department',
      role: ['admin'],
    },
    {
      id: 3,
      label: 'Attendance',
      icon: FaRegCalendarCheck,
      path: '/attendance',
      role: ['manager', 'admin'],
    },
    {
      id: 7,
      label: 'Leaves',
      icon: PiNotepad,
      path: '/requestmanagement',
      role: ['manager', 'admin'],
    },
    {
      id: 13,
      label: 'Requests',
      icon: PiNotepad,
      path: '/request',
      role: ['employee'],
    },
    {
      id: 8,
      label: 'Candidates',
      icon: IoMdPeople,
      path: '/candidates',
      role: ['admin', 'employee', 'manager'],
    },
    {
      id: 9,
      label: 'Roles',
      icon: RiUserSettingsLine,
      path: '/role',
      role: ['admin', 'employee', 'manager'],
    },

    {
      id: 11,
      label: 'checkin',
      icon: CiCircleCheck,
      path: '/checkin',
      role: ['manager', 'employee'],
    },

    {
      id: 12,
      label: 'Tasks',
      icon: LuListTodo,
      path: '/showtasks',
      role: ['manager','admin','employee'],
    },
    {
      id: 12,
      label: 'Assign Task',
      icon: MdOutlineAddTask,
      path: '/assigntask',
      role: ['manager','admin'],
    },
    
  ];
  const logoutButton = () => {
    logout();
    navigate('/login');
  };
  const filteredSidebar = sidebar.filter((item) =>
    item.role.includes(user?.role)
  );

  return (
    <nav className="fixed h-full w-[65px] shadow-lg md:w-50">
      <div className="flex h-full flex-col justify-between px-4 py-6">
        {/* Logo */}
        <div className="mb-6">
          {theme === 'light' ? (
            <img
              src={logo}
              alt="logo"
              className="hidden w-full md:block md:w-[100px]"
            />
          ) : (
            <img
              src={lightLogo}
              alt="logo"
              className="hidden w-full md:block md:w-[100px]"
            />
          )}

          <img src={logoIcon} alt="logo" className="w-full md:hidden" />
        </div>

        {/* Links */}
        <div className="space-y-4">
          {filteredSidebar.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center gap-4 text-sm font-medium hover:text-green-400 active:text-green-500 dark:hover:text-green-400 dark:active:text-green-500"
              >
                <Icon size={20} />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <div className="flex flex-col md:items-start">
          <button className="hidden md:block" onClick={logoutButton}>
            Log Out
          </button>
          <button className="md:hidden" onClick={logoutButton}>
            <CiLogout size={22} />
          </button>
          <button
            onClick={toggleTheme}
            className="mt-6 flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors"
          >
            <span className="md:hidden">
              {theme === 'light' ? (
                <FaRegMoon size={22} />
              ) : (
                <CiSun size={22} />
              )}
            </span>

            <span className="hidden md:block">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
