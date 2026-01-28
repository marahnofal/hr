import React, { useState } from 'react';
import Table from '../../Components/Table/Table';
import employeesData from './../Department/rows';
import Initials from '../../Components/Initials/Initials';
import { leaveData } from './leaves';
import Search from '../../Components/Search/Search';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import Select from 'react-select';
export default function RequestManagement() {
  const user = useAuth();
  const [filter, setFilter] = useState('All');
  const [leaveRequest, setLeaveRequest] = useState(leaveData);
  function statusManagement(id, status) {
    setLeaveRequest((prev) =>
      prev.map((item) =>
        item.leaveId === id ? { ...item, status: status } : item
      )
    );
  }
  const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' },
];

  const columns = [
    {
      header: 'Employee Name',
      accessorKey: 'employeeName',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Initials name={info.getValue()} />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: 'Employee ID', accessorKey: 'employeeID' },

    { header: 'Type', accessorKey: 'type' },
    { header: 'From', accessorKey: 'fromDate' },
    { header: 'To', accessorKey: 'toDate' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const row = info.row.original;

        return row.status === 'Pending' ? (
          <div className="flex gap-1">
            <button
              onClick={() => statusManagement(row.leaveId, 'Rejected')}
              className="w-22 rounded-lg bg-red-500 text-white"
            >
              Reject
            </button>
            <button
              onClick={() => statusManagement(row.leaveId, 'Approved')}
              className="bg-green p w-22 rounded-lg text-white"
            >
              Accept
            </button>
          </div>
        ) : (
          <p
            className={
              row.status === 'Approved' ? 'text-green-600' : 'text-red-500'
            }
          >
            {row.status}
          </p>
        );
      },
    },
  ];
  const filteredLeaveRequest = leaveRequest.filter((row) =>
    filter === 'All' ? true : row.status === filter
  );

  return (
    <>
      <div className="flex justify-between">
        <Search />
        <div className="flex items-center">
          <i className="fa-solid fa-filter text-green"></i>
    <Select
  value={statusOptions.find(o => o.value === filter)}
  onChange={(option) => setFilter(option.value)}
  options={statusOptions}
  isSearchable={false}
  className="w-full sm:w-56"
  classNamePrefix="rs"
/>
        </div>
      </div>
      <div className="mx-auto w-[90%]">
        <Table column={columns} rows={filteredLeaveRequest} />
      </div>
    </>
  );
}
