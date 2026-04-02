import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Fuel, Gauge, Calendar, BadgeCheck, ArrowLeft,
  MessageCircle, Phone, User, Shield, ChevronLeft, ChevronRight,
  Car, Palette, Users, Cog, Compass, FileCheck, ClipboardCheck
} from "lucide-react";
import { cars, formatPrice } from "@/lib/carData";
import CarCard from "@/components/CarCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CarDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const car = cars.find(c => {
    const s = `${c.make.toLowerCase()}-${c.model.toLowerCase()}-${c.year}`;
    return s === slug;
  });

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg font-medium text-foreground">Car not found</p>
            <button onClick={() => navigate("/cars")} className="text-sm text-primary hover:underline">Browse all cars</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : [car.image];
  const similarCars = cars.filter(c => c.id !== car.id && (c.bodyType === car.bodyType || c.make === car.make)).slice(0, 6);

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed at ${formatPrice(car.price)} on AutoQuest.`);
  const whatsappUrl = `https://wa.me/254700000000?text=${whatsappMsg}`;

  const prevImg = () => setActiveImg(prev => (prev - 1 + images.length) % images.length);
  const nextImg = () => setActiveImg(prev => (prev + 1) % images.length);

  const specs = [
    { icon: Gauge, label: "Mileage", value: `${car.mileage.toLocaleString()} km` },
    { icon: Fuel, label: "Fuel", value: car.fuel },
    { icon: Cog, label: "Transmission", value: car.transmission },
    { icon: Car, label: "Body Type", value: car.bodyType },
    { icon: Compass, label: "Drive Type", value: car.driveType || "N/A" },
    { icon: Calendar, label: "Year", value: String(car.year) },
    { icon: Palette, label: "Colour", value: car.color || "N/A" },
    { icon: Users, label: "Seats", value: car.seats ? String(car.seats) : "N/A" },
    { icon: Cog, label: "Engine Size", value: car.engineSize || "N/A" },
    { icon: Shield, label: "Condition", value: car.condition || "N/A" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-6 flex-1">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-xl overflow-hidden aspect-[16/10] bg-muted">
              <img src={images[activeImg]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
              {car.verified && (
                <span className="absolute top-3 left-3 flex items-center gap-1 bg-success px-3 py-1 rounded-full text-xs font-medium text-success-foreground">
                  <BadgeCheck className="w-4 h-4" /> Verified Listing
                </span>
              )}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-foreground/50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-foreground/50 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="text-2xl font-bold text-secondary mt-1">{formatPrice(car.price)}</p>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap gap-3">
              {car.verified && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-semibold">
                  <BadgeCheck className="w-4 h-4" /> Verified Listing
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                <FileCheck className="w-4 h-4" /> Logbook Verified
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-semibold">
                <ClipboardCheck className="w-4 h-4" /> Inspection Passed
              </span>
            </div>

            {/* Full Specs Grid */}
            <div className="bg-card rounded-xl border border-border p-5 space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> Vehicle Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {specs.map(spec => (
                  <div key={spec.label} className="bg-muted/60 rounded-lg p-3 text-center">
                    <spec.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                    <p className="text-[11px] text-muted-foreground">{spec.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-6 space-y-5 sticky top-20">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <User className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">AutoQuest Seller</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {car.location}</p>
                </div>
              </div>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full bg-success text-success-foreground py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-success/20 animate-[pulse_3s_ease-in-out_infinite]"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </motion.a>

              <button className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary py-3 rounded-xl text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> Call Seller
              </button>

              <button className="w-full border border-border text-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
                Request Callback
              </button>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-display font-bold text-foreground mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {similarCars.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CarDetailPage;
