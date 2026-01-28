import React from 'react';
import employeesData from './rows';
import { Link } from 'react-router-dom';
import departmentsData from './rows';

export default function Department() {
  return (
    <>
      <div className="mx-6 grid grid-cols-2 gap-2">
        {departmentsData.map((dep) => (
          <div className="col-span-1 border border-gray-400 text-center">
            <div className="flex flex-col gap-5 py-4">
              <p className="text-4xl font-bold text-gray-600">{dep.name}</p>
              <p className="text-lg text-gray-500">{dep.description}</p>
              <p className="text-2xl font-bold text-gray-600">
                <i className="fa-solid fa-user-group text-green"></i>
                {dep.employeesCount}
              </p>
              <Link to={`/department/${dep.name}`}>
                <i className="fa-solid fa-chevron-right text-green text-3xl font-extrabold"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
