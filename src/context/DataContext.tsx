import { createContext, useContext, useState, ReactNode } from "react";
import { mockData as defaultData } from "@/data/mockData";

export type SpeciesDistribution = { name: string; count: number };
export type Cluster = { id: string; name: string; species: number; abundance: number; x: number; y: number };
export type TableRow = { species: string; count: number; percentage: number; cluster: string; confidence: number };
export type LogEntry = { time: string; message: string };

export interface BiodiversityData {
  total_sequences: number;
  unique_species: number;
  most_abundant: string;
  biodiversity_index: number;
  species_distribution: SpeciesDistribution[];
  clusters: Cluster[];
  table_data: TableRow[];
  log_entries: LogEntry[];
}

interface DataContextType {
  data: BiodiversityData;
  setData: (data: BiodiversityData) => void;
  isUploading: boolean;
  setIsUploading: (v: boolean) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<BiodiversityData>(defaultData);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <DataContext.Provider value={{ data, setData, isUploading, setIsUploading }}>
      {children}
    </DataContext.Provider>
  );
};
