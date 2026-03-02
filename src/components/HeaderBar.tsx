import { Activity, Upload, Play, Download } from "lucide-react";

const HeaderBar = () => {
  return (
    <header className="header-bar flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal" />
            LEVIATHAN
            <span className="font-normal text-sm opacity-70 ml-1">
              – eDNA Biodiversity Intelligence System
            </span>
          </h1>
          <p className="text-xs opacity-50 mt-0.5">
            AI-Powered Marine Species Detection Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-4">
          <span className="status-dot" />
          <span className="text-xs font-medium opacity-80">System Active</span>
        </div>
        <button className="btn-secondary-outline flex items-center gap-2 !border-white/20 !text-white/80 hover:!text-white hover:!border-white/40 !bg-transparent">
          <Upload className="w-3.5 h-3.5" />
          Upload Dataset
        </button>
        <button className="btn-primary flex items-center gap-2">
          <Play className="w-3.5 h-3.5" />
          Start Analysis
        </button>
        <button className="btn-secondary-outline flex items-center gap-2 !border-white/20 !text-white/80 hover:!text-white hover:!border-white/40 !bg-transparent">
          <Download className="w-3.5 h-3.5" />
          Export Report
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
