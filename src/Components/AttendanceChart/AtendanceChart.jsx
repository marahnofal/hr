import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import { getMonthlyAttendanceChart, getWeeklyChartData } from '../../Services/chartsData';
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
      <div className="flex w-full justify-between mb-4">
        <h2>Attendance Overview</h2>

        <select
          className="border rounded px-3 py-1"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {range === 'week' && <WeeklyBarChart data={weeklyData} />}
      {range === 'month' && <MonthlyPieChart data={monthlyData} />}
    </>
  );
}
