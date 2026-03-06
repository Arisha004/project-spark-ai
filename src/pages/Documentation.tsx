import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, BookOpen, Presentation, ScrollText, Download, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const docs = [
  { icon: FileText, title: "Project Proposal", description: "Complete FYP proposal with objectives, methodology, and scope", status: "Ready", color: "bg-pastel-purple" },
  { icon: BookOpen, title: "Literature Review", description: "Comprehensive review of related work and existing solutions", status: "Ready", color: "bg-pastel-blue" },
  { icon: ScrollText, title: "Progress Report", description: "Mid-semester progress report with milestones achieved", status: "Draft", color: "bg-pastel-yellow" },
  { icon: Presentation, title: "Final Presentation", description: "Slide deck for your viva presentation", status: "Not started", color: "bg-pastel-pink" },
  { icon: FileText, title: "Final Report", description: "Complete thesis/report with all chapters", status: "Not started", color: "bg-pastel-green" },
];

const statusBg: Record<string, string> = {
  Ready: "bg-pastel-green text-foreground",
  Draft: "bg-pastel-yellow text-foreground",
  "Not started": "bg-accent text-muted-foreground",
};

export default function Documentation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-soft pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">Documentation</h1>
          <p className="text-xs text-muted-foreground">AI-generated documents</p>
        </div>
        <div className="w-10 h-10 rounded-2xl gradient-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <div className="px-6 space-y-3">
        {docs.map((doc, i) => (
          <div
            key={doc.title}
            className="bg-card rounded-3xl p-4 shadow-card flex items-center gap-4 animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className={`w-12 h-12 ${doc.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <doc.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold">{doc.title}</h4>
              <p className="text-[10px] text-muted-foreground truncate">{doc.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusBg[doc.status]}`}>
                {doc.status}
              </span>
              {doc.status === "Ready" && (
                <button className="w-7 h-7 rounded-xl bg-accent flex items-center justify-center">
                  <Download className="w-3.5 h-3.5 text-primary" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
