import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import Table from '../../Components/Table/Table';
import api from '../../Services/api';
import Select from 'react-select';

export default function ShowTasks() {
  const { user } = useAuth();
  const [assignedTasks, setAssignedTasks] = useState([]);

  const taskState = [
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  async function controlTaskStatus(taskID, newStatus) {
    try {
      await api.patch(`/tasks/${taskID}`, {
        status: newStatus.value,
      });

      setAssignedTasks((prev) =>
        prev.map((task) =>
          task.id === taskID
            ? { ...task, status: newStatus.value }
            : task
        )
      );

      toast.success('Task status updated');
    } catch (err) {
      toast.error('Failed to update task status');
    }
  }

  const columns = useMemo(
    () => [
      { header: 'Assigned To', accessorKey: 'assigned_to' },
      { header: 'From', accessorKey: 'from_date' },
      { header: 'To', accessorKey: 'to_date' },
      { header: 'Description', accessorKey: 'description' },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <Select
            classNamePrefix="rs"
            className='w-[100%]'
            isSearchable={false}
            options={taskState}
            value={taskState.find(
              (o) => o.value === row.original.status
            )}
            onChange={(val) =>controlTaskStatus(row.original.id, val)
            }
            
          />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (!user) return;

    async function fetchTasks() {
      try {
        const res = await api.get('/tasks');
        let data = res?.data || [];

        if (user?.role === 'employee') {
          data = data.filter(
            (task) => task.assigned_to === user.id
          );
        }

        if (user?.role === 'manager') {
          data = data.filter(
            (task) => task?.assigned_to === user?.department_id
          );
        }

        setAssignedTasks(data);
      } catch (err) {
        toast.error('Failed to load tasks');
        console.log(err);
      }
    }

    fetchTasks();
  }, [user]);

  return (
    <>
    <div className='h-screen w-full '>
        <Table column={columns} rows={assignedTasks} />;
    </div>
    </>
  )
}
