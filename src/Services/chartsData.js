import { use } from 'react';
import api from './api';
import Attendace from './../Pages/Attendance/Attendace';

export async function fetchChartData() {
  const res = await api.get('/attendance');
  return Array.isArray(res.data) ? res.data : (res.data.data ?? []);
}
function getWorkingDays() {
  const days = [];
  let current = new Date();
  while (days.length < 5) {
    const day = current.getDay();
    if (day !== 5 && day !== 6) {
      days.push(current.toISOString().split('T')[0]);
    }
    current.setDate(current.getDate() - 1);
  }
  return days.reverse();
}
function filterDataByDate(attendance, days) {
  return attendance.filter((item) => days.includes(item.date));
}
function groupByDay(attendance, days) {
  return days.map((date) => {
    const dayData = attendance.filter((a) => a.date === date);
    const total = dayData.length || 1;
    const present = dayData.filter((a) => a.status === 'ontime').length;
    const late = dayData.filter((a) => a.status === 'late').length;
    const leave = dayData.filter((a) => a.status === 'leave').length;
    return {
      x: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      present: Math.round((present / total) * 100),
      late: Math.round((late / total) * 100),
      leave: Math.round((leave / total) * 100),
    };
  });
}

function getEmployeeAttendance(attendance, employeeId) {
  const days = getWorkingDays();
  return attendance.filter(
    (record) => record.user_id === employeeId && days.includes(record.date)
  );
}
function getManagerAttendance(attendance, department) {
  const days = getWorkingDays();

  return attendance.filter(
    (record) => record.department === department && days.includes(record.date)
  );
}

export async function getWeeklyChartData(user) {
  const attendance = await fetchChartData();
  const last5Days = getWorkingDays();

  let scopedAttendance = attendance;

  if (user?.role === 'manager') {
    scopedAttendance = getManagerAttendance(attendance, user?.department);
  }

  if (user?.role === 'employee') {
    scopedAttendance = getEmployeeAttendance(attendance, user?.id);
  }

  return groupByDay(scopedAttendance, last5Days);
}

export async function getMonthlyAttendanceChart(user) {
  const attendance = await fetchChartData();
  const now = new Date();

  let scoped = attendance;

  if (user?.role === 'manager') {
    scoped = scoped.filter((a) => a.department === user?.department_id);
  }

  if (user?.role === 'employee') {
    scoped = scoped.filter((a) => a.user_id === user?.id);
  }

  scoped = scoped.filter((a) => {
    const d = new Date(a.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const map = {};

  scoped.forEach((a) => {
    if (!map[a.date]) {
      map[a.date] = {
        x: a.day,
        date: a.date,
        ontime: 0,
        late: 0,
        leave: 0,
      };
    }

    map[a.date][a.status]++;
  });

  // 4️⃣ return ordered days
  return Object.values(map).sort((a, b) => new Date(a.date) - new Date(b.date));
}
