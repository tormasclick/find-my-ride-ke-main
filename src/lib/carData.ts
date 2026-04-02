export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  location: string;
  type: "imported" | "local" | "commercial";
  image: string;
  images?: string[];
  verified: boolean;
  color?: string;
  seats?: number;
  engineSize?: string;
  driveType?: string;
  condition?: string;
}

export const LOCATIONS = ["Nairobi", "Mombasa", "Kiambu", "Nakuru", "Eldoret", "Kisumu"];
export const BRANDS = ["Toyota", "Mazda", "Subaru", "Nissan", "Mercedes", "BMW", "Honda", "Mitsubishi", "Suzuki", "Volkswagen", "Land Rover", "Isuzu", "Ford", "Audi", "Lexus", "Hyundai", "Kia", "Peugeot", "Renault"];
export const BODY_TYPES = ["Sedan", "SUV", "Hatchback", "Pickup", "Van", "Wagon", "Coupe"];
export const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];
export const TRANSMISSIONS = ["Automatic", "Manual"];

const carImages = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
];

export const cars: Car[] = [
  { id: "1", make: "Toyota", model: "Axio", year: 2017, price: 1450000, mileage: 68000, fuel: "Petrol", transmission: "Automatic", bodyType: "Sedan", location: "Nairobi", type: "imported", image: carImages[0], images: [carImages[0], carImages[1], carImages[2], carImages[3]], verified: true, color: "White", seats: 5, engineSize: "1500cc", driveType: "FWD", condition: "Excellent" },
  { id: "2", make: "Mazda", model: "Demio", year: 2016, price: 980000, mileage: 54000, fuel: "Petrol", transmission: "Automatic", bodyType: "Hatchback", location: "Mombasa", type: "imported", image: carImages[1], images: [carImages[1], carImages[2], carImages[0]], verified: true, color: "Red", seats: 5, engineSize: "1300cc", driveType: "FWD", condition: "Good" },
  { id: "3", make: "Subaru", model: "Forester", year: 2018, price: 3200000, mileage: 42000, fuel: "Petrol", transmission: "Automatic", bodyType: "SUV", location: "Nairobi", type: "imported", image: carImages[2], images: [carImages[2], carImages[3], carImages[4], carImages[5]], verified: true, color: "Silver", seats: 5, engineSize: "2000cc", driveType: "AWD", condition: "Excellent" },
  { id: "4", make: "Toyota", model: "Prado", year: 2015, price: 5800000, mileage: 98000, fuel: "Diesel", transmission: "Automatic", bodyType: "SUV", location: "Kiambu", type: "local", image: carImages[3], images: [carImages[3], carImages[0], carImages[5]], verified: true, color: "Black", seats: 7, engineSize: "2800cc", driveType: "4WD", condition: "Good" },
  { id: "5", make: "Mazda", model: "CX-5", year: 2019, price: 3650000, mileage: 35000, fuel: "Petrol", transmission: "Automatic", bodyType: "SUV", location: "Nairobi", type: "imported", image: carImages[4], images: [carImages[4], carImages[5], carImages[0], carImages[1]], verified: true, color: "Blue", seats: 5, engineSize: "2200cc", driveType: "AWD", condition: "Excellent" },
  { id: "6", make: "Toyota", model: "Fielder", year: 2016, price: 1250000, mileage: 72000, fuel: "Petrol", transmission: "Automatic", bodyType: "Wagon", location: "Nakuru", type: "imported", image: carImages[5], images: [carImages[5], carImages[0], carImages[1]], verified: true, color: "Grey", seats: 5, engineSize: "1500cc", driveType: "FWD", condition: "Good" },
  { id: "7", make: "Nissan", model: "X-Trail", year: 2017, price: 2400000, mileage: 58000, fuel: "Petrol", transmission: "Automatic", bodyType: "SUV", location: "Nairobi", type: "imported", image: carImages[0], images: [carImages[0], carImages[2], carImages[4]], verified: true, color: "White", seats: 5, engineSize: "2000cc", driveType: "AWD", condition: "Good" },
  { id: "8", make: "Honda", model: "Fit", year: 2018, price: 1100000, mileage: 45000, fuel: "Hybrid", transmission: "Automatic", bodyType: "Hatchback", location: "Mombasa", type: "imported", image: carImages[1], images: [carImages[1], carImages[3], carImages[5]], verified: true, color: "Silver", seats: 5, engineSize: "1500cc", driveType: "FWD", condition: "Excellent" },
  { id: "9", make: "Mercedes", model: "C200", year: 2016, price: 3800000, mileage: 62000, fuel: "Petrol", transmission: "Automatic", bodyType: "Sedan", location: "Nairobi", type: "local", image: carImages[2], images: [carImages[2], carImages[4], carImages[0], carImages[5]], verified: true, color: "Black", seats: 5, engineSize: "2000cc", driveType: "RWD", condition: "Excellent" },
  { id: "10", make: "BMW", model: "X3", year: 2017, price: 4200000, mileage: 55000, fuel: "Diesel", transmission: "Automatic", bodyType: "SUV", location: "Kiambu", type: "imported", image: carImages[3], images: [carImages[3], carImages[1], carImages[5]], verified: true, color: "Navy", seats: 5, engineSize: "2000cc", driveType: "AWD", condition: "Good" },
  { id: "11", make: "Toyota", model: "Hilux", year: 2019, price: 4500000, mileage: 38000, fuel: "Diesel", transmission: "Manual", bodyType: "Pickup", location: "Eldoret", type: "local", image: carImages[4], images: [carImages[4], carImages[2], carImages[0]], verified: true, color: "White", seats: 5, engineSize: "2400cc", driveType: "4WD", condition: "Excellent" },
  { id: "12", make: "Nissan", model: "NV350", year: 2018, price: 2800000, mileage: 65000, fuel: "Diesel", transmission: "Manual", bodyType: "Van", location: "Kisumu", type: "commercial", image: carImages[5], images: [carImages[5], carImages[3], carImages[1]], verified: true, color: "White", seats: 12, engineSize: "2500cc", driveType: "RWD", condition: "Good" },
  { id: "13", make: "Toyota", model: "Aqua", year: 2017, price: 1350000, mileage: 48000, fuel: "Hybrid", transmission: "Automatic", bodyType: "Hatchback", location: "Nairobi", type: "imported", image: carImages[0], images: [carImages[0], carImages[4], carImages[2]], verified: true, color: "Pearl White", seats: 5, engineSize: "1500cc", driveType: "FWD", condition: "Good" },
  { id: "14", make: "Subaru", model: "Impreza", year: 2016, price: 1650000, mileage: 70000, fuel: "Petrol", transmission: "Automatic", bodyType: "Sedan", location: "Nakuru", type: "imported", image: carImages[1], images: [carImages[1], carImages[5], carImages[3]], verified: true, color: "Blue", seats: 5, engineSize: "1600cc", driveType: "AWD", condition: "Good" },
  { id: "15", make: "Toyota", model: "Land Cruiser", year: 2014, price: 7500000, mileage: 120000, fuel: "Diesel", transmission: "Automatic", bodyType: "SUV", location: "Nairobi", type: "local", image: carImages[2], images: [carImages[2], carImages[0], carImages[4], carImages[5]], verified: true, color: "Black", seats: 7, engineSize: "4500cc", driveType: "4WD", condition: "Good" },
  { id: "16", make: "Nissan", model: "Leaf", year: 2018, price: 1800000, mileage: 32000, fuel: "Electric", transmission: "Automatic", bodyType: "Hatchback", location: "Nairobi", type: "imported", image: carImages[3], images: [carImages[3], carImages[1], carImages[5]], verified: true, color: "White", seats: 5, engineSize: "Electric", driveType: "FWD", condition: "Excellent" },
];

