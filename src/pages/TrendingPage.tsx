import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cars, trendingModels } from "@/lib/carData";
import CarCard from "@/components/CarCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TrendingPage = () => {
  const trendingCars = trendingModels
    .map(tm => cars.find(c => c.make === tm.make && c.model === tm.model))
    .filter(Boolean) as typeof cars;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-1">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-7 h-7 text-secondary" />
          <h1 className="text-3xl font-display font-bold text-foreground">Popular Cars in Kenya</h1>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trendingCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrendingPage;
