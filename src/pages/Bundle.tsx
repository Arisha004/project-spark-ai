import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, Check } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { downloadBundle } from "@/lib/bundleGenerator";
import { toast } from "sonner";

const bundleFilesMeta = [
  { name: "PRD.md", label: "Product Requirement Document", color: "bg-pastel-blue", emoji: "📋" },
  { name: "user-flow.md", label: "User Flow", color: "bg-pastel-yellow", emoji: "🗺️" },
  { name: "system-flowchart.md", label: "System Flowchart", color: "bg-pastel-green", emoji: "🔷" },
  { name: "database-schema.sql", label: "Database Schema", color: "bg-pastel-pink", emoji: "🗃️" },
  { name: "mvp-scope.md", label: "MVP Scope Document", color: "bg-pastel-mint", emoji: "📦" },
  { name: "master-prompt.md", label: "Master Vibe Coding Prompt", color: "bg-pastel-slate", emoji: "🤖" },
];

export default function Bundle() {
  const navigate = useNavigate();
  const { selectedIdea, bundleGenerated, setBundleGenerated } = useApp();
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!selectedIdea) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-24">
        <p className="text-3xl mb-4">📦</p>
        <h2 className="text-lg font-bold mb-2">No Project Selected</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Select an FYP idea first to generate a bundle.</p>
        <button onClick={() => navigate("/ideas")} className="gradient-accent text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-sm">
          Browse Ideas
        </button>
        <BottomNav />
      </div>
    );
  }

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setBundleGenerated(true);
      toast.success("Vibe Coding Bundle generated successfully!");
    }, 2500);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadBundle(selectedIdea);
      toast.success("Bundle downloaded as ZIP!");
    } catch {
      toast.error("Failed to download bundle");
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold tracking-tight">Vibe Coding Bundle</h1>
          <p className="text-xs text-muted-foreground">{selectedIdea.title}</p>
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* Hero */}
        <div className="bg-pastel-blue rounded-3xl p-5 shadow-card animate-fade-in">
          <p className="text-[10px] font-bold tracking-wider text-muted-foreground mb-1 uppercase">Vibe Coding Bundle</p>
          <h2 className="text-base font-extrabold mb-1 tracking-tight">Ready-to-Code Starter Pack</h2>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            AI generates PRD, user flows, schemas & prompts for "{selectedIdea.title}". Upload to any AI coding tool.
          </p>
          {!bundleGenerated ? (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="gradient-accent text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-2xl flex items-center gap-2 disabled:opacity-60"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Bundle"
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Check className="w-5 h-5" /> Bundle Ready!
            </div>
          )}
        </div>

        {/* Files */}
        {bundleGenerated && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold">Bundle Contents</h3>
            {bundleFilesMeta.map((file, i) => (
              <div
                key={file.name}
                className="bg-card rounded-3xl p-4 shadow-card flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={`w-10 h-10 ${file.color} rounded-2xl flex items-center justify-center shrink-0 text-lg`}>
                  {file.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold">{file.label}</h4>
                  <p className="text-[10px] text-muted-foreground">{file.name}</p>
                </div>
                <button
                  onClick={() => navigate(`/bundle-preview/${i}`)}
                  className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}

            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft mt-2 disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Preparing ZIP...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download as ZIP
                </>
              )}
            </button>

            {/* Compatible tools */}
            <div className="bg-card rounded-3xl p-4 shadow-card">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">Upload this bundle to:</p>
              <div className="flex flex-wrap gap-2">
                {["Cursor", "Kiro", "Antigravity", "Bolt", "Lovable"].map((tool) => (
                  <span key={tool} className="text-[10px] bg-accent px-3 py-1.5 rounded-full font-medium">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
