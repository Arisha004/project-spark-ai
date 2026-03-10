import { useNavigate } from "react-router-dom";
import { ChevronRight, Edit2 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import robotMascot from "@/assets/robot-mascot.png";
import { useState } from "react";
import { toast } from "sonner";

const interestLabels: Record<string, string> = {
  ai: "AI", web: "Web Dev", data: "Data Science", cyber: "Cybersecurity",
  mobile: "Mobile", ml: "Machine Learning", se: "Software Eng", db: "Databases",
};

const interestColors: Record<string, string> = {
  ai: "bg-pastel-blue", web: "bg-pastel-yellow", data: "bg-pastel-green", cyber: "bg-pastel-pink",
  mobile: "bg-pastel-yellow", ml: "bg-pastel-mint", se: "bg-pastel-blue", db: "bg-pastel-slate",
};

export default function Profile() {
  const navigate = useNavigate();
  const { userName, setUserName, interests, completedMilestones, bundleGenerated, selectedIdea, setOnboardingComplete, setSelectedIdea, setBundleGenerated } = useApp();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
      setEditing(false);
      toast.success("Name updated!");
    }
  };

  const handleReset = () => {
    localStorage.removeItem("fyp-forge-state");
    setOnboardingComplete(false);
    setSelectedIdea(null);
    setBundleGenerated(false);
    navigate("/");
    toast.success("Profile reset. Starting fresh!");
  };

  const menuItems = [
    { label: "My Documents", emoji: "📄", action: () => navigate("/docs") },
    { label: "Saved Ideas", emoji: "⭐", action: () => navigate("/ideas") },
    { label: "Notifications", emoji: "🔔", action: () => toast.info("No new notifications") },
    { label: "Privacy", emoji: "🔒", action: () => toast.info("Your data is stored locally on your device") },
    { label: "Help & Support", emoji: "❓", action: () => toast.info("Contact: support@fypforge.ai") },
    { label: "Edit Interests", emoji: "⚙️", action: () => { setOnboardingComplete(false); navigate("/interests"); } },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-lg font-extrabold tracking-tight">Profile</h1>
      </div>

      <div className="px-6 space-y-5">
        {/* Profile card */}
        <div className="bg-card rounded-3xl p-5 shadow-card animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent overflow-hidden shadow-soft">
              <img src={robotMascot} alt="Avatar" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="text-base font-bold bg-accent rounded-xl px-3 py-1.5 outline-none border border-foreground/20 flex-1"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  />
                  <button onClick={handleSaveName} className="text-xs gradient-accent text-primary-foreground px-3 py-1.5 rounded-xl font-semibold">Save</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold">{userName || "Student"}</h2>
                  <button onClick={() => setEditing(true)} className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center">
                    <Edit2 className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">Computer Science · Year 4</p>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                {interests.map((id) => (
                  <span key={id} className={`text-[10px] ${interestColors[id] || "bg-accent"} px-2 py-0.5 rounded-full font-medium`}>
                    {interestLabels[id] || id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Ideas", value: selectedIdea ? "1" : "0" },
            { label: "Milestones", value: String(completedMilestones.length) },
            { label: "Bundle", value: bundleGenerated ? "✓" : "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-3xl p-4 shadow-card text-center">
              <p className="text-xl font-extrabold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Current project */}
        {selectedIdea && (
          <div className="bg-card rounded-3xl p-4 shadow-card">
            <p className="text-[10px] text-muted-foreground font-semibold mb-2">Current Project</p>
            <h4 className="text-sm font-bold">{selectedIdea.title}</h4>
            <p className="text-[10px] text-muted-foreground mt-1">{selectedIdea.difficulty} · {selectedIdea.career}</p>
          </div>
        )}

        {/* Menu */}
        <div className="bg-card rounded-3xl shadow-card overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/50 transition-colors active:bg-accent ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-base">{item.emoji}</span>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 text-sm text-destructive font-medium py-3"
        >
          🚪 Reset & Start Over
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
