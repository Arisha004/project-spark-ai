import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const phases = [
  {
    phase: "Phase 1",
    title: "Research & Planning",
    duration: "Week 1–3",
    status: "completed" as const,
    tasks: ["Literature review", "Define scope & objectives", "Create project proposal", "Set up development environment"],
  },
  {
    phase: "Phase 2",
    title: "Design & Architecture",
    duration: "Week 4–6",
    status: "active" as const,
    tasks: ["System architecture design", "Database schema", "UI/UX wireframes", "API endpoint planning"],
  },
  {
    phase: "Phase 3",
    title: "Core Development",
    duration: "Week 7–12",
    status: "pending" as const,
    tasks: ["Backend API development", "Frontend implementation", "NLP model integration", "Document processing pipeline"],
  },
  {
    phase: "Phase 4",
    title: "Testing & Deployment",
    duration: "Week 13–15",
    status: "pending" as const,
    tasks: ["Unit & integration testing", "User acceptance testing", "Performance optimization", "Deploy to production"],
  },
  {
    phase: "Phase 5",
    title: "Documentation & Presentation",
    duration: "Week 16",
    status: "pending" as const,
    tasks: ["Final report writing", "Presentation slides", "Demo video", "Viva preparation"],
  },
];

const statusStyles = {
  completed: { dot: "bg-primary", line: "bg-primary", text: "text-primary" },
  active: { dot: "bg-primary animate-pulse_soft", line: "bg-border", text: "text-primary" },
  pending: { dot: "bg-border", line: "bg-border", text: "text-muted-foreground" },
};

export default function Roadmap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-soft pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">Project Roadmap</h1>
          <p className="text-xs text-muted-foreground">AI-generated timeline</p>
        </div>
      </div>

      <div className="px-6">
        {/* Progress summary */}
        <div className="bg-card rounded-3xl p-5 shadow-card mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Overall Progress</h3>
            <span className="text-sm font-bold text-primary">20%</span>
          </div>
          <div className="w-full bg-accent rounded-full h-3">
            <div className="bg-primary h-3 rounded-full transition-all" style={{ width: "20%" }} />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>1 of 5 phases done</span>
            <span>~16 weeks total</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {phases.map((phase, i) => {
            const style = statusStyles[phase.status];
            return (
              <div key={phase.phase} className="flex gap-4 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${style.dot} flex items-center justify-center`}>
                    {phase.status === "completed" && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  {i < phases.length - 1 && <div className={`w-0.5 flex-1 ${style.line} min-h-[60px]`} />}
                </div>

                {/* Content */}
                <div className="bg-card rounded-3xl p-4 shadow-card mb-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold ${style.text}`}>{phase.phase}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {phase.duration}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mb-2">{phase.title}</h4>
                  <div className="space-y-1.5">
                    {phase.tasks.map((task) => (
                      <div key={task} className="flex items-center gap-2 text-xs text-muted-foreground">
                        {phase.status === "completed" ? (
                          <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
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
