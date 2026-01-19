import { Link, useNavigate } from 'react-router-dom';

// Icons
import { MdOutlineDashboard, MdOutlinePeople } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { RiUserSettingsLine, RiUserCommunityLine } from 'react-icons/ri';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { PiNotepad } from 'react-icons/pi';
import { SlCalender } from 'react-icons/sl';

// Theme hook ✅
import { useTheme } from '../../context/ThemeContext/ThemeContext.jsx';

// Assets
import { darkmoon, sun, logo, logoIcon, lightLogo } from '../../assets/data';
import { useAuth } from '../../context/ThemeContext/AuthContext.jsx';

export default function Sidebar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  

  const sidebar = [
    {
      id: 0,
      label: 'Dashboard',
      icon: MdOutlineDashboard,
      path: '/',
      
    },
    {
      id: 1,
      label: 'Employees',
      icon: MdOutlinePeople,
      path: '/allemployees',
    },
    {
      id: 2,
      label: 'Departments',
      icon: RiUserCommunityLine,
      path: '/department',
    },
    {
      id: 3,
      label: 'Attendance',
      icon: FaRegCalendarCheck,
      path: '/attendance',
    },
    {
      id: 7,
      label: 'Leaves',
      icon: PiNotepad,
      path: '/requestmanagement',
    },
    {
      id: 8,
      label: 'Holidays',
      icon: SlCalender,
      path: '/holidays',
    },
    {
      id: 9,
      label: 'Roles',
      icon: RiUserSettingsLine,
      path: '/roles',
    },
    {
      id: 10,
      label: 'Settings',
      icon: CiSettings,
      path: '/settings',
    },
  ];
  const logoutButton = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed h-full w-[65px] shadow-lg md:w-60">
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
          {sidebar.map((item) => {
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
        <div className="flex flex-col">
          <button onClick={logoutButton}>Log Out</button>
          <button
            onClick={toggleTheme}
            className="mt-6 flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors"
          >
            <img
              src={theme === 'light' ? darkmoon : sun}
              alt="theme"
              className="w-5"
            />
            <span className="hidden md:block">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
