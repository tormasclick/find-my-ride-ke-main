import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Calculator } from "lucide-react";
import logo from "@/assets/logo.png";

const browseItems = [
  { label: "All Cars", href: "/cars" },
  { label: "Used Imported", href: "/cars?type=imported" },
  { label: "Locally Used", href: "/cars?type=local" },
  { label: "Commercial Vehicles", href: "/cars?type=commercial" },
  { label: "SUV", href: "/cars?body=suv" },
  { label: "Pickup Trucks", href: "/cars?body=pickup" },
  { label: "Hybrid Cars", href: "/cars?fuel=hybrid" },
  { label: "Electric Cars", href: "/cars?fuel=electric" },
];

const brandItems = [
  { label: "Toyota", href: "/cars?make=toyota" },
  { label: "Mazda", href: "/cars?make=mazda" },
  { label: "Subaru", href: "/cars?make=subaru" },
  { label: "Nissan", href: "/cars?make=nissan" },
  { label: "Honda", href: "/cars?make=honda" },
  { label: "Mercedes", href: "/cars?make=mercedes" },
  { label: "BMW", href: "/cars?make=bmw" },
  { label: "View All Brands →", href: "/cars" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border/60 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="AutoQuest" className="w-auto" style={{ height: "56px" }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="relative" onMouseEnter={() => setBrowseOpen(true)} onMouseLeave={() => setBrowseOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-accent transition-colors">
              Buy Cars <ChevronDown className={`w-3.5 h-3.5 transition-transform ${browseOpen ? "rotate-180" : ""}`} />
            </button>
            {browseOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-lg border border-border shadow-xl py-1.5 animate-fade-in">
                {browseItems.map(item => (
                  <Link key={item.href} to={item.href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/sell" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-accent transition-colors">Sell Your Car</Link>
          <Link to="/value-my-car" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-accent transition-colors">Check Car Value</Link>
          <Link to="/cars/trending" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-accent transition-colors">Popular Cars</Link>

          <div className="relative" onMouseEnter={() => setBrandOpen(true)} onMouseLeave={() => setBrandOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-accent transition-colors">
              Browse by Brand <ChevronDown className={`w-3.5 h-3.5 transition-transform ${brandOpen ? "rotate-180" : ""}`} />
            </button>
            {brandOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-card rounded-lg border border-border shadow-xl py-1.5 animate-fade-in">
                {brandItems.map(item => (
                  <Link key={item.href + item.label} to={item.href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/cars" className="ml-2 text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
            Find a Car
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2 hover:bg-accent rounded-md transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Buy Cars</p>
              <div className="grid grid-cols-2 gap-1">
                {browseItems.map(item => (
                  <Link key={item.href} to={item.href} className="py-2 px-3 text-sm text-foreground hover:bg-accent rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-1">
              <Link to="/sell" className="block py-2 px-3 text-sm font-medium text-foreground hover:bg-accent rounded-md" onClick={() => setMobileOpen(false)}>Sell Your Car</Link>
              <Link to="/value-my-car" className="flex items-center gap-2 py-2.5 px-4 text-sm font-semibold bg-secondary text-secondary-foreground rounded-lg" onClick={() => setMobileOpen(false)}>
                <Calculator className="w-4 h-4" /> Check Car Value
              </Link>
              <Link to="/cars/trending" className="block py-2 px-3 text-sm font-medium text-foreground hover:bg-accent rounded-md" onClick={() => setMobileOpen(false)}>Popular Cars</Link>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Browse by Brand</p>
              <div className="grid grid-cols-3 gap-1">
                {brandItems.slice(0, -1).map(item => (
                  <Link key={item.label} to={item.href} className="py-2 px-3 text-sm text-foreground hover:bg-accent rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
