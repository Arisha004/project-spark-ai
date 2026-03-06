import { useNavigate } from "react-router-dom";
import { User, Settings, FileText, LogOut, ChevronRight, Bell, Shield, HelpCircle, Star } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import robotMascot from "@/assets/robot-mascot.png";

const menuItems = [
  { icon: FileText, label: "My Documents", path: "/docs" },
  { icon: Bell, label: "Notifications", path: "#" },
  { icon: Star, label: "Saved Ideas", path: "#" },
  { icon: Shield, label: "Privacy", path: "#" },
  { icon: HelpCircle, label: "Help & Support", path: "#" },
  { icon: Settings, label: "Settings", path: "#" },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-soft pb-24">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-lg font-bold">Profile</h1>
      </div>

      <div className="px-6 space-y-5">
        {/* Profile card */}
        <div className="bg-card rounded-3xl p-5 shadow-card flex items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-soft">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold">Student User</h2>
            <p className="text-xs text-muted-foreground">Computer Science · Year 4</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] bg-pastel-purple px-2 py-0.5 rounded-full font-medium">AI</span>
              <span className="text-[10px] bg-pastel-blue px-2 py-0.5 rounded-full font-medium">Web Dev</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Projects", value: "2" },
            { label: "Bundles", value: "1" },
            { label: "Docs", value: "4" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-3xl p-4 shadow-card text-center">
              <p className="text-xl font-bold text-primary">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="bg-card rounded-3xl shadow-card overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/50 transition-colors ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 text-sm text-destructive font-medium py-3">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
