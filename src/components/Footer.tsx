import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground py-14">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <img src={logo} alt="AutoQuest" className="h-9 w-auto brightness-[10]" />
          <p className="text-sm text-background/50 leading-relaxed">Drive Your Next Deal — Kenya's trusted car marketplace.</p>
        </div>
        <div>
          <h4 className="font-display font-bold text-background text-sm uppercase tracking-wider mb-4">Browse</h4>
          <ul className="space-y-2.5 text-sm text-background/50">
            <li><a href="/cars" className="hover:text-background transition-colors">All Cars</a></li>
            <li><a href="/cars?type=imported" className="hover:text-background transition-colors">Imported</a></li>
            <li><a href="/cars?type=local" className="hover:text-background transition-colors">Locally Used</a></li>
            <li><a href="/cars/trending" className="hover:text-background transition-colors">Trending</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-background text-sm uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2.5 text-sm text-background/50">
            <li><a href="/cars?body=suv" className="hover:text-background transition-colors">SUV</a></li>
            <li><a href="/cars?body=sedan" className="hover:text-background transition-colors">Sedan</a></li>
            <li><a href="/cars?fuel=hybrid" className="hover:text-background transition-colors">Hybrid</a></li>
            <li><a href="/cars?fuel=electric" className="hover:text-background transition-colors">Electric</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-background text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/50">
            <li className="flex items-center gap-2.5"><MapPin className="w-4 h-4 flex-shrink-0" /> Nairobi, Kenya</li>
            <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 flex-shrink-0" /> +254 700 000 000</li>
            <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 flex-shrink-0" /> hello@autoquest.co.ke</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-background/10 text-center text-xs text-background/30">
        © {new Date().getFullYear()} AutoQuest. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
