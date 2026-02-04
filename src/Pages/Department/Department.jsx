import React, { useEffect, useState } from 'react';
import employeesData from './rows';
import { Link } from 'react-router-dom';
import departmentsData from './rows';
import api from './../../Services/api';
import Initials from '../../Components/Initials/Initials';



export default function Department() {
  const [allDepartment, setAllDepartment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/users');
        const data = res?.data;
        const groupedDepartments = Object.values(
          data?.reduce((acc, user) => {
            const dep = user.department_id;
            if (!acc[dep]) {
              acc[dep] = {
                id: dep,
                name: dep,
                employees: [],
              };
            }
            acc[dep].employees.push(user);
            return acc;
          }, {})
        );

        setAllDepartment(groupedDepartments);
        console.log(groupedDepartments);
        
      } catch (error) {
        console.log(error);
        
        toast.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="mx-6 grid grid-cols-1 gap-2 md:grid-cols-2">

        {allDepartment?.filter(d=>d.name!=='GLOBAL').map((dep) => (
         <div className="flex flex-col gap-2 mt-3 p-4 border-2 border-gray-600 dark:border-gray-300">
          <h2 className='text-2xl'>{dep.name}</h2>
          {dep.employees.slice(0, 5).map((emp) => (
            <div
              key={emp.id}
              className="flex items-center gap-3  rounded-lg p-2"
            >
              <div>
                <Initials name={emp.name}/>
              </div>

              <span >
                {emp.name}
              </span>

              

            </div>
            
          ))}
          <Link className='text-green-600 font-bold cursor-pointer' to={`/department/${dep.name}`}>View</Link>
        </div>
        
          
        ))}
      </div>
    </>
  );
}
