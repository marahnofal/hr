import { avatar } from '../../assets/data';

const attendanceData = [
  {
    id: 1,
    name: 'Leasie Watson',
    designation: 'Team Lead - Frontend',
    type: 'Office',
    checkIn: '9:27 AM',
    status: 'On Time',
    image:avatar,
    date:'22-10-2025'
  },
  {
    id: 2,
    name: 'John Carter',
    designation: 'Backend Developer',
    type: 'Remote',
    checkIn: '9:45 AM',
    status: 'Late',
    image:avatar
  },
  {
    id: 3,
    name: 'Sara Miles',
    designation: 'UI/UX Designer',
    type: 'Office',
    checkIn: '9:15 AM',
    status: 'On Time',
    image:avatar
  },
];

export default attendanceData;
