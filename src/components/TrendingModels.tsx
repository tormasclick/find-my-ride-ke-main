import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { trendingModels } from "@/lib/carData";

const TrendingModels = () => (
  <section className="py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Popular Cars in Kenya</h2>
            <p className="text-sm text-muted-foreground">Most searched models this month</p>
          </div>
        </div>
        <Link to="/cars/trending" className="text-sm font-semibold text-primary hover:underline underline-offset-4 hidden sm:block">See all →</Link>
      </div>
      <div className="flex flex-wrap gap-3">
        {trendingModels.map((m, i) => (
          <motion.div key={`${m.make}-${m.model}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
            <Link
              to={`/cars?model=${m.model.toLowerCase()}`}
              className="hover-lift inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-sm font-semibold text-foreground shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
            >
              {m.make} {m.model}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrendingModels;
