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
      className="stat-card animate-slide-up flex-1 flex flex-col justify-center p-3"
      style={{ animationDelay: `${delay * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between mb-1.5">
        <div className="icon-circle w-8 h-8">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-xl font-bold text-foreground tracking-tight">
        {format === "text"
          ? display
          : format === "decimal"
          ? animatedValue.toFixed(2)
          : animatedValue.toLocaleString()}
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">
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
    <div className="flex flex-col gap-2 h-full">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} delay={i} />
      ))}
    </div>
  );
};

export default StatsPanel;
