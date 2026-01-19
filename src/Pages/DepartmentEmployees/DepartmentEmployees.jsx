import React from 'react'
import employeesData from './employeesData'
import Table from '../../Components/Table/Table'
import Initials from '../../Components/Initials/Initials'
import { useParams } from 'react-router-dom'

export default function DepartmentEmployees() {
  const{department}=useParams()
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: info => (
        <div className="flex gap-2 items-center">
          <Initials name={info.getValue()} />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: 'Employee ID', accessorKey: 'id' },
    { header: 'Designation', accessorKey: 'designation' },
  ]

  const departmentEmployees = employeesData.filter(
    employee => employee.department === department
  )

  return <Table column={columns} rows={departmentEmployees} />
}
