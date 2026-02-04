import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useAuth } from '../../context/ThemeContext/AuthContext';

export default function Layout() {
  const { user } = useAuth();
  return (
    <>
      <div className="flex min-h-screen w-full gap-7 lg:gap-9">
        {user && (
          <aside className="fixed top-0 left-0 me-5 overflow-auto md:w-50">
            <Sidebar />
          </aside>
        )}

        <div className="flex w-full flex-col">
          <div className="ml-[65px] md:ml-50">
            <Navbar />
          </div>

          <div className="ml-[50px] md:ml-50">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
