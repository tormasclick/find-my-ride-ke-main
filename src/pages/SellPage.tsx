import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check, Car, FileText, Camera, User, ChevronRight, ChevronLeft, Shield, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 6;

const makes = ["Toyota", "Mazda", "Subaru", "Nissan", "Mercedes", "BMW", "Honda"];
const bodyTypes = ["SUV", "Sedan", "Hatchback", "Pickup", "Van", "Commercial"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual"];
const conditions = ["Excellent", "Good", "Fair"];
const locations = ["Nairobi", "Mombasa", "Kiambu", "Nakuru", "Eldoret", "Kisumu"];
const features = [
  "Air Conditioning", "Sunroof", "Leather Seats", "Navigation",
  "Parking Sensors", "Reverse Camera", "Bluetooth", "Cruise Control",
];
const photoLabels = ["Front", "Rear", "Interior", "Dashboard", "Engine", "Side"];

const stepIcons = [Car, FileText, Star, Camera, FileText, User];
const stepLabels = ["Basics", "Details", "Features", "Photos", "Documents", "Seller"];

interface FormData {
  make: string; model: string; year: string; bodyType: string; fuelType: string;
  transmission: string; mileage: string; exteriorColor: string;
  interiorColor: string; condition: string;
  selectedFeatures: string[]; photos: File[]; logbook: File | null;
  sellerId: File | null; fullName: string; phone: string; email: string; location: string;
  expectedPrice: string; description: string;
}

const initialForm: FormData = {
  make: "", model: "", year: "", bodyType: "", fuelType: "", transmission: "",
  mileage: "", exteriorColor: "", interiorColor: "", condition: "",
  selectedFeatures: [],
  photos: [], logbook: null, sellerId: null, fullName: "", phone: "", email: "",
  location: "", expectedPrice: "", description: "",
};

const SellPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [logbookPreview, setLogbookPreview] = useState<string | null>(null);
  const [sellerIdPreview, setSellerIdPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const update = (field: keyof FormData, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleFeature = (f: string) => {
    setForm(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(f)
        ? prev.selectedFeatures.filter(x => x !== f)
        : [...prev.selectedFeatures, f],
    }));
  };

  const handlePhotos = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    const total = form.photos.length + newFiles.length;
    if (total > 15) {
      toast({ title: "Maximum 15 photos allowed", variant: "destructive" });
      return;
    }
    const updated = [...form.photos, ...newFiles];
    setForm(prev => ({ ...prev, photos: updated }));
    const newPreviews = newFiles.map(f => URL.createObjectURL(f));
    setPhotoPreviews(prev => [...prev, ...newPreviews]);
  }, [form.photos, toast]);

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(photoPreviews[i]);
    setForm(prev => ({ ...prev, photos: prev.photos.filter((_, idx) => idx !== i) }));
    setPhotoPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleDocUpload = (field: "logbook" | "sellerId", file: File | null) => {
    if (!file) return;
    update(field, file);
    const url = URL.createObjectURL(file);
    if (field === "logbook") setLogbookPreview(url);
    else setSellerIdPreview(url);
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const validateStep = (): boolean => {
    switch (step) {
      case 1: return !!(form.make && form.model && form.year && form.bodyType && form.fuelType && form.transmission);
      case 2: return !!(form.mileage && form.condition);
      case 3: return true;
      case 4: return form.photos.length >= 3;
      case 5: return !!form.logbook;
      case 6: return !!(form.fullName && form.phone && form.email && form.location && form.expectedPrice);
      default: return false;
    }
  };

  const next = () => {
    if (!validateStep()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (step < TOTAL_STEPS) { setStep(s => s + 1); scrollToForm(); }
  };

  const prev = () => { if (step > 1) { setStep(s => s - 1); scrollToForm(); } };

  const handleSubmit = () => {
    if (!validateStep()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SelectField = ({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-background border-border"><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Your Car Submission Has Been Received</h1>
          <p className="text-muted-foreground mb-2">Our team will review and verify your vehicle before listing it on the marketplace.</p>
          <p className="text-sm text-muted-foreground mb-8">Estimated response time: <span className="font-semibold text-primary">24 hours</span></p>
          <Card className="border-border/60 bg-card p-6 text-left space-y-2 mb-8">
            <p className="text-sm"><span className="font-medium">Vehicle:</span> {form.year} {form.make} {form.model}</p>
            <p className="text-sm"><span className="font-medium">Price:</span> KES {Number(form.expectedPrice).toLocaleString()}</p>
            <p className="text-sm"><span className="font-medium">Contact:</span> {form.fullName} — {form.phone}</p>
          </Card>
          <Button onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); setPhotoPreviews([]); }} size="lg" className="bg-primary text-primary-foreground">
            Submit Another Vehicle
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const renderStep = () => {
    const variants = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

    switch (step) {
      case 1:
        return (
          <motion.div key="s1" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Vehicle Basics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Make *" value={form.make} onChange={v => update("make", v)} options={makes} placeholder="Select make" />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Model *</Label>
                <Input className="h-12" placeholder="e.g. Axio, CX-5" value={form.model} onChange={e => update("model", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Year *</Label>
                <Input className="h-12" type="number" placeholder="e.g. 2019" value={form.year} onChange={e => update("year", e.target.value)} />
              </div>
              <SelectField label="Body Type *" value={form.bodyType} onChange={v => update("bodyType", v)} options={bodyTypes} placeholder="Select body type" />
              <SelectField label="Fuel Type *" value={form.fuelType} onChange={v => update("fuelType", v)} options={fuelTypes} placeholder="Select fuel type" />
              <SelectField label="Transmission *" value={form.transmission} onChange={v => update("transmission", v)} options={transmissions} placeholder="Select transmission" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="s2" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Vehicle Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Mileage (KM) *</Label>
                <Input className="h-12" type="number" placeholder="e.g. 65000" value={form.mileage} onChange={e => update("mileage", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Exterior Color</Label>
                <Input className="h-12" placeholder="e.g. Pearl White" value={form.exteriorColor} onChange={e => update("exteriorColor", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Interior Color</Label>
                <Input className="h-12" placeholder="e.g. Black" value={form.interiorColor} onChange={e => update("interiorColor", e.target.value)} />
              </div>
              <SelectField label="Condition *" value={form.condition} onChange={v => update("condition", v)} options={conditions} placeholder="Select condition" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="s3" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Vehicle Features</h2>
            <p className="text-sm text-muted-foreground">Select all features that apply to your vehicle.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map(f => (
                <button key={f} type="button" onClick={() => toggleFeature(f)}
                  className={`flex items-center gap-2.5 p-3.5 rounded-lg border text-sm font-medium transition-all text-left ${form.selectedFeatures.includes(f) ? "bg-primary/5 border-primary text-primary" : "bg-background border-border text-foreground hover:border-primary/30"}`}>
                  <Checkbox checked={form.selectedFeatures.includes(f)} className="pointer-events-none" />
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="s4" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Vehicle Photos</h2>
            <p className="text-sm text-muted-foreground">Upload 3–15 photos. Include front, rear, interior, dashboard, engine, and side views.</p>
            <div
              onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-primary"); }}
              onDragLeave={e => e.currentTarget.classList.remove("border-primary")}
              onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-primary"); handlePhotos(e.dataTransfer.files); }}
              onClick={() => photoInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
            >
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Drag & drop photos here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">{form.photos.length}/15 photos uploaded (min 3)</p>
              <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handlePhotos(e.target.files)} />
            </div>
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {photoPreviews.map((src, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                    <img src={src} alt={photoLabels[i] || `Photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button onClick={() => removePhoto(i)} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-0 left-0 right-0 bg-foreground/50 text-background text-[10px] text-center py-0.5">{photoLabels[i] || `Photo ${i + 1}`}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="s5" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Document Upload</h2>
            <p className="text-sm text-muted-foreground">These documents are used only to verify ownership.</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Logbook Photo *</Label>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors bg-muted/20">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{form.logbook ? form.logbook.name : "Upload logbook photo"}</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG or PDF</p>
                  </div>
                  <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => handleDocUpload("logbook", e.target.files?.[0] || null)} />
                </label>
                {logbookPreview && <img src={logbookPreview} alt="Logbook" className="h-24 rounded-lg border border-border object-cover" />}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Seller ID (Optional)</Label>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors bg-muted/20">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{form.sellerId ? form.sellerId.name : "Upload seller ID"}</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG or PDF</p>
                  </div>
                  <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => handleDocUpload("sellerId", e.target.files?.[0] || null)} />
                </label>
                {sellerIdPreview && <img src={sellerIdPreview} alt="Seller ID" className="h-24 rounded-lg border border-border object-cover" />}
              </div>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="s6" {...variants} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">Seller Details</h2>
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
                <Label className="text-sm font-medium">Email *</Label>
                <Input className="h-12" type="email" placeholder="john@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
              </div>
              <SelectField label="Location *" value={form.location} onChange={v => update("location", v)} options={locations} placeholder="Select location" />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Expected Price (KES) *</Label>
                <Input className="h-12" type="number" placeholder="e.g. 1500000" value={form.expectedPrice} onChange={e => update("expectedPrice", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Vehicle Description</Label>
              <Textarea className="min-h-[120px]" placeholder="Well maintained Toyota Axio 2017 with low mileage, accident free and recently serviced." value={form.description} onChange={e => update("description", e.target.value)} />
            </div>
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
          <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Sell Your Car Safely</h1>
          <p className="text-primary-foreground/80 md:text-lg mb-10">Submit your vehicle details and our team will verify and list it for serious buyers.</p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { n: "1", title: "Submit your car details" },
              { n: "2", title: "We verify the vehicle" },
              { n: "3", title: "Your car goes live" },
            ].map(s => (
              <div key={s.n} className="text-center">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-2 text-sm font-bold">{s.n}</div>
                <p className="text-xs md:text-sm text-primary-foreground/70">{s.title}</p>
              </div>
            ))}
          </div>

          <Button onClick={scrollToForm} size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8 py-6 rounded-xl shadow-lg">
            Start Submission <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="container mx-auto px-4 py-12 md:py-16 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Step {step} of {TOTAL_STEPS}</span>
            <span className="text-xs text-muted-foreground">{stepLabels[step - 1]}</span>
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
          <div className="flex justify-between mt-3">
            {stepIcons.map((Icon, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${i + 1 < step ? "bg-success text-success-foreground" : i + 1 === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={prev} disabled={step === 1} className="gap-1.5">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              {step < TOTAL_STEPS ? (
                <Button onClick={next} className="bg-primary text-primary-foreground gap-1.5">
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1.5">
                  Submit Vehicle <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Trust */}
      <section className="container mx-auto px-4 pb-16 max-w-2xl">
        <Card className="border-border/60 bg-muted/30 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground mb-1">Why Verification Matters</h3>
              <p className="text-sm text-muted-foreground">Every vehicle is reviewed before listing to protect buyers and prevent fraud. Only verified cars appear on the marketplace.</p>
            </div>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default SellPage;
