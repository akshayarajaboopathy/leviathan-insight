import { useState, useMemo } from "react";
import { useData } from "@/context/DataContext";
import { Search, ArrowUpDown } from "lucide-react";

type SortKey = "species" | "count" | "percentage" | "cluster" | "confidence";

const DataTable = () => {
  const { data } = useData();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("count");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let rows = data.table_data;
    if (search) {
      rows = rows.filter((d) =>
        d.species.toLowerCase().includes(search.toLowerCase())
      );
    }
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string") return sortAsc ? (av as string).localeCompare(bv as string) : (bv as string).localeCompare(av as string);
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
  }, [search, sortKey, sortAsc, data.table_data]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const headers: { key: SortKey; label: string }[] = [
    { key: "species", label: "Species Name" },
    { key: "count", label: "Sequence Count" },
    { key: "percentage", label: "Percentage" },
    { key: "cluster", label: "Cluster ID" },
    { key: "confidence", label: "Confidence" },
  ];

  return (
    <div className="panel animate-slide-up flex flex-col max-h-[220px]" style={{ animationDelay: "500ms", animationFillMode: "both" }}>
      <div className="panel-header justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Biodiversity Table
        </span>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search species..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs bg-muted rounded-md pl-8 pr-3 py-1.5 border border-border focus:outline-none focus:ring-1 focus:ring-primary w-48"
          />
        </div>
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {headers.map((h) => (
                <th key={h.key} onClick={() => toggleSort(h.key)} className="table-header-cell cursor-pointer hover:text-foreground transition-colors select-none">
                  <span className="flex items-center gap-1">
                    {h.label}
                    <ArrowUpDown className="w-3 h-3 opacity-40" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.species} className={`border-b border-border/50 transition-colors hover:bg-muted/50 ${i === 0 ? "bg-accent/30" : ""}`}>
                <td className="table-cell font-medium">{row.species}</td>
                <td className="table-cell font-mono text-xs">{row.count.toLocaleString()}</td>
                <td className="table-cell font-mono text-xs">{row.percentage}%</td>
                <td className="table-cell">
                  <span className="bg-secondary text-secondary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">{row.cluster}</span>
                </td>
                <td className="table-cell font-mono text-xs">
                  <span className={row.confidence >= 0.93 ? "confidence-high" : "confidence-medium"}>
                    {(row.confidence * 100).toFixed(0)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
