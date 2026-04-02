import { useState } from "react";
import { Link } from "react-router-dom";
import { cars } from "@/lib/carData";
import CarCard from "./CarCard";
import { ArrowRight } from "lucide-react";

const INITIAL_COUNT = 12;
const LOAD_MORE = 4;

const LatestCars = () => {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const latest = cars.slice(0, visible);
  const hasMore = visible < cars.length;

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Latest Listings</h2>
            <p className="text-sm text-muted-foreground mt-1">Fresh arrivals from across Kenya</p>
          </div>
          <Link to="/cars" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible(v => Math.min(v + LOAD_MORE, cars.length))}
              className="bg-card border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold hover:bg-accent hover:border-accent transition-colors shadow-sm"
            >
              Load More Cars
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCars;
