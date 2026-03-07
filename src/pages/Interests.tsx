import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Globe, Database, Shield, Smartphone, Cpu, Code, BarChart3, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

const fields = [
  { id: "ai", label: "Artificial Intelligence", icon: Brain, color: "bg-pastel-purple" },
  { id: "web", label: "Web Development", icon: Globe, color: "bg-pastel-blue" },
  { id: "data", label: "Data Science", icon: BarChart3, color: "bg-pastel-green" },
  { id: "cyber", label: "Cybersecurity", icon: Shield, color: "bg-pastel-pink" },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone, color: "bg-pastel-yellow" },
  { id: "ml", label: "Machine Learning", icon: Cpu, color: "bg-pastel-mint" },
  { id: "se", label: "Software Engineering", icon: Code, color: "bg-pastel-purple" },
  { id: "db", label: "Database Systems", icon: Database, color: "bg-pastel-blue" },
];

export default function Interests() {
  const { interests, setInterests, setOnboardingComplete, userName, setUserName } = useApp();
  const [selected, setSelected] = useState<string[]>(interests);
  const [name, setName] = useState(userName);
  const navigate = useNavigate();

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const handleContinue = () => {
    if (selected.length > 0 && name.trim()) {
      setInterests(selected);
      setUserName(name.trim());
      setOnboardingComplete(true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen gradient-soft px-6 py-8 flex flex-col">
      <div className="flex-1">
        <p className="text-sm text-primary font-semibold mb-1">Setup Your Profile</p>
        <h1 className="text-2xl font-bold mb-2">Let's get to know you</h1>
        <p className="text-muted-foreground text-sm mb-6">
          We'll use this to recommend the best FYP ideas for you.
        </p>

        {/* Name input */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-muted-foreground mb-2 block">Your Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-card rounded-2xl pl-11 pr-4 py-3.5 text-sm border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-soft"
            />
          </div>
        </div>

        <label className="text-xs font-semibold text-muted-foreground mb-3 block">Select Your Interests</label>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field) => {
            const isSelected = selected.includes(field.id);
            return (
              <button
                key={field.id}
                onClick={() => toggle(field.id)}
                className={`p-4 rounded-3xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? "border-primary bg-accent shadow-soft"
                    : "border-transparent bg-card shadow-card hover:shadow-float"
                }`}
              >
                <div className={`w-10 h-10 ${field.color} rounded-2xl flex items-center justify-center mb-3`}>
                  <field.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">{field.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={selected.length === 0 || !name.trim()}
        className="mt-6 w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-soft disabled:opacity-40 transition-all active:scale-[0.98]"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
