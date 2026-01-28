import CardState from './../../Components/CardState/CardState';
import users2 from '../../assets/users2.png';
import Calender from '../../Components/Calender/Calender';
import AttendanceChart from '../../Components/AttendanceChart/AtendanceChart';
import { tasks } from '../../assets/data';
import Table from '../../Components/Table/Table';

import { useEffect, useEffectEvent, useState } from 'react';

import api from '../../Services/api';
import Initials from '../../Components/Initials/Initials';
import { useAuth } from '../../context/ThemeContext/AuthContext';

export default function Admin() {
  const [showall, setShowAll] = useState(false);
  const { user } = useAuth();
  const [todayAttendance, setToayAttendance] = useState([]);
  const displayedRows = showall ? todayAttendance : todayAttendance.slice(0, 5);
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
              : info.getValue() === 'leave'
                ? 'bg-amber-100 text-amber-500'
                : 'bg-green-100 text-green-500'
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
  ];
  function getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }
  function filterDataByDate(data, today) {
    return data.filter((day) => day.date === today);
  }
  useEffect(() => {
    async function fetchToday() {
      const res = await api.get('/attendance');
      let data = res?.data;

      const today = getTodayDate();
      if (user?.role === 'manager') {
        data = data?.filter((emp) => emp.department_id == user.department_id);
        setToayAttendance(filterDataByDate(data, today));
      }

      setToayAttendance(filterDataByDate(data, today));
    }
    fetchToday();
  }, [user]);

  return (
    <>
      <div className="grid w-full grid-cols-3">
        <div className="col-span-3 ms-5 grid w-full grid-cols-1 gap-2 md:col-span-2 md:grid-cols-2">
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>

          <div className="col-span-3 md:col-span-2">
            <AttendanceChart />
            {user?.role !== 'employee' && (
              <div>
                <Table column={columns} rows={displayedRows} />
                <button
                  onClick={() => setShowAll(!showall)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-green-500 hover:cursor-pointer"
                >
                  {showall ? 'See Less' : 'See More'}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="fixed end-0 top-20 col-span-3 md:col-span-1">
          <Calender tasks={tasks} />
        </div>
      </div>
    </>
  );
}
