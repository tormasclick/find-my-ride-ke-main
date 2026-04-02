import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Truck, Zap, Leaf, Container, Compass } from "lucide-react";

const categories = [
  { label: "SUV", icon: Compass, href: "/cars?body=suv", color: "bg-blue-50 text-blue-600" },
  { label: "Sedan", icon: Car, href: "/cars?body=sedan", color: "bg-purple-50 text-purple-600" },
  { label: "Pickup Trucks", icon: Truck, href: "/cars?body=pickup", color: "bg-amber-50 text-amber-600" },
  { label: "Hybrid", icon: Leaf, href: "/cars?fuel=hybrid", color: "bg-emerald-50 text-emerald-600" },
  { label: "Electric", icon: Zap, href: "/cars?fuel=electric", color: "bg-cyan-50 text-cyan-600" },
  { label: "Commercial", icon: Container, href: "/cars?type=commercial", color: "bg-rose-50 text-rose-600" },
];

const PopularCategories = () => (
  <section className="py-14 md:py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Browse by Category</h2>
        <p className="text-sm text-muted-foreground mt-1">Find exactly what you're looking for</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={cat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Link
              to={cat.href}
              className="hover-lift flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border text-center shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-foreground">{cat.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularCategories;
