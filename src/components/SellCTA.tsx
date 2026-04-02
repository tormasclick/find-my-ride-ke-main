import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SellCTA = () => (
  <section className="py-14 md:py-20 bg-secondary relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(0 0% 100%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(0 0% 100%) 0%, transparent 50%)' }} />
    <div className="container mx-auto px-4 text-center space-y-6 relative">
      <h2 className="text-2xl md:text-4xl font-display font-extrabold text-secondary-foreground">Ready to Sell Your Car?</h2>
      <p className="text-secondary-foreground/80 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
        Submit your car for verification and reach thousands of buyers across Kenya. Free listing after verification.
      </p>
      <Link
        to="/cars"
        className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95 shadow-md"
      >
        List Your Car <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default SellCTA;
