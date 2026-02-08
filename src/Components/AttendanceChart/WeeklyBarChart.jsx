import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function WeeklyBarChart({ data }) {
  return (
    <BarChart
      style={{ width: '100%', maxHeight: '60vh', aspectRatio: 1.618 }}
      data={data}
      margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar
        dataKey="present"
        stackId="a"
        fill="#89C43D"
        barSize={15}
        radius={[10, 10, 10, 10]}
      />
      <Bar
        dataKey="late"
        stackId="a"
        fill="#FEB85B"
        barSize={25}
        radius={[10, 10, 10, 10]}
      />
      <Bar
        dataKey="leave"
        stackId="a"
        fill="#F45B69"
        barSize={25}
        radius={[10, 10, 10, 10]}
      />
    </BarChart>
  );
}
