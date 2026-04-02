import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronRight, ChevronLeft, Check, Car, Wrench, ClipboardList, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { BRANDS, LOCATIONS, FUEL_TYPES, TRANSMISSIONS, formatPrice } from "@/lib/carData";

const TOTAL_STEPS = 5;

const models: Record<string, string[]> = {
  Toyota: ["Axio", "Fielder", "Prado", "Land Cruiser", "Hilux", "Aqua", "Vitz", "Harrier"],
  Mazda: ["Demio", "CX-5", "Axela", "Atenza"],
  Subaru: ["Forester", "Impreza", "Outback", "XV"],
  Nissan: ["X-Trail", "Note", "Leaf", "NV350"],
  Mercedes: ["C200", "E250", "GLC"],
  BMW: ["X3", "X5", "320i"],
  Honda: ["Fit", "Vezel", "CR-V"],
};

const bodyTypes = ["SUV", "Sedan", "Hatchback", "Pickup", "Van"];
const conditions = ["Excellent", "Good", "Fair", "Needs Repair"];

const stepIcons = [Car, Wrench, ClipboardList, User, Calculator];
const stepLabels = ["Basics", "Condition", "Additional", "Details", "Result"];

interface ValuationForm {
  make: string; model: string; year: string; bodyType: string;
  mileage: string; fuelType: string; transmission: string; condition: string;
  accidentHistory: string; serviceHistory: string; extras: string[];
  fullName: string; phone: string; email: string; location: string;
}

const extras = ["Sunroof", "Leather seats", "Navigation", "Alloy wheels", "Turbo"];

const ValueMyCarPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ValuationForm>({
    make: "", model: "", year: "", bodyType: "",
    mileage: "", fuelType: "", transmission: "", condition: "",
    accidentHistory: "", serviceHistory: "", extras: [],
    fullName: "", phone: "", email: "", location: "",
  });
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const formRef = document.getElementById("valuation-form");

  const update = (field: keyof ValuationForm, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleExtra = (e: string) => {
    setForm(prev => ({
      ...prev,
      extras: prev.extras.includes(e) ? prev.extras.filter(x => x !== e) : [...prev.extras, e],
    }));
  };

  const validate = (): boolean => {
    switch (step) {
      case 1: return !!(form.make && form.model && form.year && form.bodyType);
      case 2: return !!(form.mileage && form.fuelType && form.transmission && form.condition);
      case 3: return !!(form.accidentHistory && form.serviceHistory);
      case 4: return !!(form.fullName && form.phone && form.location);
      default: return true;
    }
  };

  const calculateEstimate = () => {
    const basePrice = 2000000;
    const ageDeduction = (2026 - Number(form.year)) * 120000;
    const mileageDeduction = (Number(form.mileage) / 10000) * 50000;
    const conditionMultiplier = form.condition === "Excellent" ? 1.1 : form.condition === "Good" ? 1 : form.condition === "Fair" ? 0.85 : 0.7;
    const extrasBonus = form.extras.length * 30000;
    const val = Math.max(300000, (basePrice - ageDeduction - mileageDeduction + extrasBonus) * conditionMultiplier);
    setEstimate({ low: Math.round(val * 0.92), high: Math.round(val * 1.08) });
    setStep(5);
  };

  const next = () => {
    if (!validate()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (step === 4) {
      calculateEstimate();
    } else {
      setStep(s => s + 1);
    }
  };

  const prev = () => { if (step > 1) setStep(s => s - 1); };

  const scrollToForm = () => document.getElementById("valuation-form")?.scrollIntoView({ behavior: "smooth" });

  const SelectField = ({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-background border-border"><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );

  const RadioGroup = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="flex gap-3">
        {options.map(o => (
          <button key={o} type="button" onClick={() => onChange(o)}
            className={`flex-1 h-12 rounded-lg border text-sm font-medium transition-all ${value === o ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/40"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  const variants = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="v1" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Vehicle Basics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Make *" value={form.make} onChange={v => { update("make", v); update("model", ""); }} options={BRANDS} placeholder="Select make" />
              <SelectField label="Model *" value={form.model} onChange={v => update("model", v)} options={models[form.make] || []} placeholder="Select model" />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Year *</Label>
                <Input className="h-12" type="number" placeholder="e.g. 2018" value={form.year} onChange={e => update("year", e.target.value)} />
              </div>
              <SelectField label="Body Type *" value={form.bodyType} onChange={v => update("bodyType", v)} options={bodyTypes} placeholder="Select body type" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="v2" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Vehicle Condition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Mileage (KM) *</Label>
                <Input className="h-12" type="number" placeholder="e.g. 65000" value={form.mileage} onChange={e => update("mileage", e.target.value)} />
              </div>
              <SelectField label="Fuel Type *" value={form.fuelType} onChange={v => update("fuelType", v)} options={FUEL_TYPES} placeholder="Select fuel type" />
              <SelectField label="Transmission *" value={form.transmission} onChange={v => update("transmission", v)} options={TRANSMISSIONS} placeholder="Select transmission" />
              <SelectField label="Condition *" value={form.condition} onChange={v => update("condition", v)} options={conditions} placeholder="Select condition" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="v3" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Additional Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup label="Accident History *" value={form.accidentHistory} onChange={v => update("accidentHistory", v)} options={["Yes", "No"]} />
              <RadioGroup label="Service History *" value={form.serviceHistory} onChange={v => update("serviceHistory", v)} options={["Yes", "No"]} />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Extras (Optional)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {extras.map(e => (
                  <button key={e} type="button" onClick={() => toggleExtra(e)}
                    className={`flex items-center gap-2.5 p-3.5 rounded-lg border text-sm font-medium transition-all text-left ${form.extras.includes(e) ? "bg-primary/5 border-primary text-primary" : "bg-background border-border text-foreground hover:border-primary/30"}`}>
                    <Checkbox checked={form.extras.includes(e)} className="pointer-events-none" />
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="v4" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Owner Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Full Name *</Label>
                <Input className="h-12" placeholder="John Mwangi" value={form.fullName} onChange={e => update("fullName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone Number *</Label>
                <Input className="h-12" type="tel" placeholder="0712 345 678" value={form.phone} onChange={e => update("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input className="h-12" type="email" placeholder="john@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
              </div>
              <SelectField label="Location *" value={form.location} onChange={v => update("location", v)} options={LOCATIONS} placeholder="Select location" />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="v5" {...variants} className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Calculator className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Market Value</p>
              <p className="text-3xl md:text-4xl font-display font-extrabold text-secondary">
                {estimate && `${formatPrice(estimate.low)} – ${formatPrice(estimate.high)}`}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {form.year} {form.make} {form.model} · {Number(form.mileage).toLocaleString()}km · {form.condition}
            </p>
            <p className="text-sm text-muted-foreground">This estimate is based on current market listings.</p>
            <Button onClick={() => navigate("/sell")} size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-2">
              Sell This Car on AutoQuest <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <Calculator className="w-12 h-12 mx-auto mb-4 text-secondary" />
          <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Find Out What Your Car Is Worth</h1>
          <p className="text-primary-foreground/80 md:text-lg mb-8">Get an instant estimate based on current Kenyan car market data.</p>
          <Button onClick={scrollToForm} size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8 py-6 rounded-xl shadow-lg">
            Start Car Valuation <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Form */}
      <section id="valuation-form" className="container mx-auto px-4 py-12 md:py-16 max-w-2xl">
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Step {step} of {TOTAL_STEPS - 1}</span>
              <span className="text-xs text-muted-foreground">{stepLabels[step - 1]}</span>
            </div>
            <Progress value={(step / (TOTAL_STEPS - 1)) * 100} className="h-2" />
            <div className="flex justify-between mt-3">
              {stepIcons.slice(0, 4).map((Icon, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${i + 1 < step ? "bg-success text-success-foreground" : i + 1 === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={prev} disabled={step === 1} className="gap-1.5">
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={next} className="bg-primary text-primary-foreground gap-1.5">
                  {step === 4 ? "Get Estimate" : "Next"} <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {step === 5 && (
              <div className="flex justify-center mt-6 pt-6 border-t border-border">
                <Button variant="outline" onClick={() => { setStep(1); setEstimate(null); }} className="gap-1.5">
                  <ChevronLeft className="w-4 h-4" /> Start Over
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default ValueMyCarPage;
