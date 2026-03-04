export const mockData = {
  total_sequences: 0,
  unique_species: 0,
  most_abundant: "—",
  biodiversity_index: 0,
  species_distribution: [],
  clusters: [],
  table_data: [],
  log_entries: [
    { time: new Date().toTimeString().slice(0, 8), message: "System ready — awaiting dataset upload" },
  ],
};

export const CHART_COLORS = [
  "hsl(174, 100%, 35%)",
  "hsl(213, 65%, 15%)",
  "hsl(174, 60%, 50%)",
  "hsl(213, 50%, 30%)",
  "hsl(174, 40%, 65%)",
  "hsl(200, 60%, 40%)",
  "hsl(190, 50%, 45%)",
  "hsl(220, 40%, 45%)",
  "hsl(170, 50%, 55%)",
  "hsl(210, 30%, 55%)",
];
