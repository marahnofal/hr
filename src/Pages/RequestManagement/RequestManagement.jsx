import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Initials from '../../Components/Initials/Initials';
import Search from '../../Components/Search/Search';
import Table from '../../Components/Table/Table';
import { useAuth } from '../../context/ThemeContext/AuthContext';

import api from './../../Services/api';
import { useLoading } from '../../context/LoaderContext';

export default function RequestManagement() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [leaveRequest, setLeaveRequest] = useState([]);
  const [status, setStatus] = useState('');
  const { loading, setLoading } = useLoading();
  async function statusManagement(leaveId, newStatus) {
    try {
      await api.patch(`/leaves/${leaveId}`, {
        status: newStatus,
      });

      setLeaveRequest((prev) =>
        prev.map((leave) =>
          leave.id === leaveId ? { ...leave, status: newStatus } : leave
        )
      );

      toast.success(`Request ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update request status');
    }
  }
  const statusOptions = [
    { value: 'All', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await api.get('/leaves');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let data = res?.data;
        if (user?.role === 'employee') {
          data = data?.filter((leave) => leave.userId === user.id);
        }
        if (user?.role === 'manager') {
          data = data?.filter(
            (leave) => leave.department === user.department_id
          );
        }
        setLeaveRequest(data);
      } catch (err) {
        toast.error('failed to connect');
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const columns = [
    {
      header: 'Employee Name',
      accessorKey: 'name',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Initials name={info.getValue()} />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: 'Employee ID', accessorKey: 'userID' },

    { header: 'Type', accessorKey: 'type' },
    { header: 'From', accessorKey: 'from' },
    { header: 'To', accessorKey: 'to' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const row = info.row.original;

        return row.status === 'pending' &&
          (user.role === 'manager' || 'admin') ? (
          <div className="flex gap-1">
            <button
              onClick={() => statusManagement(row.id, 'rejected')}
              className="w-22 rounded-lg bg-red-500 text-white"
            >
              Reject
            </button>
            <button
              onClick={() => statusManagement(row.id, 'approved')}
              className="bg-green w-22 rounded-lg text-white"
            >
              Accept
            </button>
          </div>
        ) : (
          <p
            className={
              row.status === 'approved'
                ? 'text-green-600'
                : row.status === 'pending'
                  ? 'text-amber-500'
                  : 'text-red-500'
            }
          >
            {row.status}
          </p>
        );
      },
    },
  ];
  const filteredLeaveRequest = leaveRequest?.filter((row) =>
    filter === 'All' ? true : row.status === filter
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:justify-between">
          <Search />
          <div className="flex items-center">
            <i className="fa-solid fa-filter text-green"></i>
            <Select
              value={statusOptions.find((o) => o.value === filter)}
              onChange={(option) => setFilter(option.value)}
              options={statusOptions}
              isSearchable={false}
              className="w-full sm:w-56"
              classNamePrefix="rs"
            />
          </div>
        </div>
        <div className="mx-auto h-screen w-[90%]">
          <Table column={columns} rows={filteredLeaveRequest} />
        </div>
      </div>
    </>
  );
}
