import React, { useEffect, useState } from 'react';
import employeesData from './employeesData';
import Table from '../../Components/Table/Table';
import Initials from '../../Components/Initials/Initials';
import { useParams } from 'react-router-dom';
import api from '../../Services/api';

export default function DepartmentEmployees() {
  const { department } = useParams();
  const [departmentData, setDepartmentData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/users');
        let data = res?.data;
        data = data.filter((d) => d?.department_id === department);
        setDepartmentData(data);
      } catch (error) {
        toast.error(error);
      }
    }
    

    fetchData();
  }, [department]);
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
    { header: 'Designation', accessorKey: 'job_title' },
  ];

  const departmentEmployees = employeesData.filter(
    (employee) => employee.department === department
  );

  return <Table column={columns} rows={departmentData} />;
}
