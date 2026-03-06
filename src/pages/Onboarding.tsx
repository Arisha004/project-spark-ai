import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, FileCode, Target } from "lucide-react";
import robotMascot from "@/assets/robot-mascot.png";

const slides = [
  {
    icon: Sparkles,
    title: "Discover Smarter FYP Ideas",
    description: "AI-powered recommendations tailored to your interests, skills, and career goals.",
    color: "bg-pastel-purple",
  },
  {
    icon: Target,
    title: "Plan Your Entire Project",
    description: "Get structured roadmaps, milestones, and research insights generated in seconds.",
    color: "bg-pastel-blue",
  },
  {
    icon: FileCode,
    title: "Vibe Coding Bundle",
    description: "Download PRD, user flows, schemas & coding prompts — ready for AI coding tools.",
    color: "bg-pastel-pink",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else navigate("/interests");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        {/* Robot mascot */}
        <div className="relative mb-8 animate-float">
          <img src={robotMascot} alt="Forge AI mascot" className="w-48 h-48 object-contain" />
          {/* floating badges */}
          <div className="absolute top-2 -left-4 bg-card px-3 py-1.5 rounded-full shadow-soft text-xs font-semibold animate-fade-in flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            AI-Powered
          </div>
          <div className="absolute top-12 -right-6 bg-card px-3 py-1.5 rounded-full shadow-soft text-xs font-semibold animate-fade-in flex items-center gap-1.5" style={{ animationDelay: "0.2s" }}>
            <FileCode className="w-3 h-3 text-primary" />
            Vibe Code
          </div>
        </div>

        {/* Slide content */}
        <div key={step} className="text-center animate-fade-in max-w-sm">
          <div className={`w-14 h-14 ${slides[step].color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
            {(() => { const Icon = slides[step].icon; return <Icon className="w-7 h-7 text-primary" />; })()}
          </div>
          <h1 className="text-2xl font-bold mb-3 leading-tight">{slides[step].title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">{slides[step].description}</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-8 flex items-center gap-4">
        <button
          onClick={() => navigate("/interests")}
          className="text-sm text-muted-foreground font-medium"
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
