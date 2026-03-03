import HeaderBar from "@/components/HeaderBar";
import StatsPanel from "@/components/StatsPanel";
import CenterCharts from "@/components/CenterCharts";
import RightPanel from "@/components/RightPanel";
import DataTable from "@/components/DataTable";
import { DataProvider } from "@/context/DataContext";

const Index = () => {
  return (
    <DataProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-background">
        <HeaderBar />
        <div className="flex-1 flex flex-col gap-2 p-2 min-h-0 overflow-hidden">
          <div className="flex-[3] grid grid-cols-[1fr_2fr_1fr] gap-2 min-h-0 overflow-hidden">
            <StatsPanel />
            <CenterCharts />
            <RightPanel />
          </div>
          <div className="flex-[1] min-h-0">
            <DataTable />
          </div>
        </div>
      </div>
    </DataProvider>
  );
};

export default Index;
