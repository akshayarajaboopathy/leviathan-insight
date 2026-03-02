import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { mockData, CHART_COLORS } from "@/data/mockData";
import { useEffect, useState } from "react";

const ClusterTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="panel px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground">{d.species} species</p>
      <p className="text-muted-foreground">{d.abundance.toLocaleString()} sequences</p>
    </div>
  );
};

const ClusterChart = () => {
  return (
    <div className="panel animate-fade-slow" style={{ animationDelay: "300ms" }}>
      <div className="panel-header">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cluster Visualization
        </span>
      </div>
      <div className="p-2" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
            <ZAxis type="number" dataKey="abundance" range={[200, 2000]} />
            <Tooltip content={<ClusterTooltip />} />
            <Scatter data={mockData.clusters} animationBegin={500} animationDuration={800}>
              {mockData.clusters.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={0.75} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AnalysisLog = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= mockData.log_entries.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel animate-fade-slow flex flex-col" style={{ animationDelay: "400ms", flex: 1 }}>
      <div className="panel-header">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Analysis Log
        </span>
      </div>
      <div className="terminal-box flex-1 overflow-y-auto p-3 m-2 rounded">
        {mockData.log_entries.slice(0, visibleCount).map((entry, i) => (
          <div key={i} className="flex gap-2 mb-1 animate-count-up">
            <span className="opacity-50">[{entry.time}]</span>
            <span>▸ {entry.message}</span>
          </div>
        ))}
        {visibleCount < mockData.log_entries.length && (
          <span className="inline-block w-1.5 h-3.5 bg-current animate-pulse ml-1" />
        )}
      </div>
    </div>
  );
};

const RightPanel = () => (
  <div className="flex flex-col gap-3 h-full">
    <ClusterChart />
    <AnalysisLog />
  </div>
);

export default RightPanel;
