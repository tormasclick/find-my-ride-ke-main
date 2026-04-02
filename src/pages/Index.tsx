import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import LatestCars from "@/components/LatestCars";
import BrowseByBrand from "@/components/BrowseByBrand";
import TrustSection from "@/components/TrustSection";
import TrendingModels from "@/components/TrendingModels";
import SellCTA from "@/components/SellCTA";
import Footer from "@/components/Footer";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("aq_popup_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("aq_popup_dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-card rounded-xl p-8 max-w-sm mx-4 shadow-2xl border border-border text-center space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={dismiss} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-display font-bold text-foreground">Looking to Buy or Sell a Car?</h3>
            <p className="text-sm text-muted-foreground">Find verified cars across Kenya or get your car's value instantly.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { dismiss(); navigate("/cars"); }}
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Cars
              </button>
              <button
                onClick={() => { dismiss(); navigate("/value-my-car"); }}
                className="border border-border text-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-accent transition-colors"
              >
                Check My Car Value
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <HeroCarousel />
    <LatestCars />
    <TrendingModels />
    <BrowseByBrand />
    <TrustSection />
    <SellCTA />
    <Footer />
    <WelcomePopup />
  </div>
);

export default Index;
