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
          <aside className="me-5 md:w-50">
            <Sidebar />
          </aside>
        )}

        <div className="flex w-full flex-col">
          <Navbar />

          <Outlet />
        </div>
      </div>
    </>
  );
}
