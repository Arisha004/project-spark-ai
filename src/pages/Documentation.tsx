import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Eye, X } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { generateProjectProposal, generateLiteratureReview, generateProgressReport, generateFinalPresentation, generateFinalReport } from "@/lib/docGenerator";

export default function Documentation() {
  const navigate = useNavigate();
  const { selectedIdea, userName, university, completedMilestones, generatedDocs, setGeneratedDoc } = useApp();
  const [generatingDoc, setGeneratingDoc] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const docs = [
    { title: "Project Proposal", description: "Complete FYP proposal with objectives, methodology, and scope", color: "bg-pastel-blue" },
    { title: "Literature Review", description: "Comprehensive review of related work and existing solutions", color: "bg-pastel-yellow" },
    { title: "Progress Report", description: "Mid-semester progress report with milestones achieved", color: "bg-pastel-green" },
    { title: "Final Presentation", description: "Slide deck outline for your viva presentation", color: "bg-pastel-pink" },
    { title: "Final Report", description: "Complete thesis/report with all chapters outlined", color: "bg-pastel-mint" },
  ];

  const generateContent = (title: string): string => {
    if (!selectedIdea) return "";
    switch (title) {
      case "Project Proposal":
        return generateProjectProposal(selectedIdea, userName || "Student", university || "University");
      case "Literature Review":
        return generateLiteratureReview(selectedIdea);
      case "Progress Report":
        return generateProgressReport(selectedIdea, completedMilestones);
      case "Final Presentation":
        return generateFinalPresentation(selectedIdea);
      case "Final Report":
        return generateFinalReport(selectedIdea);
      default:
        return "";
    }
  };

  const handleGenerate = (title: string) => {
    if (!selectedIdea) {
      toast.error("Please select an FYP idea first");
      return;
    }
    setGeneratingDoc(title);
    // Simulate processing time for realism
    setTimeout(() => {
      const content = generateContent(title);
      setGeneratedDoc(title, content);
      setGeneratingDoc(null);
      toast.success(`${title} generated successfully!`);
    }, 1500);
  };

  const handleCopy = (title: string) => {
    const content = generatedDocs[title];
    if (content) {
      navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Preview modal */}
      {previewDoc && generatedDocs[previewDoc] && (
        <div className="fixed inset-0 z-50 bg-background/95 flex flex-col animate-fade-in">
          <div className="px-6 pt-8 pb-4 flex items-center gap-3 border-b border-border">
            <button onClick={() => setPreviewDoc(null)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-extrabold tracking-tight">{previewDoc}</h1>
              <p className="text-xs text-muted-foreground">{selectedIdea?.title}</p>
            </div>
            <button
              onClick={() => handleCopy(previewDoc)}
              className="text-[10px] gradient-accent text-primary-foreground px-3 py-1.5 rounded-full font-semibold"
            >
              Copy
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <pre className="text-[11px] text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {generatedDocs[previewDoc]}
            </pre>
          </div>
        </div>
      )}

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
        {!selectedIdea && (
          <div className="bg-card rounded-3xl p-6 shadow-card text-center">
            <p className="text-sm font-semibold mb-2">No Project Selected</p>
            <p className="text-xs text-muted-foreground mb-4">Select an FYP idea first to generate documents.</p>
            <button onClick={() => navigate("/ideas")} className="gradient-accent text-primary-foreground px-5 py-2.5 rounded-2xl text-xs font-semibold">
              Browse Ideas
            </button>
          </div>
        )}

        {selectedIdea && docs.map((doc, i) => {
          const isGenerated = !!generatedDocs[doc.title];
          const isGenerating = generatingDoc === doc.title;

          return (
            <div
              key={doc.title}
              className="bg-card rounded-3xl p-4 shadow-card flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className={`w-12 h-12 ${doc.color} rounded-2xl flex items-center justify-center shrink-0`}>
                <span className="text-xs font-extrabold text-foreground/60">
                  {doc.title.split(" ").map(w => w[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold">{doc.title}</h4>
                <p className="text-[10px] text-muted-foreground truncate">{doc.description}</p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5">
                {isGenerating ? (
                  <div className="w-7 h-7 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : isGenerated ? (
                  <>
                    <button
                      onClick={() => setPreviewDoc(doc.title)}
                      className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center"
                    >
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <span className="flex items-center gap-1 text-[10px] bg-pastel-green px-2 py-1 rounded-full font-semibold">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </>
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
