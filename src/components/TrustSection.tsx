import { ShieldCheck, Eye, BadgeCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every car is inspected and verified before it's published on our platform." },
  { icon: Eye, title: "Transparent Pricing", desc: "See real market prices in KES with no hidden charges or surprises." },
  { icon: BadgeCheck, title: "Trusted Platform", desc: "Thousands of Kenyans trust AutoQuest to find their next car." },
];

const TrustSection = () => (
  <section className="py-14 md:py-20 bg-primary">
    <div className="container mx-auto px-4 text-center space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">Why AutoQuest?</h2>
        <p className="text-primary-foreground/50 text-sm mt-2">The trusted way to buy and sell cars in Kenya</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map(item => (
          <div key={item.title} className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
              <item.icon className="w-8 h-8 text-primary-foreground/80" />
            </div>
            <h3 className="font-display font-bold text-primary-foreground text-lg">{item.title}</h3>
            <p className="text-sm text-primary-foreground/60 max-w-xs mx-auto leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
