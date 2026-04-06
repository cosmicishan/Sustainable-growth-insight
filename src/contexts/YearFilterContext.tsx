import { createContext, useContext, useState, ReactNode } from "react";

interface YearFilterContextType {
  yearRange: [number, number];
  setYearRange: (range: [number, number]) => void;
}

const YearFilterContext = createContext<YearFilterContextType>({
  yearRange: [2006, 2024],
  setYearRange: () => {},
});

export function YearFilterProvider({ children }: { children: ReactNode }) {
  const [yearRange, setYearRange] = useState<[number, number]>([2006, 2024]);
  return (
    <YearFilterContext.Provider value={{ yearRange, setYearRange }}>
      {children}
    </YearFilterContext.Provider>
  );
}

export function useYearFilter() {
  return useContext(YearFilterContext);
}
