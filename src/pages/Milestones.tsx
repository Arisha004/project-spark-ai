import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock, Trophy } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const milestones = [
  { title: "Project Proposal Submitted", date: "Week 2", status: "done" as const },
  { title: "Literature Review Complete", date: "Week 3", status: "done" as const },
  { title: "System Design Approved", date: "Week 5", status: "active" as const },
  { title: "MVP Development", date: "Week 10", status: "pending" as const },
  { title: "Testing Complete", date: "Week 14", status: "pending" as const },
  { title: "Final Report Submitted", date: "Week 16", status: "pending" as const },
  { title: "Viva Presentation", date: "Week 17", status: "pending" as const },
];

export default function Milestones() {
  const navigate = useNavigate();
  const completed = milestones.filter((m) => m.status === "done").length;
  const progress = Math.round((completed / milestones.length) * 100);

  return (
    <div className="min-h-screen gradient-soft pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-bold flex-1">Milestone Tracker</h1>
        <div className="w-10 h-10 rounded-2xl bg-pastel-yellow flex items-center justify-center">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* Summary card */}
        <div className="bg-card rounded-3xl p-5 shadow-card animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--accent))" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
                  strokeDasharray={`${progress * 1.76} 176`} strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{progress}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold">{completed} of {milestones.length} completed</h3>
              <p className="text-xs text-muted-foreground">Keep going, you're on track! 🎯</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div
              key={m.title}
              className={`bg-card rounded-3xl p-4 shadow-card flex items-center gap-4 animate-slide-up ${
                m.status === "active" ? "ring-2 ring-primary/30" : ""
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {m.status === "done" ? (
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
              ) : m.status === "active" ? (
                <div className="w-6 h-6 rounded-full bg-primary animate-pulse_soft shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-border shrink-0" />
              )}
              <div className="flex-1">
                <h4 className={`text-sm font-semibold ${m.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                  {m.title}
                </h4>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {m.date}
                </p>
              </div>
              {m.status === "active" && (
                <span className="text-[10px] bg-accent text-primary px-2 py-1 rounded-full font-semibold">Current</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
