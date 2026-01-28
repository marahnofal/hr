import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import {
  getMonthlyAttendanceChart,
  getWeeklyChartData,
} from '../../Services/chartsData';
import MonthlyPieChart from './MonthlyBarChart';
import WeeklyBarChart from './WeeklyBarChart';

export default function AttendanceChart() {
  const { user } = useAuth();

  const [range, setRange] = useState('week');
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      const week = await getWeeklyChartData(user);
      setWeeklyData(Array.isArray(week) ? week : []);

      const month = await getMonthlyAttendanceChart(user);

      const pieData = month?.length
        ? [
            { name: 'Present', value: month.reduce((a, c) => a + c.ontime, 0) },
            { name: 'Late', value: month.reduce((a, c) => a + c.late, 0) },
            { name: 'Leave', value: month.reduce((a, c) => a + c.leave, 0) },
          ]
        : [];

      setMonthlyData(pieData);
    }

    loadData();
  }, [user]);

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <h2>Attendance Overview</h2>

        <select
          className="rounded border px-3 py-1"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className="flex items-center gap-5">
        {range === 'week' && <WeeklyBarChart data={weeklyData} />}
        {range === 'month' && <MonthlyPieChart data={monthlyData} />}
        {range === 'month' && (
          <div className="flex flex-col">
            <span className="text-heading me-3 flex items-center text-sm font-medium">
              <span className="me-1.5 flex h-[15px] w-[15px] shrink-0 bg-green-500 text-green-500" />
              <p className="text-green-500">Present</p>
            </span>
            <span className="text-heading me-3 flex items-center text-sm font-medium">
              <span className="me-1.5 flex h-[15px] w-[15px] shrink-0 bg-amber-300 text-amber-300" />
              <p className="text-amber-400">Late</p>
            </span>
            <span className="text-heading me-3 flex items-center text-sm font-medium">
              <span className="me-1.5 flex h-[15px] w-[15px] shrink-0 bg-red-500" />
              <p className="text-red-500">Leave</p>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
