import CardState from './../../Components/CardState/CardState';
import users2 from '../../assets/users2.png';
import Calender from '../../Components/Calender/Calender';
import AttendanceChart from '../../Components/AttendanceChart/AtendanceChart';
import { tasks } from '../../assets/data';
import Table from '../../Components/Table/Table';

import attendanceData from './rows';

export default function Admin() {
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <img
            src={info.row.original.image}
            alt={info.getValue()}
            className="h-[36px] w-[36px] rounded-full"
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    { header: 'Designation', accessorKey: 'designation' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Check In Time', accessorKey: 'checkIn' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue() === 'Late'
              ? 'bg-red-100 text-red-500'
              : 'bg-green-100 text-green-500'
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="grid w-full grid-cols-3">
        <div className="col-span-3 ms-5 grid w-full grid-cols-1 gap-2 md:col-span-2 md:grid-cols-2">
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CardState
              image={users2}
              title={'Total Employee'}
              records={560}
              percentage={12}
            />
          </div>

          <div className="col-span-3 md:col-span-2">
            <AttendanceChart />
            <Table column={columns} rows={attendanceData} />
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <Calender tasks={tasks} />
        </div>
      </div>
    </>
  );
}
