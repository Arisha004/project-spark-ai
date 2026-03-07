import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock, Trophy, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";

const milestones = [
  { title: "Project Proposal Submitted", date: "Week 2" },
  { title: "Literature Review Complete", date: "Week 3" },
  { title: "System Design Approved", date: "Week 5" },
  { title: "MVP Development Started", date: "Week 7" },
  { title: "Core Features Implemented", date: "Week 10" },
  { title: "Testing Complete", date: "Week 14" },
  { title: "Final Report Submitted", date: "Week 16" },
];

export default function Milestones() {
  const navigate = useNavigate();
  const { selectedIdea, completedMilestones, toggleMilestone } = useApp();

  if (!selectedIdea) {
    return (
      <div className="min-h-screen gradient-soft flex flex-col items-center justify-center px-6 pb-24">
        <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-bold mb-2">No Project Selected</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Select an FYP idea to track milestones.</p>
        <button onClick={() => navigate("/ideas")} className="gradient-accent text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-sm">
          Browse Ideas
        </button>
        <BottomNav />
      </div>
    );
  }

  const completed = milestones.filter((m) => completedMilestones.includes(m.title)).length;
  const progress = Math.round((completed / milestones.length) * 100);

  // Determine status for each milestone
  const getStatus = (title: string, index: number) => {
    if (completedMilestones.includes(title)) return "done" as const;
    // First incomplete milestone is active
    const firstIncompleteIndex = milestones.findIndex((m) => !completedMilestones.includes(m.title));
    if (index === firstIncompleteIndex) return "active" as const;
    return "pending" as const;
  };

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
              <p className="text-xs text-muted-foreground">
                {progress === 100 ? "🎉 All milestones complete!" : progress > 50 ? "Great progress! Keep going! 🎯" : "You're getting started! 💪"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">{selectedIdea.title}</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          {milestones.map((m, i) => {
            const status = getStatus(m.title, i);
            return (
              <button
                key={m.title}
                onClick={() => toggleMilestone(m.title)}
                className={`w-full bg-card rounded-3xl p-4 shadow-card flex items-center gap-4 animate-slide-up text-left transition-all active:scale-[0.98] ${
                  status === "active" ? "ring-2 ring-primary/30" : ""
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {status === "done" ? (
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                ) : status === "active" ? (
                  <div className="w-6 h-6 rounded-full border-2 border-primary animate-pulse_soft shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-border shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold ${status === "done" ? "line-through text-muted-foreground" : ""}`}>
                    {m.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {m.date}
                  </p>
                </div>
                {status === "active" && (
                  <span className="text-[10px] bg-accent text-primary px-2 py-1 rounded-full font-semibold">Current</span>
                )}
                {status === "done" && (
                  <span className="text-[10px] bg-pastel-green px-2 py-1 rounded-full font-semibold">Done</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground text-center">Tap a milestone to mark it as complete or incomplete</p>
      </div>

      <BottomNav />
    </div>
  );
}
