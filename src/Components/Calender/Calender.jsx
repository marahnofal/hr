import { useState } from "react";

export default function Calendar({tasks}) {

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());


  

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDate = (date) =>
    date.toISOString().split("T")[0];


  const days = Array(firstDay)
    .fill(null)
    .concat(
      Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );


  const selectedDayTasks = tasks.filter(
    (task) => task.date === formatDate(selectedDate)
  );


  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));


  


  return (
    <div className="w-[414px] mx-auto p-4 grid grid-cols-1 gap-6 h-full ">


      <div className="bg-white p-4 rounded shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth}>&lt;</button>
          <h2 className="font-bold">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>

        
        <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const isToday =
              day &&
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            const isSelected =
              day &&
              day === selectedDate.getDate() &&
              month === selectedDate.getMonth() &&
              year === selectedDate.getFullYear();

            const dayTasks = tasks.filter(
              (t) =>
                day &&
                t.date === formatDate(new Date(year, month, day))
            );

            return (
              <div
                key={idx}
                onClick={() =>
                  day && setSelectedDate(new Date(year, month, day))
                }
                className={`
                  h-14 rounded flex flex-col items-center justify-center cursor-pointer
                  ${day ? "hover:bg-green-100" : ""}
                  ${isToday ? "bg-green text-white" : ""}
                  ${isSelected && !isToday ? "ring-2 ring-green-400" : ""}
                `}
              >
                <span>{day}</span>

                {/* Dots */}
                <div className="flex gap-1 mt-1">
                  {dayTasks.length>0&& (
                    <span
                      
                      className={`w-2 h-2 rounded-full bg-green-500`}
                    ></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">
          Tasks for {selectedDate.toDateString()}
        </h3>

        {selectedDayTasks.length === 0 ? (
          <p className="text-gray-500">No tasks for this day</p>
        ) : (
          <ul className="space-y-2">
            {selectedDayTasks.map((task) => (
              <li
                key={task.id}
                className="p-3 border border-gray-100 rounded flex gap-5 items-center"
              >
                <span className="text-xl font-bold relative after:absolute after:start-[120%] after:w-1 after:h-9 after:bg-gradient-to-t after:from-green-100 after:to-green-400 after:rounded-xl  ">{task.time}</span>
                <div className="flex flex-col">
                  <p >{task.type}</p>
                  <h2 className="font-bold text-xl">{task.title}</h2>
                </div>
            
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
