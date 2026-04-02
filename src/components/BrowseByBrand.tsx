import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const brands = [
  { name: "Toyota", logo: "https://www.carlogos.org/car-logos/toyota-logo-2020-europe.png" },
  { name: "Mazda", logo: "https://www.carlogos.org/car-logos/mazda-logo-2018.png" },
  { name: "Subaru", logo: "https://www.carlogos.org/car-logos/subaru-logo-2019.png" },
  { name: "Nissan", logo: "https://www.carlogos.org/car-logos/nissan-logo-2020.png" },
  { name: "Honda", logo: "https://www.carlogos.org/car-logos/honda-logo-2000.png" },
  { name: "Mercedes", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png" },
  { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo-2020.png" },
  { name: "Mitsubishi", logo: "https://www.carlogos.org/car-logos/mitsubishi-logo-2020.png" },
  { name: "Suzuki", logo: "https://www.carlogos.org/car-logos/suzuki-logo-2019.png" },
  { name: "Volkswagen", logo: "https://www.carlogos.org/car-logos/volkswagen-logo-2019.png" },
  { name: "Land Rover", logo: "https://www.carlogos.org/car-logos/land-rover-logo-2020.png" },
  { name: "Isuzu", logo: "https://www.carlogos.org/car-logos/isuzu-logo-2022.png" },
  { name: "Ford", logo: "https://www.carlogos.org/car-logos/ford-logo-2017.png" },
  { name: "Audi", logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png" },
  { name: "Lexus", logo: "https://www.carlogos.org/car-logos/lexus-logo-2022.png" },
  { name: "Hyundai", logo: "https://www.carlogos.org/car-logos/hyundai-logo-2011.png" },
  { name: "Kia", logo: "https://www.carlogos.org/car-logos/kia-logo-2021.png" },
  { name: "Peugeot", logo: "https://www.carlogos.org/car-logos/peugeot-logo-2010.png" },
  { name: "Renault", logo: "https://www.carlogos.org/car-logos/renault-logo-2021.png" },
];

const BrowseByBrand = () => (
  <section className="py-14 md:py-20 bg-muted/40">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Browse by Brand</h2>
        <p className="text-sm text-muted-foreground mt-1.5">Find cars from your favourite manufacturer</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Link
              to={`/cars?make=${brand.name.toLowerCase().replace(" ", "+")}`}
              className="hover-lift flex flex-col items-center gap-3 py-5 px-3 rounded-xl bg-card border border-border shadow-sm text-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xl font-bold text-muted-foreground">${brand.name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground">{brand.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrowseByBrand;