export const trendingModels = [
  { make: "Toyota", model: "Axio" },
  { make: "Mazda", model: "Demio" },
  { make: "Subaru", model: "Forester" },
  { make: "Toyota", model: "Prado" },
  { make: "Mazda", model: "CX-5" },
  { make: "Toyota", model: "Fielder" },
];

export function formatPrice(price: number): string {
  return `KES ${price.toLocaleString()}`;
}

export function searchCars(query: string, carList: Car[]): Car[] {
  if (!query.trim()) return carList;
  const q = query.toLowerCase();
  
  // Parse price constraints like "under 1.5M" or "below 2M"
  const priceMatch = q.match(/(?:under|below|less than)\s*(\d+(?:\.\d+)?)\s*m/i);
  const maxPrice = priceMatch ? parseFloat(priceMatch[1]) * 1000000 : null;

  return carList.filter(car => {
    const text = `${car.make} ${car.model} ${car.bodyType} ${car.fuel} ${car.transmission}`.toLowerCase();
    const keywords = q.replace(/(?:under|below|less than)\s*\d+(?:\.\d+)?\s*m/i, '').trim().split(/\s+/).filter(Boolean);
    const matchesKeywords = keywords.length === 0 || keywords.every(kw => text.includes(kw));
    const matchesPrice = maxPrice ? car.price <= maxPrice : true;
    return matchesKeywords && matchesPrice;
  });
}

export function filterCars(carList: Car[], filters: Record<string, string | string[] | number[]>): Car[] {
  return carList.filter(car => {
    if (filters.type && car.type !== filters.type) return false;
    if (filters.body && car.bodyType.toLowerCase() !== (filters.body as string).toLowerCase()) return false;
    if (filters.fuel && car.fuel.toLowerCase() !== (filters.fuel as string).toLowerCase()) return false;
    if (filters.make && car.make.toLowerCase() !== (filters.make as string).toLowerCase()) return false;
    if (filters.model && car.model.toLowerCase() !== (filters.model as string).toLowerCase()) return false;
    if (filters.location && car.location.toLowerCase() !== (filters.location as string).toLowerCase()) return false;
    if (filters.transmission && car.transmission.toLowerCase() !== (filters.transmission as string).toLowerCase()) return false;
    if (filters.minPrice && car.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && car.price > Number(filters.maxPrice)) return false;
    if (filters.minYear && car.year < Number(filters.minYear)) return false;
    if (filters.maxYear && car.year > Number(filters.maxYear)) return false;
    if (filters.maxMileage && car.mileage > Number(filters.maxMileage)) return false;
    return true;
  });
}
