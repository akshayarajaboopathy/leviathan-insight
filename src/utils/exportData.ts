import * as XLSX from "xlsx";
import type { BiodiversityData } from "@/context/DataContext";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportCSV(data: BiodiversityData) {
  const headers = ["Species Name", "Sequence Count", "Percentage", "Cluster ID", "Confidence Score"];
  const rows = data.table_data.map((r) =>
    [r.species, r.count, r.percentage, r.cluster, r.confidence].join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv" }), "leviathan_report.csv");
}

export function exportExcel(data: BiodiversityData) {
  const wb = XLSX.utils.book_new();

  // Summary sheet
  const summaryData = [
    ["LEVIATHAN – eDNA Biodiversity Report"],
    [],
    ["Metric", "Value"],
    ["Total Sequences", data.total_sequences],
    ["Unique Species", data.unique_species],
    ["Most Abundant Species", data.most_abundant],
    ["Shannon Biodiversity Index", data.biodiversity_index],
  ];
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

  // Species table sheet
  const tableHeaders = ["Species Name", "Sequence Count", "Percentage (%)", "Cluster ID", "Confidence Score"];
  const tableRows = data.table_data.map((r) => [r.species, r.count, r.percentage, r.cluster, r.confidence]);
  const tableWs = XLSX.utils.aoa_to_sheet([tableHeaders, ...tableRows]);
  XLSX.utils.book_append_sheet(wb, tableWs, "Species Data");

  // Distribution sheet
  const distHeaders = ["Species", "Count"];
  const distRows = data.species_distribution.map((d) => [d.name, d.count]);
  const distWs = XLSX.utils.aoa_to_sheet([distHeaders, ...distRows]);
  XLSX.utils.book_append_sheet(wb, distWs, "Distribution");

  // Clusters sheet
  const clusterHeaders = ["Cluster ID", "Name", "Species Count", "Abundance"];
  const clusterRows = data.clusters.map((c) => [c.id, c.name, c.species, c.abundance]);
  const clusterWs = XLSX.utils.aoa_to_sheet([clusterHeaders, ...clusterRows]);
  XLSX.utils.book_append_sheet(wb, clusterWs, "Clusters");

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  downloadBlob(new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "leviathan_report.xlsx");
}
