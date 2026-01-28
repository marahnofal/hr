import React, { use, useState } from 'react';
import Department from './../../Pages/Department/Department';

export default function CardEdit({ data, update, remove }) {
  const [opened, setOpened] = useState(false);
  const [emp, setEmp] = useState({ ...data });
  const handlesubmit = (e) => {
    e.preventDefault();
    update(emp);
    setOpened(false);
  };

  return (
    <>
      <div>
        {/* Modal toggle */}
        <div className="flex gap-3">
          <button onClick={() => setOpened(true)}>
            <i className="fa-regular fa-pen-to-square text-green-600"></i>
          </button>
          <button onClick={() => remove(emp)}>
            <i className="fa-solid fa-trash text-green-600"></i>
          </button>
        </div>
        {/* Main modal */}
        {opened && (
          <div
            id="employeeData"
            tabIndex={-1}
            className="fixed top-0 right-0 left-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-sm md:inset-0 "
          >
            <div className=" relative max-h-full w-full max-w-md rounded-md p-4 " >
              {/* Modal content */}
              <div className="bg-neutral-primary-soft border-green rounded-base relative p-4 shadow-sm md:p-6">
                {/* Modal header */}
                <div className=" flex items-center justify-between border-b pb-4 md:pb-5">
                  <h3 className="text-heading text-lg font-medium text-green-700">
                    {emp.name}
                  </h3>
                  <button
                    type="button"
                    className="text-body hover:bg-neutral-tertiary hover:text-heading rounded-base ms-auto inline-flex h-9 w-9 items-center justify-center bg-transparent text-sm"
                    onClick={() => setOpened(false)}
                  >
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form action="#" className="pt-4 md:pt-6">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="text-heading mb-2.5 block text-sm font-medium"
                    >
                      Designation
                    </label>
                    <select
                      name=""
                      id=""
                      onChange={(e) =>
                        setEmp({ ...emp, designation: e.target.value })
                      }
                    >
                      <option value="">{emp.designation}</option>
                      <option value="Junior">Junior</option>
                      <option value="Midsenior">Mid Senior</option>
                      <option value="TeamLeader">Team Leader</option>
                      <option value="ProjectManager">Project Manager</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="text-heading mb-2.5 block text-sm font-medium"
                    >
                      Type
                    </label>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setEmp({ ...emp, type: e.target.value })}
                    >
                      <option value="">{emp.typr}</option>
                      <option value="remote">Remoe</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="text"
                      className="text-heading mb-2.5 block text-sm font-medium"
                    >
                      Department
                    </label>
                    <select
                      name=""
                      id=""
                      onChange={(e) =>
                        setEmp({ ...emp, department: e.target.value })
                      }
                    >
                      <option value="">{emp.department}</option>
                      <option value="Frontend">Front-End</option>
                      <option value="backend">Back-End</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Design">Design</option>
                      <option value="Quality">Quality</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    onClick={handlesubmit}
                    className="bg-green hover:bg-brand-strong focus:ring-brand-medium rounded-base mb-3 box-border w-full border border-transparent px-4 py-2.5 text-sm leading-5 font-medium text-white shadow-xs focus:ring-4 focus:outline-none"
                  >
                    Apply Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
