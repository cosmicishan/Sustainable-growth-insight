import { Slider } from "@/components/ui/slider";
import { useYearFilter } from "@/contexts/YearFilterContext";
import { Calendar } from "lucide-react";

export default function YearRangeFilter() {
  const { yearRange, setYearRange } = useYearFilter();

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-2.5">
      <Calendar className="h-4 w-4 text-primary shrink-0" />
      <span className="text-xs font-mono text-primary font-semibold whitespace-nowrap">{yearRange[0]}</span>
      <Slider
        value={yearRange}
        onValueChange={(v) => setYearRange(v as [number, number])}
        min={2006}
        max={2024}
        step={1}
        minStepsBetweenThumbs={1}
        className="w-32 md:w-48"
      />
      <span className="text-xs font-mono text-primary font-semibold whitespace-nowrap">{yearRange[1]}</span>
    </div>
  );
}
