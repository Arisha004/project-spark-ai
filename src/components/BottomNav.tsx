import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { emoji: "🏠", label: "Home", path: "/dashboard" },
  { emoji: "💡", label: "Ideas", path: "/ideas" },
  { emoji: "📂", label: "Projects", path: "/roadmap" },
  { emoji: "📦", label: "Bundle", path: "/bundle" },
  { emoji: "👤", label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/dashboard" && location.pathname === "/");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-accent"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <span className="text-base">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
