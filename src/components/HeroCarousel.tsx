import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

const slides = [
  {
    headline: "Find Your Next Car in Kenya",
    subtext: "Browse verified vehicles across Kenya with transparent pricing.",
    primaryCTA: { label: "Browse Cars", href: "/cars" },
    secondaryCTA: { label: "See Popular Models", href: "/cars/trending" },
    image: heroSlide1,
  },
  {
    headline: "Sell Your Car the Smart Way",
    subtext: "Submit your vehicle, we verify it and connect you with serious buyers.",
    primaryCTA: { label: "Sell Your Car", href: "/sell" },
    secondaryCTA: { label: "Check Your Car Value", href: "/value-my-car" },
    image: heroSlide2,
  },
  {
    headline: "What Is Your Car Worth?",
    subtext: "Get an instant estimate based on Kenyan market data.",
    primaryCTA: { label: "Check Car Value", href: "/value-my-car" },
    image: heroSlide3,
  },
  {
    headline: "Hot Listings This Week",
    subtext: "Explore the most requested cars across Kenya.",
    primaryCTA: { label: "View Hot Listings", href: "/cars" },
    image: heroSlide4,
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center min-h-[420px] md:min-h-[480px] py-10 md:py-0 gap-8 lg:gap-12">
          {/* Left: Text + CTA */}
          <div className="flex-1 lg:w-[55%] z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-5"
              >
                <h1 className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground leading-tight">
                  {slide.headline}
                </h1>
                <p className="text-primary-foreground/65 text-base md:text-lg max-w-lg leading-relaxed">
                  {slide.subtext}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    onClick={() => navigate(slide.primaryCTA.href)}
                    className="bg-secondary text-secondary-foreground px-7 py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-secondary/25"
                  >
                    {slide.primaryCTA.label}
                  </button>
                  {slide.secondaryCTA && (
                    <button
                      onClick={() => navigate(slide.secondaryCTA!.href)}
                      className="border border-primary-foreground/25 text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-primary-foreground/10 transition-all active:scale-95"
                    >
                      {slide.secondaryCTA.label}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/25 hover:bg-primary-foreground/40"}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 lg:w-[45%] relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl shadow-foreground/10"
              >
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                  width={1280}
                  height={720}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors z-20 hidden md:flex">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors z-20 hidden md:flex">
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
};

export default HeroCarousel;
