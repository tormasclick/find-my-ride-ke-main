import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BadgeCheck, Gauge, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cars, formatPrice } from "@/lib/carData";

const hotListings = [
  cars.find(c => c.model === "Axio")!,
  cars.find(c => c.model === "Demio")!,
  cars.find(c => c.model === "Forester")!,
  cars.find(c => c.model === "Prado")!,
  cars.find(c => c.model === "CX-5")!,
].filter(Boolean);

const quickFilters = [
  { label: "SUV", href: "/cars?body=suv" },
  { label: "Under 1.5M", href: "/cars?maxPrice=1500000" },
  { label: "Hybrid", href: "/cars?fuel=hybrid" },
  { label: "Diesel", href: "/cars?fuel=diesel" },
  { label: "Imported", href: "/cars?type=imported" },
  { label: "Sedan", href: "/cars?body=sedan" },
];

const SmartSearch = () => {
  const [query, setQuery] = useState("");
  const [currentHot, setCurrentHot] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHot(prev => (prev + 1) % hotListings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/cars?q=${encodeURIComponent(query.trim())}`);
  };

  const visibleHot = [
    hotListings[currentHot],
    hotListings[(currentHot + 1) % hotListings.length],
    hotListings[(currentHot + 2) % hotListings.length],
  ];

  return (
    <section className="relative bg-primary py-12 md:py-16 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Search */}
          <div className="flex-1 lg:w-[62%] space-y-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-display font-extrabold text-primary-foreground mb-2 leading-tight">
                Find Your Perfect Car<br className="hidden md:block" /> in Kenya
              </h1>
              <p className="text-primary-foreground/60 text-sm md:text-base">
                Search thousands of verified listings across Kenya
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Try: Prado diesel, Axio under 1.5M, 7 seater SUV..."
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg shadow-primary-foreground/5"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {quickFilters.map(f => (
                <button
                  key={f.label}
                  onClick={() => navigate(f.href)}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-all border border-primary-foreground/15 active:scale-95"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Hot Listings */}
          <div className="hidden lg:flex lg:w-[38%] flex-col">
            <h3 className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-widest mb-4">🔥 Hot Right Now</h3>
            <div className="space-y-3 flex-1">
              <AnimatePresence mode="wait">
                {visibleHot.map((car, i) => (
                  <motion.div
                    key={`${car.id}-${(currentHot + i) % hotListings.length}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-3 bg-primary-foreground/8 rounded-xl p-3 cursor-pointer hover:bg-primary-foreground/12 transition-all group/hot"
                    onClick={() => navigate(`/cars/${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`)}
                  >
                    <img src={car.image} alt={car.model} className="w-24 h-[72px] rounded-lg object-cover group-hover/hot:scale-105 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary-foreground truncate">
                        {car.make} {car.model}
                        {car.verified && <BadgeCheck className="inline w-3.5 h-3.5 ml-1 text-success" />}
                      </p>
                      <p className="text-sm font-bold text-secondary mt-0.5">{formatPrice(car.price)}</p>
                      <div className="flex gap-3 text-[11px] text-primary-foreground/50 mt-1">
                        <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />{car.year}</span>
                        <span className="flex items-center gap-0.5"><Gauge className="w-3 h-3" />{car.mileage.toLocaleString()}km</span>
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{car.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSearch;
