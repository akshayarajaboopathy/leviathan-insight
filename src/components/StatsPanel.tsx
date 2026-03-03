import { Dna, Microscope, Star, BarChart3 } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useData } from "@/context/DataContext";

const StatCard = ({
  label,
  value,
  display,
  icon: Icon,
  format,
  delay,
}: {
  label: string;
  value: number;
  display?: string;
  icon: React.ElementType;
  format: string;
  delay: number;
}) => {
  const animatedValue = useCountUp(
    format === "text" ? 0 : value,
    1200 + delay * 150,
    format === "decimal" ? 2 : 0
  );

  return (
    <div
      className="stat-card animate-slide-up flex-1 flex flex-col justify-center"
      style={{ animationDelay: `${delay * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="icon-circle">
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground tracking-tight">
        {format === "text"
          ? display
          : format === "decimal"
          ? animatedValue.toFixed(2)
          : animatedValue.toLocaleString()}
      </div>
      <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const StatsPanel = () => {
  const { data } = useData();

  const stats = [
    { label: "Total Sequences", value: data.total_sequences, icon: Dna, format: "number" },
    { label: "Unique Species", value: data.unique_species, icon: Microscope, format: "number" },
    { label: "Most Abundant", value: 0, display: data.most_abundant, icon: Star, format: "text" },
    { label: "Shannon Index", value: data.biodiversity_index, icon: BarChart3, format: "decimal" },
  ];

  return (
    <div className="flex flex-col gap-3 h-full">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} delay={i} />
      ))}
    </div>
  );
};

export default StatsPanel;
