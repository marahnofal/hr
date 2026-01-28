import React, { useState, useEffect } from 'react';

import Table from '../../Components/Table/Table';
import Search from '../../Components/Search/Search';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import api from '../../Services/api';
import Initials from './../../Components/Initials/Initials';
import toast from 'react-hot-toast';

export default function Attendace() {
  const [attendanceData, setAttendanceData] = useState([]);
  const { user } = useAuth();
  const columns = [
    {
      header: 'Name',
      accessorKey: 'employee_name',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Initials name={info.getValue()} />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: 'Department', accessorKey: 'department_id' },

    { header: 'Check In Time', accessorKey: 'check_in' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue() === 'late'
              ? 'bg-red-100 text-red-500'
              : 'bg-green-100 text-green-500'
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
    { header: 'date', accessorKey: 'date' },
  ];
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await api.get('/attendance');
        let data = res.data;
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (user?.role === 'manager') {
          data = data.filter((emp) => emp.department_id === user.department_id);
        }

        setAttendanceData(data);
      } catch (error) {
        theme === 'dark'
          ? toast.error(error.message, {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.error(error.message);
      }
    }

    fetchEmployees();
  }, [user]);
  const [search, setSearch] = useState('');
  const filteredData = attendanceData?.filter((emp) => {
    return emp?.employee_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <Table column={columns} rows={filteredData} />
    </>
  );
}
