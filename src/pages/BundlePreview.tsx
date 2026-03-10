import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { generatePRD, generateUserFlow, generateFlowchart, generateDatabaseSchema, generateMVPScope, generateMasterPrompt } from "@/lib/bundleGenerator";
import { toast } from "sonner";

const fileNames = ["PRD.md", "user-flow.md", "system-flowchart.md", "database-schema.sql", "mvp-scope.md", "master-prompt.md"];
const fileLabels = ["Product Requirement Document", "User Flow", "System Flowchart", "Database Schema", "MVP Scope", "Master Vibe Coding Prompt"];
const generators = [generatePRD, generateUserFlow, generateFlowchart, generateDatabaseSchema, generateMVPScope, generateMasterPrompt];

export default function BundlePreview() {
  const { fileIndex } = useParams();
  const navigate = useNavigate();
  const { selectedIdea } = useApp();
  const [copied, setCopied] = useState(false);
  
  const idx = Number(fileIndex) || 0;

  if (!selectedIdea) {
    navigate("/bundle");
    return null;
  }

  const content = generators[idx](selectedIdea);
  const fileName = fileNames[idx];
  const fileLabel = fileLabels[idx];

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold tracking-tight">{fileLabel}</h1>
          <p className="text-xs text-muted-foreground">{fileName}</p>
        </div>
        <button
          onClick={handleCopy}
          className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center"
        >
          {copied ? <Check className="w-4 h-4 text-foreground" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-6">
        <div className="bg-card rounded-3xl p-5 shadow-card animate-fade-in">
          <pre className="text-[11px] text-foreground whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
            {content}
          </pre>
        </div>

        {/* Navigation between files */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
          {fileLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => navigate(`/bundle-preview/${i}`)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
                i === idx ? "gradient-accent text-primary-foreground" : "bg-card text-muted-foreground shadow-soft"
              }`}
            >
              {label.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft mt-4"
        >
          <Copy className="w-4 h-4" /> Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
