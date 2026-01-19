import { useState } from 'react';

export default function Calendar({ tasks }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDate = (date) => date.toISOString().split('T')[0];

  const days = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const selectedDayTasks = tasks.filter(
    (task) => task.date === formatDate(selectedDate)
  );

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="mx-auto grid h-full w-[414px] grid-cols-1 gap-6 p-4">
      <div className="rounded p-4 shadow">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth}>&lt;</button>
          <h2 className="font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>

        <div className="mb-2 grid grid-cols-7 text-center text-gray-500">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
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
              (t) => day && t.date === formatDate(new Date(year, month, day))
            );

            return (
              <div
                key={idx}
                onClick={() =>
                  day && setSelectedDate(new Date(year, month, day))
                }
                className={`flex h-14 cursor-pointer flex-col items-center justify-center rounded ${day ? 'hover:bg-green-100' : ''} ${isToday ? 'bg-green text-white' : ''} ${isSelected && !isToday ? 'ring-2 ring-green-400' : ''} `}
              >
                <span>{day}</span>

                {/* Dots */}
                <div className="mt-1 flex gap-1">
                  {dayTasks.length > 0 && (
                    <span
                      className={`h-2 w-2 rounded-full bg-green-500`}
                    ></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded p-4 shadow">
        <h3 className="mb-3 text-xl font-semibold">
          Tasks for {selectedDate.toDateString()}
        </h3>

        {selectedDayTasks.length === 0 ? (
          <p className="text-gray-500">No tasks for this day</p>
        ) : (
          <ul className="space-y-2">
            {selectedDayTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-5 rounded border border-gray-100 p-3"
              >
                <span className="relative text-xl font-bold after:absolute after:start-[120%] after:h-9 after:w-1 after:rounded-xl after:bg-gradient-to-t after:from-green-100 after:to-green-400">
                  {task.time}
                </span>
                <div className="flex flex-col">
                  <p>{task.type}</p>
                  <h2 className="text-xl font-bold">{task.title}</h2>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
