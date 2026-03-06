import { Bot } from "lucide-react";
import { useState } from "react";

export function FloatingAI() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {open && (
        <div className="mb-3 w-72 bg-card rounded-3xl shadow-float p-4 animate-scale-in border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">Forge AI</p>
              <p className="text-[10px] text-muted-foreground">Your project mentor</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Hi! I can help you pick an FYP idea, plan your project, or generate your Vibe Coding Bundle. What do you need?
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Find ideas", "Plan project", "Generate bundle"].map((q) => (
              <button
                key={q}
                className="text-xs bg-accent text-accent-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full gradient-accent shadow-float flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <Bot className="w-6 h-6 text-primary-foreground" />
      </button>
    </div>
  );
}
