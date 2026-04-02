import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Fuel, Gauge, Calendar, BadgeCheck, Flame, Sparkles } from "lucide-react";
import { Car, formatPrice } from "@/lib/carData";

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const navigate = useNavigate();
  const slug = `${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`;
  const isNew = car.year >= 2019;
  const isHotDeal = car.price < 1500000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="hover-lift group rounded-xl overflow-hidden border border-border bg-card cursor-pointer shadow-sm"
      onClick={() => navigate(`/cars/${slug}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {car.verified && (
            <span className="flex items-center gap-1 bg-success/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-semibold text-success-foreground shadow-sm">
              <BadgeCheck className="w-3 h-3" /> Verified
            </span>
          )}
          {isNew && (
            <span className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-semibold text-primary-foreground shadow-sm">
              <Sparkles className="w-3 h-3" /> New
            </span>
          )}
          {isHotDeal && (
            <span className="flex items-center gap-1 bg-secondary/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-semibold text-secondary-foreground shadow-sm">
              <Flame className="w-3 h-3" /> Hot Deal
            </span>
          )}
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        <h3 className="font-display font-bold text-foreground text-[15px] leading-snug">
          {car.year} {car.make} {car.model}
        </h3>
        <p className="text-lg font-extrabold text-secondary">{formatPrice(car.price)}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" />{car.mileage.toLocaleString()} km</span>
          <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{car.fuel}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{car.transmission}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{car.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
