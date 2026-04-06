import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Download, Search } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { nationalTimeSeriesData } from "@/data/energyData";
import { useYearFilter } from "@/contexts/YearFilterContext";

type SortField = "year" | "solar" | "wind" | "hydro" | "biomass" | "waste" | "total" | "gsdp";

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("year");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const { yearRange } = useYearFilter();

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const data = useMemo(() => {
    let filtered = nationalTimeSeriesData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1]);
    if (search) {
      filtered = filtered.filter((d) => d.year.toString().includes(search));
    }
    return [...filtered].sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
  }, [yearRange, search, sortField, sortDir]);

  const exportCSV = () => {
    const headers = ["Year", "Solar", "Wind", "Small Hydro", "Bio-Mass", "Waste to Energy", "Total RE", "GSDP"];
    const rows = data.map((d) => [d.year, d.solar, d.wind, d.hydro, d.biomass, d.waste, d.total, d.gsdp].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sustainagrowth_india_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cols: { key: SortField; label: string }[] = [
    { key: "year", label: "Year" },
    { key: "solar", label: "Solar" },
    { key: "wind", label: "Wind" },
    { key: "hydro", label: "Hydro" },
    { key: "biomass", label: "Bio-Mass" },
    { key: "waste", label: "WtE" },
    { key: "total", label: "Total RE" },
    { key: "gsdp", label: "GSDP (₹ Cr)" },
  ];

  return (
    <section>
      <SectionHeader label="Data Explorer" title="National Energy Data Table" description="Search, sort, and export the full dataset used in this research." />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by year..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV} className="border-primary/30 text-primary hover:bg-primary/10">
            <Download className="h-4 w-4 mr-1.5" />
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {cols.map((col) => (
                  <TableHead key={col.key} className="cursor-pointer select-none text-xs whitespace-nowrap" onClick={() => toggleSort(col.key)}>
                    <span className="flex items-center gap-1">
                      {col.label}
                      <ArrowUpDown className={`h-3 w-3 ${sortField === col.key ? "text-primary" : "text-muted-foreground/50"}`} />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.year} className="border-border text-xs">
                  <TableCell className="font-mono font-semibold text-foreground">{row.year}</TableCell>
                  <TableCell>{row.solar.toLocaleString()}</TableCell>
                  <TableCell>{row.wind.toLocaleString()}</TableCell>
                  <TableCell>{row.hydro.toLocaleString()}</TableCell>
                  <TableCell>{row.biomass.toLocaleString()}</TableCell>
                  <TableCell>{row.waste.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-primary">{row.total.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-accent">{row.gsdp.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{data.length} records · All values in MW except GSDP (₹ Crore INR)</p>
      </motion.div>
    </section>
  );
}
