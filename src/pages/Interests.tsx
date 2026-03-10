import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

const fields = [
  { id: "ai", label: "Artificial Intelligence", emoji: "🧠", color: "bg-pastel-blue" },
  { id: "web", label: "Web Development", emoji: "🌐", color: "bg-pastel-yellow" },
  { id: "data", label: "Data Science", emoji: "📊", color: "bg-pastel-green" },
  { id: "cyber", label: "Cybersecurity", emoji: "🔐", color: "bg-pastel-pink" },
  { id: "mobile", label: "Mobile Apps", emoji: "📱", color: "bg-pastel-yellow" },
  { id: "ml", label: "Machine Learning", emoji: "⚡", color: "bg-pastel-mint" },
  { id: "se", label: "Software Engineering", emoji: "💻", color: "bg-pastel-blue" },
  { id: "db", label: "Database Systems", emoji: "🗄️", color: "bg-pastel-slate" },
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
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground font-semibold mb-1 tracking-wider uppercase">Setup Your Profile</p>
        <h1 className="text-2xl font-extrabold mb-2 tracking-tight">Let's get to know you</h1>
        <p className="text-muted-foreground text-sm mb-6">
          We'll use this to recommend the best FYP ideas for you.
        </p>

        {/* Name input */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-muted-foreground mb-2 block">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-card rounded-2xl px-4 py-3.5 text-sm border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/10 outline-none transition-all shadow-soft"
          />
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
                    ? "border-foreground bg-card shadow-float"
                    : "border-transparent bg-card shadow-card hover:shadow-float"
                }`}
              >
                <div className={`w-10 h-10 ${field.color} rounded-2xl flex items-center justify-center mb-3 text-lg`}>
                  {field.emoji}
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
