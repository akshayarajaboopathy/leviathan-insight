import { Activity, Upload, Play, Download } from "lucide-react";
import { useRef, useState } from "react";
import { useData } from "@/context/DataContext";
import { parseUploadedFile } from "@/utils/fileParser";
import { exportCSV, exportExcel } from "@/utils/exportData";
import { toast } from "sonner";

const HeaderBar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, setData, isUploading, setIsUploading } = useData();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const parsed = await parseUploadedFile(file);
      setData(parsed);
      toast.success(`Dataset loaded: ${parsed.total_sequences.toLocaleString()} sequences, ${parsed.unique_species} species`);
    } catch (err: any) {
      toast.error(err.message || "Failed to parse file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
          <span className="text-xs font-medium opacity-80">
            {isUploading ? "Processing..." : "System Active"}
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.tsv,.json,.txt"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="btn-secondary-outline flex items-center gap-2 !border-white/20 !text-white/80 hover:!text-white hover:!border-white/40 !bg-transparent disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {isUploading ? "Uploading..." : "Upload Dataset"}
        </button>

        <button className="btn-primary flex items-center gap-2">
          <Play className="w-3.5 h-3.5" />
          Start Analysis
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="btn-secondary-outline flex items-center gap-2 !border-white/20 !text-white/80 hover:!text-white hover:!border-white/40 !bg-transparent"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[160px]">
                <button
                  onClick={() => { exportCSV(data); setShowExportMenu(false); toast.success("CSV exported"); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  📄 Export as CSV
                </button>
                <button
                  onClick={() => { exportExcel(data); setShowExportMenu(false); toast.success("Excel exported"); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors border-t border-border"
                >
                  📊 Export as Excel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
