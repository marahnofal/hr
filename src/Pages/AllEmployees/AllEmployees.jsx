import { useEffect, useMemo, useState } from 'react';
import { DotLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CardEdit from '../../Components/CardEdit/CardEdit';
import Initials from '../../Components/Initials/Initials';
import Search from '../../Components/Search/Search';
import Table from '../../Components/Table/Table';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import api from '../../Services/api';
import { useLoading } from '../../context/LoaderContext';

export default function AllEmployees() {
  const { loading, setLoading } = useLoading();
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  const remove = (emp) => {
    setEmployees((prev) => prev.filter((e) => e.employeeId !== emp.employeeId));
  };

  const update = (emp) => {
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? emp : e)));
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Initials name={info.getValue()} />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: 'Employee ID', accessorKey: 'id' },
    { header: 'Designation', accessorKey: 'role' },
    { header: 'Department', accessorKey: 'department_id' },

    {
      header: 'Action',
      cell: (info) => (
        <CardEdit update={update} data={info.row.original} remove={remove} />
      ),
    },
  ];

  useEffect(() => {
    async function fetchEmployees() {
      try {
        if (!user) return;
        setLoading(true);
        const res = await api.get('/users');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let data = res?.data;

        if (user?.role === 'manager') {
          data = data?.filter(
            (emp) => emp?.department_id === user.department_id
          );
        }

        setEmployees(data);
      } catch (error) {
        theme === 'dark'
          ? toast.error('Error In loading data', {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.error('Error In loading data.');
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, [user]);
  const filteredData = useMemo(
    () =>
      employees?.filter((emp) =>
        emp?.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [employees, search]
  );
  return (
    <div className="w-full">
      <div className="flex w-full justify-between pe-5">
        <form className="md:max-w-md">
          <label htmlFor="search" className="sr-only">
            Search
          </label>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <Search search={search} setSearch={setSearch} />
          </div>
        </form>

        <button className="bg-green rounded-xl p-3 text-white">
          <Link to="/allemployees/addemployee">Add New Employee</Link>
        </button>
      </div>

      <Table column={columns} rows={filteredData} />
    </div>
  );
}
