import { useState } from "react";
import { Calculator, ChevronRight, ChevronLeft } from "lucide-react";
import { BRANDS, LOCATIONS, FUEL_TYPES, TRANSMISSIONS, formatPrice } from "@/lib/carData";

const models: Record<string, string[]> = {
  Toyota: ["Axio", "Fielder", "Prado", "Land Cruiser", "Hilux", "Aqua", "Vitz", "Harrier"],
  Mazda: ["Demio", "CX-5", "Axela", "Atenza"],
  Subaru: ["Forester", "Impreza", "Outback", "XV"],
  Nissan: ["X-Trail", "Note", "Leaf", "NV350"],
  Mercedes: ["C200", "E250", "GLC"],
  BMW: ["X3", "X5", "320i"],
  Honda: ["Fit", "Vezel", "CR-V"],
};

const conditions = ["Excellent", "Good", "Fair", "Needs Repair"];

const ValueMyCarTool = () => {
  const [step, setStep] = useState(1);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null);

  const handleEstimate = () => {
    const basePrice = 2000000;
    const ageDeduction = (2026 - Number(year)) * 120000;
    const mileageDeduction = (Number(mileage) / 10000) * 50000;
    const conditionMultiplier = condition === "Excellent" ? 1.1 : condition === "Good" ? 1 : condition === "Fair" ? 0.85 : 0.7;
    const val = Math.max(300000, (basePrice - ageDeduction - mileageDeduction) * conditionMultiplier);
    setEstimate({ low: Math.round(val * 0.92), high: Math.round(val * 1.08) });
    setStep(5);
  };

  const canNext = () => {
    if (step === 1) return make && model && year;
    if (step === 2) return mileage && fuel && transmission;
    if (step === 3) return condition && location;
    if (step === 4) return true;
    return false;
  };

  const selectClass = "w-full px-3 py-2.5 rounded-md border border-input bg-card text-sm text-foreground";
  const inputClass = selectClass;

  return (
    <section id="value-my-car" className="py-12 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Value My Car</h2>
          </div>
          <p className="text-muted-foreground text-sm">Get an instant estimate of your car's market value in Kenya.</p>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`w-8 h-1 rounded-full transition-colors ${step >= s ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-3 text-left">
              <label className="block text-sm font-medium text-foreground">Make</label>
              <select value={make} onChange={e => { setMake(e.target.value); setModel(""); }} className={selectClass}>
                <option value="">Select brand</option>
                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <label className="block text-sm font-medium text-foreground">Model</label>
              <select value={model} onChange={e => setModel(e.target.value)} className={selectClass} disabled={!make}>
                <option value="">Select model</option>
                {(models[make] || []).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <label className="block text-sm font-medium text-foreground">Year</label>
              <input type="number" placeholder="e.g. 2018" value={year} onChange={e => setYear(e.target.value)} className={inputClass} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 text-left">
              <label className="block text-sm font-medium text-foreground">Mileage (km)</label>
              <input type="number" placeholder="e.g. 65000" value={mileage} onChange={e => setMileage(e.target.value)} className={inputClass} />
              <label className="block text-sm font-medium text-foreground">Fuel Type</label>
              <select value={fuel} onChange={e => setFuel(e.target.value)} className={selectClass}>
                <option value="">Select fuel</option>
                {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <label className="block text-sm font-medium text-foreground">Transmission</label>
              <select value={transmission} onChange={e => setTransmission(e.target.value)} className={selectClass}>
                <option value="">Select</option>
                {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 text-left">
              <label className="block text-sm font-medium text-foreground">Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} className={selectClass}>
                <option value="">Select condition</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className="block text-sm font-medium text-foreground">Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} className={selectClass}>
                <option value="">Select location</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3 text-left">
              <label className="block text-sm font-medium text-foreground">Contact (Phone or WhatsApp)</label>
              <input type="text" placeholder="+254 7XX XXX XXX" value={contact} onChange={e => setContact(e.target.value)} className={inputClass} />
              <p className="text-xs text-muted-foreground">Optional. We'll use this to help you sell your car.</p>
            </div>
          )}

          {step === 5 && estimate && (
            <div className="bg-card rounded-lg p-6 border border-border space-y-3">
              <p className="text-muted-foreground text-sm">Estimated Market Value</p>
              <p className="text-2xl font-bold text-secondary">
                {formatPrice(estimate.low)} – {formatPrice(estimate.high)}
              </p>
              <p className="text-xs text-muted-foreground">{year} {make} {model} · {mileage}km · {condition}</p>
              <button
                onClick={() => {/* future: navigate to sell page */}}
                className="mt-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Sell Your Car Through AutoQuest
              </button>
            </div>
          )}

          {step < 5 && (
            <div className="flex items-center justify-center gap-3">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 rounded-md border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                onClick={() => step === 4 ? handleEstimate() : setStep(s => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-1 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {step === 4 ? "Get Estimate" : "Next"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ValueMyCarTool;
