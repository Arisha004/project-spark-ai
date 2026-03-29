import { useNavigate, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { FloatingAI } from "@/components/FloatingAI";
import { useApp } from "@/context/AppContext";
import robotMascot from "@/assets/robot-mascot.png";

const quickActions = [
  { emoji: "💡", label: "Find Ideas", path: "/ideas", color: "bg-pastel-blue" },
  { emoji: "📦", label: "Bundle", path: "/bundle", color: "bg-pastel-pink" },
  { emoji: "🗺️", label: "Roadmap", path: "/roadmap", color: "bg-pastel-yellow" },
  { emoji: "✅", label: "Milestones", path: "/milestones", color: "bg-pastel-green" },
  { emoji: "📚", label: "Research", path: "/research", color: "bg-pastel-mint" },
  { emoji: "📄", label: "Docs", path: "/docs", color: "bg-pastel-slate" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName, selectedIdea, completedMilestones, bundleGenerated, getFilteredIdeas, onboardingComplete } = useApp();
  
  // If no name was saved (old broken state), force re-onboarding
  if (!userName || !onboardingComplete) {
    return <Navigate to="/" replace />;
  }
  const totalMilestones = 7;
  const progress = Math.round((completedMilestones.length / totalMilestones) * 100);
  
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i + 1);
    return { day: days[d.getDay()].charAt(0), date: d.getDate(), isToday: d.toDateString() === today.toDateString() };
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-accent overflow-hidden shadow-soft border-2 border-border/60">
            <img src={robotMascot} alt="Forge" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">{greeting()}</p>
            <h1 className="text-lg font-extrabold tracking-tight">{userName || "Student"}</h1>
          </div>
        </div>
        <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center border border-border/40">
          <span className="text-sm">👤</span>
        </button>
      </div>

      <div className="px-6 space-y-4 mt-2">
        {/* Hero card */}
        <div className="bg-card rounded-3xl p-5 shadow-card border border-border/30 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {selectedIdea ? (
                <>
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground mb-1 uppercase">Current Project</p>
                  <h2 className="text-base font-extrabold mb-1 tracking-tight">{selectedIdea.title}</h2>
                  <p className="text-xs text-muted-foreground mb-3">{selectedIdea.difficulty} · {selectedIdea.career}</p>
                  <button
                    onClick={() => navigate("/roadmap")}
                    className="gradient-accent text-primary-foreground text-xs font-semibold px-4 py-2 rounded-2xl"
                  >
                    View Roadmap
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground mb-1 uppercase">AI-Powered FYP Mentor</p>
                  <h2 className="text-base font-extrabold mb-1 tracking-tight">Start Your FYP Journey</h2>
                  <p className="text-xs text-muted-foreground mb-3">
                    {filteredIdeas.length} ideas matched to your interests
                  </p>
                  <button
                    onClick={() => navigate("/ideas")}
                    className="gradient-accent text-primary-foreground text-xs font-semibold px-4 py-2 rounded-2xl"
                  >
                    Explore Ideas
                  </button>
                </>
              )}
            </div>
            <img src={robotMascot} alt="" className="w-14 h-14 object-contain opacity-70" />
          </div>
        </div>

        {/* Week tracker */}
        <div className="bg-card rounded-3xl p-5 shadow-card border border-border/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">This Week</h3>
            <span className="text-xs text-muted-foreground font-medium">{progress}% done</span>
          </div>
          <div className="w-full bg-accent rounded-full h-1.5 mb-4">
            <div className="bg-foreground h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-2">
            {weekDays.map((d) => (
              <div
                key={d.date}
                className={`flex-1 text-center py-2.5 rounded-2xl transition-all ${
                  d.isToday ? "bg-foreground text-background shadow-soft" : "bg-accent"
                }`}
              >
                <p className="text-[9px] font-medium opacity-60">{d.day}</p>
                <p className="text-xs font-bold">{d.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 bg-card rounded-3xl p-4 shadow-card border border-border/20 hover:shadow-float transition-all active:scale-95"
              >
                <div className={`w-10 h-10 ${action.color} rounded-2xl flex items-center justify-center text-base`}>
                  {action.emoji}
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Status */}
        {selectedIdea && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">Project Status</h3>
              <button onClick={() => navigate("/milestones")} className="text-xs text-muted-foreground font-medium">View all</button>
            </div>
            <div className="bg-card rounded-3xl p-5 shadow-card border border-border/30">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${selectedIdea.color} rounded-2xl flex items-center justify-center text-sm`}>
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{selectedIdea.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{selectedIdea.difficulty} · {selectedIdea.career}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-accent rounded-full h-1.5">
                  <div className="bg-foreground h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs font-bold">{progress}%</span>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] bg-pastel-green px-2 py-1 rounded-full font-medium">
                  {completedMilestones.length} completed
                </span>
                {bundleGenerated && (
                  <span className="text-[10px] bg-pastel-blue px-2 py-1 rounded-full font-medium">
                    Bundle ready
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recommended ideas */}
        {!selectedIdea && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">Recommended For You</h3>
              <button onClick={() => navigate("/ideas")} className="text-xs text-muted-foreground font-medium">See all</button>
            </div>
            <div className="space-y-2.5">
              {filteredIdeas.slice(0, 3).map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => navigate(`/idea/${idea.id}`)}
                  className="w-full bg-card rounded-3xl p-4 shadow-card border border-border/20 text-left hover:shadow-float transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${idea.color} rounded-2xl flex items-center justify-center shrink-0 text-sm`}>
                      💡
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{idea.title}</h4>
                      <p className="text-[10px] text-muted-foreground">{idea.difficulty} · {idea.career}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingAI />
      <BottomNav />
    </div>
  );
}
