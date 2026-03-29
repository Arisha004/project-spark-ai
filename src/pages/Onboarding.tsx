import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import robotMascot from "@/assets/robot-mascot.png";

const slides = [
  {
    title: "Discover Smarter FYP Ideas",
    description: "AI-powered recommendations tailored to your interests, skills, and career goals.",
    badge: "bg-pastel-blue",
  },
  {
    title: "Plan Your Entire Project",
    description: "Get structured roadmaps, milestones, and research insights generated in seconds.",
    badge: "bg-pastel-yellow",
  },
  {
    title: "Vibe Coding Bundle",
    description: "Download PRD, user flows, schemas & coding prompts — ready for AI coding tools.",
    badge: "bg-pastel-pink",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { onboardingComplete } = useApp();

  if (onboardingComplete) {
    return <meta httpEquiv="refresh" content="0;url=/dashboard" />;
  }

  const handleNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else navigate("/interests");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        {/* Robot mascot */}
        <div className="relative mb-10 animate-float">
          <img src={robotMascot} alt="Forge AI mascot" className="w-48 h-48 object-contain drop-shadow-xl" />
          {/* floating stat badges */}
          <div className="absolute top-0 -left-2 bg-card px-3 py-1.5 rounded-full shadow-float text-[10px] font-bold animate-fade-in flex items-center gap-1.5 border border-border/40">
            <span className="text-foreground font-extrabold">40%</span>
            Planning
          </div>
          <div className="absolute top-10 -right-4 bg-card px-3 py-1.5 rounded-full shadow-float text-[10px] font-bold animate-fade-in flex items-center gap-1.5 border border-border/40" style={{ animationDelay: "0.2s" }}>
            <span className="text-foreground font-extrabold">30%</span>
            Research
          </div>
          <div className="absolute bottom-4 -left-6 bg-card px-3 py-1.5 rounded-full shadow-float text-[10px] font-bold animate-fade-in flex items-center gap-1.5 border border-border/40" style={{ animationDelay: "0.4s" }}>
            <span className="text-foreground font-extrabold">30%</span>
            Coding
          </div>
        </div>

        {/* Slide content */}
        <div key={step} className="text-center animate-fade-in max-w-sm">
          <h1 className="text-2xl font-extrabold mb-3 leading-tight tracking-tight">{slides[step].title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">{slides[step].description}</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-foreground" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-8 flex items-center gap-3">
        <button
          onClick={() => navigate("/interests")}
          className="flex-1 text-sm text-muted-foreground font-semibold py-3.5 rounded-2xl bg-card shadow-soft transition-all active:scale-[0.98]"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="flex-1 gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-soft hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          {step === slides.length - 1 ? "Get Started" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
