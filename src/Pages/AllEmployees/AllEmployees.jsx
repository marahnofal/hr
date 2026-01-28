import React, { useEffect, useState } from 'react';
import Table from '../../Components/Table/Table';
import { Link } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import Initials from '../../Components/Initials/Initials';
import CardEdit from '../../Components/CardEdit/CardEdit';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import api from '../../Services/api';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

export default function AllEmployees() {
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
        const res = await api.get('/users');
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
      }
    }

    fetchEmployees();
  }, [user]);
  const filteredData = employees?.filter((emp) =>
    emp?.name?.toLowerCase().includes(search.toLowerCase())
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
