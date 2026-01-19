import React, { useEffect, useState } from "react";
import Table from "./../../Components/Table/Table";
import employeesData from "./employeesData";
import { Link } from "react-router-dom";
import Search from "../../Components/Search/Search";
import Initials from "../../Components/Initials/Initials";
import CardEdit from "../../Components/CardEdit/CardEdit";
import { useAuth } from "../../context/ThemeContext/AuthContext";

export default function AllEmployees() {
  const {user}=useAuth();
  const [employees, setEmployees] = useState([]);
  const update = (emp) => {
    setEmployees((prev) =>
      prev.map((e) => {
        if (e.employeeId === emp.employeeId) {
          return emp;
        }
        return e;
      })
    );
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <Initials name={info.getValue()} />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: "Emplyee ID", accessorKey: "employeeId" },
    { header: "Designation", accessorKey: "designation" },
    { header: "Department", accessorKey: "department" },

    { header: "Type", accessorKey: "type" },
    { header: "Status", accessorKey: "status" },
    {
      header: "Action",
      cell: (info) => (
        <CardEdit update={update} data={info.row.original} remove={remove} />
      ),
    },
  ];
  const [search, setSearch] = useState("");
  const filteredData = employees.filter((emp) => {
    return emp.name.toLowerCase().includes(search.toLowerCase());
  });
  const remove = (emp) => {
    setEmployees((prev) => prev.filter((e) => e.employeeId !== emp.employeeId));
  };
  

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between pe-5  w-full">
          <form className="md:max-w-md ">
            <label
              htmlFor="search"
              className="block mb-2.5 text-sm font-medium text-heading sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <Search search={search} setSearch={setSearch} />
            </div>
          </form>
          <button className="text-white bg-green rounded-xl p-3 ">
            <Link to="/allemployees/addemployee">Add New Employee</Link>
          </button>
        </div>

        <Table column={columns} rows={filteredData} />
      </div>
    </>
  );
}
