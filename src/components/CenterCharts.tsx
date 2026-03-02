import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useData } from "@/context/DataContext";
import { CHART_COLORS } from "@/data/mockData";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="panel px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground">
        {d.count.toLocaleString()} sequences ({d.percentage}%)
      </p>
    </div>
  );
};

const CenterCharts = () => {
  const { data } = useData();
  const total = data.species_distribution.reduce((s, d) => s + d.count, 0);
  const pieData = data.species_distribution.map((d) => ({
    ...d,
    percentage: ((d.count / total) * 100).toFixed(1),
  }));

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="panel flex-1 animate-fade-slow">
        <div className="panel-header">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Species Distribution
          </span>
        </div>
        <div className="p-2" style={{ height: "calc(100% - 44px)" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius="40%" outerRadius="72%" paddingAngle={2} dataKey="count" animationBegin={200} animationDuration={1000}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} formatter={(value: string) => <span className="text-muted-foreground">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel flex-1 animate-fade-slow" style={{ animationDelay: "200ms" }}>
        <div className="panel-header">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top Species by Abundance
          </span>
        </div>
        <div className="p-2" style={{ height: "calc(100% - 44px)" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.species_distribution} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(213, 20%, 45%)" }} />
              <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10, fill: "hsl(213, 20%, 45%)" }} />
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "6px", fontSize: "11px" }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} animationBegin={400} animationDuration={800}>
                {data.species_distribution.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CenterCharts;
