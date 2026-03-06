import { useNavigate } from "react-router-dom";
import { Lightbulb, FileCode, MapPin, CheckCircle2, Bell, Search, TrendingUp, Clock } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { FloatingAI } from "@/components/FloatingAI";
import robotMascot from "@/assets/robot-mascot.png";

const quickActions = [
  { icon: Lightbulb, label: "Find Ideas", path: "/ideas", color: "bg-pastel-purple" },
  { icon: FileCode, label: "Coding Bundle", path: "/bundle", color: "bg-pastel-pink" },
  { icon: MapPin, label: "Roadmap", path: "/roadmap", color: "bg-pastel-blue" },
  { icon: CheckCircle2, label: "Milestones", path: "/milestones", color: "bg-pastel-green" },
];

const recentProjects = [
  { title: "AI Plagiarism Detector", progress: 35, status: "In Progress", difficulty: "Intermediate" },
  { title: "Smart Campus App", progress: 10, status: "Planning", difficulty: "Beginner" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-soft pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={robotMascot} alt="Forge" className="w-10 h-10 rounded-full bg-accent object-contain" />
          <div>
            <p className="text-xs text-muted-foreground">Welcome back 👋</p>
            <h1 className="text-lg font-bold">FYP Forge</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center relative">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Hero card */}
        <div className="gradient-accent rounded-3xl p-5 text-primary-foreground shadow-float animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs opacity-80 font-medium mb-1">AI-Powered</p>
              <h2 className="text-lg font-bold mb-1">Start Your FYP Journey</h2>
              <p className="text-xs opacity-80 mb-4 leading-relaxed">
                Let AI help you discover the perfect project idea and plan everything.
              </p>
              <button
                onClick={() => navigate("/ideas")}
                className="bg-card text-foreground text-sm font-semibold px-5 py-2.5 rounded-2xl hover:opacity-90 transition-opacity"
              >
                Explore Ideas →
              </button>
            </div>
            <img src={robotMascot} alt="" className="w-20 h-20 object-contain opacity-90" />
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 animate-fade-in"
              >
                <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-soft`}>
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's activity */}
        <div className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Today's Activity</h3>
            <span className="text-xs text-primary font-medium">73%</span>
          </div>
          <div className="w-full bg-accent rounded-full h-2.5 mb-3">
            <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: "73%" }} />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">3 milestones</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">2h 15m today</span>
            </div>
          </div>
        </div>

        {/* Recent projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">My Projects</h3>
            <button className="text-xs text-primary font-medium">See all</button>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <button
                key={project.title}
                onClick={() => navigate("/roadmap")}
                className="w-full bg-card rounded-3xl p-4 shadow-card text-left hover:shadow-float transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold">{project.title}</h4>
                  <span className="text-[10px] bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">
                    {project.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-accent rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{project.progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{project.status}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FloatingAI />
      <BottomNav />
    </div>
  );
}
