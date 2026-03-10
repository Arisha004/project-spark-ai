import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Research() {
  const navigate = useNavigate();
  const { selectedIdea } = useApp();

  if (!selectedIdea) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <p className="text-3xl mb-4">🔬</p>
        <h2 className="text-lg font-bold mb-2">No Project Selected</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Select an FYP idea first to generate research insights.</p>
        <button onClick={() => navigate("/ideas")} className="gradient-accent text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-sm">
          Browse Ideas
        </button>
      </div>
    );
  }

  const sections = [
    { title: "Problem Statement", content: selectedIdea.problemStatement, color: "bg-pastel-blue", emoji: "🎯" },
    { title: "Research Background", content: selectedIdea.researchBackground, color: "bg-pastel-yellow", emoji: "📖" },
    { title: "Potential Impact", content: selectedIdea.potentialImpact, color: "bg-pastel-green", emoji: "💡" },
    { title: "Literature Summary", content: selectedIdea.literatureSummary, color: "bg-pastel-pink", emoji: "📋" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold tracking-tight">AI Research Insights</h1>
          <p className="text-xs text-muted-foreground">{selectedIdea.title}</p>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {sections.map((section, i) => (
          <div
            key={section.title}
            className="bg-card rounded-3xl p-5 shadow-card animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${section.color} rounded-2xl flex items-center justify-center text-lg`}>
                {section.emoji}
              </div>
              <h3 className="text-sm font-bold">{section.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}

        <button
          onClick={() => navigate("/roadmap")}
          className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft mt-4"
        >
          View Project Roadmap <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
