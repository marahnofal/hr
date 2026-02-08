
import { Cell, Pie, PieChart } from 'recharts';

const COLORS = ['#89C43D', '#FEB85B', '#F45B69'];

export default function MonthlyPieChart({ data }) {
  return (
    <PieChart
      style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
    >
      <Pie
        data={data}
        dataKey="value"
        labelLine={false}
        isAnimationActive
      >
        {data.map((entry, index) => (
          <Cell
            key={entry.name}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}