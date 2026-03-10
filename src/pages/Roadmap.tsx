import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";

const phases = [
  { phase: "Phase 1", title: "Research & Planning", duration: "Week 1–3", tasks: ["Literature review", "Define scope & objectives", "Create project proposal", "Set up development environment"] },
  { phase: "Phase 2", title: "Design & Architecture", duration: "Week 4–6", tasks: ["System architecture design", "Database schema", "UI/UX wireframes", "API endpoint planning"] },
  { phase: "Phase 3", title: "Core Development", duration: "Week 7–12", tasks: ["Backend API development", "Frontend implementation", "Core feature integration", "Data processing pipeline"] },
  { phase: "Phase 4", title: "Testing & Deployment", duration: "Week 13–15", tasks: ["Unit & integration testing", "User acceptance testing", "Performance optimization", "Deploy to production"] },
  { phase: "Phase 5", title: "Documentation & Presentation", duration: "Week 16", tasks: ["Final report writing", "Presentation slides", "Demo video", "Viva preparation"] },
];

export default function Roadmap() {
  const navigate = useNavigate();
  const { selectedIdea, completedMilestones } = useApp();

  if (!selectedIdea) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-24">
        <p className="text-3xl mb-4">🗺️</p>
        <h2 className="text-lg font-bold mb-2">No Project Selected</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Select an FYP idea first to see the roadmap.</p>
        <button onClick={() => navigate("/ideas")} className="gradient-accent text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-sm">
          Browse Ideas
        </button>
        <BottomNav />
      </div>
    );
  }

  const allTasks = phases.flatMap((p) => p.tasks);
  const completedCount = allTasks.filter((t) => completedMilestones.includes(t)).length;
  const progress = Math.round((completedCount / allTasks.length) * 100);

  const getPhaseStatus = (phase: typeof phases[0]) => {
    const done = phase.tasks.filter((t) => completedMilestones.includes(t)).length;
    if (done === phase.tasks.length) return "completed";
    if (done > 0) return "active";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold tracking-tight">Project Roadmap</h1>
          <p className="text-xs text-muted-foreground">{selectedIdea.title}</p>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-card rounded-3xl p-5 shadow-card mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Overall Progress</h3>
            <span className="text-sm font-extrabold">{progress}%</span>
          </div>
          <div className="w-full bg-accent rounded-full h-3">
            <div className="bg-foreground h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>{completedCount} of {allTasks.length} tasks done</span>
            <span>~16 weeks total</span>
          </div>
        </div>

        <div className="space-y-0">
          {phases.map((phase, i) => {
            const status = getPhaseStatus(phase);
            const dotColor = status === "completed" ? "bg-foreground" : status === "active" ? "bg-foreground animate-pulse_soft" : "bg-border";
            const lineColor = status === "completed" ? "bg-foreground" : "bg-border";
            return (
              <div key={phase.phase} className="flex gap-4 animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${dotColor} flex items-center justify-center`}>
                    {status === "completed" && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  {i < phases.length - 1 && <div className={`w-0.5 flex-1 ${lineColor} min-h-[60px]`} />}
                </div>
                <div className="bg-card rounded-3xl p-4 shadow-card mb-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold ${status !== "pending" ? "text-foreground" : "text-muted-foreground"}`}>{phase.phase}</span>
                    <span className="text-[10px] text-muted-foreground">{phase.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold mb-2">{phase.title}</h4>
                  <div className="space-y-1.5">
                    {phase.tasks.map((task) => (
                      <div key={task} className="flex items-center gap-2 text-xs text-muted-foreground">
                        {completedMilestones.includes(task) ? (
                          <CheckCircle2 className="w-3 h-3 text-foreground shrink-0" />
                        ) : (
                          <Circle className="w-3 h-3 shrink-0" />
                        )}
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate("/milestones")}
          className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft mt-4"
        >
          Track Milestones <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
