import HeaderBar from "@/components/HeaderBar";
import StatsPanel from "@/components/StatsPanel";
import CenterCharts from "@/components/CenterCharts";
import RightPanel from "@/components/RightPanel";
import DataTable from "@/components/DataTable";

const Index = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <HeaderBar />
      <div className="flex-1 flex flex-col gap-3 p-3 min-h-0">
        {/* 3-column grid */}
        <div className="flex-1 grid grid-cols-[1fr_2fr_1fr] gap-3 min-h-0">
          <StatsPanel />
          <CenterCharts />
          <RightPanel />
        </div>
        {/* Bottom table */}
        <div className="h-[200px] min-h-0">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
