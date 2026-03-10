import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export default function Documentation() {
  const navigate = useNavigate();
  const { selectedIdea } = useApp();
  const [generatingDoc, setGeneratingDoc] = useState<string | null>(null);
  const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);

  const docs = [
    { title: "Project Proposal", description: "Complete FYP proposal with objectives, methodology, and scope", color: "bg-pastel-blue", emoji: "📝" },
    { title: "Literature Review", description: "Comprehensive review of related work and existing solutions", color: "bg-pastel-yellow", emoji: "📚" },
    { title: "Progress Report", description: "Mid-semester progress report with milestones achieved", color: "bg-pastel-green", emoji: "📊" },
    { title: "Final Presentation", description: "Slide deck outline for your viva presentation", color: "bg-pastel-pink", emoji: "🎤" },
    { title: "Final Report", description: "Complete thesis/report with all chapters outlined", color: "bg-pastel-mint", emoji: "📄" },
  ];

  const handleGenerate = (title: string) => {
    if (!selectedIdea) {
      toast.error("Please select an FYP idea first");
      return;
    }
    setGeneratingDoc(title);
    setTimeout(() => {
      setGeneratingDoc(null);
      setGeneratedDocs((prev) => [...prev, title]);
      toast.success(`${title} generated!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold tracking-tight">Documentation</h1>
          <p className="text-xs text-muted-foreground">
            {selectedIdea ? selectedIdea.title : "Select a project first"}
          </p>
        </div>
      </div>

      <div className="px-6 space-y-3">
        {docs.map((doc, i) => {
          const isGenerated = generatedDocs.includes(doc.title);
          const isGenerating = generatingDoc === doc.title;

          return (
            <div
              key={doc.title}
              className="bg-card rounded-3xl p-4 shadow-card flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className={`w-12 h-12 ${doc.color} rounded-2xl flex items-center justify-center shrink-0 text-xl`}>
                {doc.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold">{doc.title}</h4>
                <p className="text-[10px] text-muted-foreground truncate">{doc.description}</p>
              </div>
              <div className="shrink-0">
                {isGenerating ? (
                  <div className="w-7 h-7 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : isGenerated ? (
                  <span className="flex items-center gap-1 text-[10px] bg-pastel-green px-2 py-1 rounded-full font-semibold">
                    <Check className="w-3 h-3" /> Ready
                  </span>
                ) : (
                  <button
                    onClick={() => handleGenerate(doc.title)}
                    className="text-[10px] gradient-accent text-primary-foreground px-3 py-1.5 rounded-full font-semibold"
                  >
                    Generate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
