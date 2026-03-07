import { useNavigate } from "react-router-dom";
import { Lightbulb, FileCode, MapPin, CheckCircle2, Bell, Search, TrendingUp, Clock, BookOpen, FileText } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { FloatingAI } from "@/components/FloatingAI";
import { useApp } from "@/context/AppContext";
import robotMascot from "@/assets/robot-mascot.png";

const quickActions = [
  { icon: Lightbulb, label: "Find Ideas", path: "/ideas", color: "bg-pastel-purple" },
  { icon: FileCode, label: "Bundle", path: "/bundle", color: "bg-pastel-pink" },
  { icon: MapPin, label: "Roadmap", path: "/roadmap", color: "bg-pastel-blue" },
  { icon: CheckCircle2, label: "Milestones", path: "/milestones", color: "bg-pastel-green" },
  { icon: BookOpen, label: "Research", path: "/research", color: "bg-pastel-yellow" },
  { icon: FileText, label: "Docs", path: "/docs", color: "bg-pastel-mint" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName, selectedIdea, completedMilestones, interests, bundleGenerated, getFilteredIdeas } = useApp();
  
  const filteredIdeas = getFilteredIdeas();
  const totalMilestones = 7;
  const progress = Math.round((completedMilestones.length / totalMilestones) * 100);
  
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i + 1);
    return { day: days[d.getDay()].charAt(0), date: d.getDate(), isToday: d.toDateString() === today.toDateString() };
  });

  return (
    <div className="min-h-screen gradient-soft pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={robotMascot} alt="Forge" className="w-10 h-10 rounded-full bg-accent object-contain shadow-soft" />
          <div>
            <p className="text-xs text-muted-foreground">Welcome back 👋</p>
            <h1 className="text-lg font-bold">{userName || "Student"}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute ml-4 -mt-4 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* Hero card */}
        <div className="gradient-accent rounded-3xl p-5 text-primary-foreground shadow-float animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[10px] opacity-80 font-bold tracking-wider mb-1">AI-POWERED FYP MENTOR</p>
              {selectedIdea ? (
                <>
                  <h2 className="text-base font-bold mb-1">Working on:</h2>
                  <p className="text-sm font-semibold mb-3">{selectedIdea.title}</p>
                  <button
                    onClick={() => navigate("/roadmap")}
                    className="bg-card text-foreground text-xs font-semibold px-4 py-2 rounded-2xl"
                  >
                    View Roadmap →
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-base font-bold mb-1">Start Your FYP Journey</h2>
                  <p className="text-[11px] opacity-80 mb-3 leading-relaxed">
                    {filteredIdeas.length} ideas matched to your interests. Let AI guide you.
                  </p>
                  <button
                    onClick={() => navigate("/ideas")}
                    className="bg-card text-foreground text-xs font-semibold px-4 py-2 rounded-2xl"
                  >
                    Explore Ideas →
                  </button>
                </>
              )}
            </div>
            <img src={robotMascot} alt="" className="w-16 h-16 object-contain opacity-90" />
          </div>
        </div>

        {/* Today's Activity Card */}
        <div className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Today's Activity</h3>
            <div className="w-8 h-8 rounded-xl bg-pastel-yellow flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold text-primary">{progress}%</span>
            <div className="flex-1">
              <div className="w-full bg-accent rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
          {/* Week days */}
          <div className="flex gap-2 mt-3">
            {weekDays.map((d) => (
              <div
                key={d.date}
                className={`flex-1 text-center py-2 rounded-2xl ${
                  d.isToday ? "bg-foreground text-background" : "bg-accent"
                }`}
              >
                <p className="text-[10px] font-medium opacity-60">{d.day}</p>
                <p className="text-xs font-bold">{d.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 bg-card rounded-3xl p-4 shadow-card hover:shadow-float transition-all active:scale-95"
              >
                <div className={`w-11 h-11 ${action.color} rounded-2xl flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Project Status */}
        {selectedIdea && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">Project Status</h3>
              <button onClick={() => navigate("/milestones")} className="text-xs text-primary font-medium">View all</button>
            </div>
            <div className="bg-card rounded-3xl p-5 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${selectedIdea.color} rounded-2xl flex items-center justify-center`}>
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{selectedIdea.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{selectedIdea.difficulty} · {selectedIdea.career}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-accent rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs font-bold text-primary">{progress}%</span>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] bg-pastel-green px-2 py-1 rounded-full font-medium">
                  {completedMilestones.length} completed
                </span>
                {bundleGenerated && (
                  <span className="text-[10px] bg-pastel-purple px-2 py-1 rounded-full font-medium">
                    Bundle ready
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recommended ideas if none selected */}
        {!selectedIdea && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">Recommended For You</h3>
              <button onClick={() => navigate("/ideas")} className="text-xs text-primary font-medium">See all</button>
            </div>
            <div className="space-y-3">
              {filteredIdeas.slice(0, 2).map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => navigate(`/idea/${idea.id}`)}
                  className="w-full bg-card rounded-3xl p-4 shadow-card text-left hover:shadow-float transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${idea.color} rounded-2xl flex items-center justify-center shrink-0`}>
                      <Lightbulb className="w-5 h-5 text-primary" />
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
