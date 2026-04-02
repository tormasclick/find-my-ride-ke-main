import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cars, filterCars, searchCars, LOCATIONS, BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from "@/lib/carData";
import CarCard from "@/components/CarCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";

interface AccordionFilterProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionFilter = ({ title, children, defaultOpen = false }: AccordionFilterProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground">
        {title}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <div className="pb-3 space-y-2">{children}</div>
      </motion.div>
    </div>
  );
};

const CarsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const q = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(q);

  const filters = Object.fromEntries(searchParams.entries());
  delete filters.q;

  const filteredCars = useMemo(() => {
    let result = filterCars(cars, filters);
    if (q) result = searchCars(q, result);
    return result;
  }, [searchParams]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    else params.delete("q");
    setSearchParams(params);
  };

  const clearAll = () => setSearchParams({});

  const SelectFilter = ({ filterKey, options, placeholder }: { filterKey: string; options: string[]; placeholder: string }) => (
    <select
      value={searchParams.get(filterKey) || ""}
      onChange={e => updateFilter(filterKey, e.target.value)}
      className="w-full px-2 py-1.5 rounded border border-input bg-card text-xs text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o.toLowerCase()}>{o}</option>)}
    </select>
  );

  const sidebar = (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </h3>
        <button onClick={clearAll} className="text-xs text-secondary hover:underline">Clear all</button>
      </div>

      <AccordionFilter title="Price (KES)" defaultOpen>
        <div className="flex gap-2">
          <input type="number" placeholder="Min: 300,000" value={searchParams.get("minPrice") || ""} onChange={e => updateFilter("minPrice", e.target.value)} className="w-full px-2 py-1.5 rounded border border-input bg-card text-xs text-foreground" />
          <input type="number" placeholder="Max: 8,000,000" value={searchParams.get("maxPrice") || ""} onChange={e => updateFilter("maxPrice", e.target.value)} className="w-full px-2 py-1.5 rounded border border-input bg-card text-xs text-foreground" />
        </div>
      </AccordionFilter>

      <AccordionFilter title="Mileage">
        <input type="number" placeholder="Max mileage (km)" value={searchParams.get("maxMileage") || ""} onChange={e => updateFilter("maxMileage", e.target.value)} className="w-full px-2 py-1.5 rounded border border-input bg-card text-xs text-foreground" />
      </AccordionFilter>

      <AccordionFilter title="Location" defaultOpen>
        <SelectFilter filterKey="location" options={LOCATIONS} placeholder="All locations" />
      </AccordionFilter>

      <AccordionFilter title="Brand" defaultOpen>
        <SelectFilter filterKey="make" options={BRANDS} placeholder="All brands" />
      </AccordionFilter>

      <AccordionFilter title="Body Type">
        <SelectFilter filterKey="body" options={BODY_TYPES} placeholder="All body types" />
      </AccordionFilter>

      <AccordionFilter title="Fuel Type">
        <SelectFilter filterKey="fuel" options={FUEL_TYPES} placeholder="All fuel types" />
      </AccordionFilter>

      <AccordionFilter title="Transmission">
        <SelectFilter filterKey="transmission" options={TRANSMISSIONS} placeholder="All" />
      </AccordionFilter>

      <AccordionFilter title="Year">
        <div className="flex gap-2">
          <input type="number" placeholder="From" value={searchParams.get("minYear") || ""} onChange={e => updateFilter("minYear", e.target.value)} className="w-full px-2 py-1.5 rounded border border-input bg-card text-xs text-foreground" />
          <input type="number" placeholder="To" value={searchParams.get("maxYear") || ""} onChange={e => updateFilter("maxYear", e.target.value)} className="w-full px-2 py-1.5 rounded border border-input bg-card text-xs text-foreground" />
        </div>
      </AccordionFilter>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Search bar */}
      <div className="bg-muted py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search cars..."
              className="w-full pl-10 pr-20 py-2.5 rounded-md border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded text-xs font-semibold">Search</button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1">
        {/* Mobile filter toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mb-4 flex items-center gap-2 text-sm font-medium text-primary">
          <SlidersHorizontal className="w-4 h-4" /> {sidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 flex-shrink-0`}>
            <div className="bg-card rounded-lg border border-border p-4 sticky top-20">
              {sidebar}
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filteredCars.length} cars found</p>
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg font-medium">No cars match your filters</p>
                <button onClick={clearAll} className="mt-2 text-sm text-primary hover:underline">Clear all filters</button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarsPage;
