import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileCode, FileText, GitBranch, Database, Package, Bot, Sparkles, Download, Eye, Check } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const bundleFiles = [
  { icon: FileText, name: "PRD.md", label: "Product Requirement Document", size: "4.2 KB", color: "bg-pastel-purple" },
  { icon: GitBranch, name: "user-flow.md", label: "User Flow", size: "2.8 KB", color: "bg-pastel-blue" },
  { icon: FileCode, name: "system-flowchart.md", label: "System Flowchart", size: "3.1 KB", color: "bg-pastel-green" },
  { icon: Database, name: "database-schema.sql", label: "Database Schema", size: "1.9 KB", color: "bg-pastel-yellow" },
  { icon: Package, name: "mvp-scope.md", label: "MVP Scope Document", size: "2.4 KB", color: "bg-pastel-pink" },
  { icon: Bot, name: "master-prompt.md", label: "Master Vibe Coding Prompt", size: "5.6 KB", color: "bg-pastel-mint" },
];

export default function Bundle() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen gradient-soft pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">Vibe Coding Bundle</h1>
          <p className="text-xs text-muted-foreground">AI-generated starter pack</p>
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* Hero */}
        <div className="gradient-accent rounded-3xl p-5 text-primary-foreground shadow-float animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold opacity-80">VIBE CODING BUNDLE</span>
          </div>
          <h2 className="text-lg font-bold mb-1">Ready-to-Code Starter Pack</h2>
          <p className="text-xs opacity-80 leading-relaxed mb-4">
            AI generates PRD, user flows, schemas & prompts. Upload to Cursor, Kiro, or any AI coding tool.
          </p>
          {!generated ? (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-card text-foreground text-sm font-semibold px-5 py-2.5 rounded-2xl flex items-center gap-2 disabled:opacity-60"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-primary" /> Generate Bundle
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Check className="w-5 h-5" /> Bundle Ready!
            </div>
          )}
        </div>

        {/* Files */}
        {generated && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold">Bundle Contents</h3>
            {bundleFiles.map((file, i) => (
              <div
                key={file.name}
                className="bg-card rounded-3xl p-4 shadow-card flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-10 h-10 ${file.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  <file.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold">{file.label}</h4>
                  <p className="text-[10px] text-muted-foreground">{file.name} · {file.size}</p>
                </div>
                <button
                  onClick={() => navigate("/bundle-preview")}
                  className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 text-primary" />
                </button>
              </div>
            ))}

            {/* Download */}
            <button className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft mt-2">
              <Download className="w-4 h-4" /> Download as ZIP
            </button>

            {/* Compatible tools */}
            <div className="bg-card rounded-3xl p-4 shadow-card">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">Compatible with:</p>
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
