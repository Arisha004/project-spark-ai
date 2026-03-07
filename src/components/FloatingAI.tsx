import { Bot, Send, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const quickReplies = [
  { text: "Find ideas", path: "/ideas" },
  { text: "Plan project", path: "/roadmap" },
  { text: "Generate bundle", path: "/bundle" },
  { text: "Track milestones", path: "/milestones" },
];

export function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! I'm Forge AI, your project mentor. I can help you pick an FYP idea, plan your project, or generate your Vibe Coding Bundle. What would you like to do?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { selectedIdea, userName } = useApp();

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    setMessages((prev) => [...prev, { role: "user", text: reply.text }]);
    setTimeout(() => {
      let response = "";
      switch (reply.path) {
        case "/ideas":
          response = "Let me show you AI-curated FYP ideas based on your interests! 🎯";
          break;
        case "/roadmap":
          response = selectedIdea
            ? `Here's the roadmap for "${selectedIdea.title}". Let's plan your milestones! 📋`
            : "You'll need to select a project first. Let me take you to the ideas page! 💡";
          break;
        case "/bundle":
          response = selectedIdea
            ? `I'll generate a complete Vibe Coding Bundle for "${selectedIdea.title}"! 📦`
            : "Pick a project idea first, then I'll generate your coding bundle! ✨";
          break;
        case "/milestones":
          response = "Let's track your project milestones and keep you on schedule! ✅";
          break;
      }
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
      setTimeout(() => {
        navigate(selectedIdea ? reply.path : (reply.path === "/roadmap" || reply.path === "/bundle" ? "/ideas" : reply.path));
        setOpen(false);
      }, 1500);
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = input.trim().toLowerCase();
    setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
    setInput("");

    setTimeout(() => {
      let response = "";
      if (msg.includes("idea") || msg.includes("project") || msg.includes("suggest")) {
        response = "I have several AI-curated ideas for you! Let me take you to the ideas page. 🎯";
        setTimeout(() => { navigate("/ideas"); setOpen(false); }, 1500);
      } else if (msg.includes("bundle") || msg.includes("code") || msg.includes("download")) {
        response = selectedIdea
          ? `I can generate a Vibe Coding Bundle for "${selectedIdea.title}". Let's go! 📦`
          : "Select a project first, then I'll generate your bundle! 💡";
        setTimeout(() => { navigate(selectedIdea ? "/bundle" : "/ideas"); setOpen(false); }, 1500);
      } else if (msg.includes("roadmap") || msg.includes("plan") || msg.includes("timeline")) {
        response = "Let me show you the project roadmap and timeline! 📋";
        setTimeout(() => { navigate("/roadmap"); setOpen(false); }, 1500);
      } else if (msg.includes("help") || msg.includes("how")) {
        response = `Here's how FYP Forge works:\n1. Browse & select an FYP idea\n2. View research insights\n3. Generate a Vibe Coding Bundle\n4. Download & upload to Cursor/Kiro\n5. Track milestones as you build!`;
      } else {
        response = `Great question${userName ? `, ${userName}` : ""}! I'm here to help with your FYP. Try asking about ideas, bundles, roadmaps, or milestones. 😊`;
      }
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 max-w-[calc(100%-2rem)]">
      {open && (
        <div className="mb-3 w-80 max-w-full bg-card rounded-3xl shadow-float border border-border animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 border-b border-border">
            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Forge AI</p>
              <p className="text-[10px] text-muted-foreground">Your project mentor</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] text-xs leading-relaxed rounded-2xl px-3 py-2 ${
                  msg.role === "user"
                    ? "gradient-accent text-primary-foreground rounded-br-sm"
                    : "bg-accent text-foreground rounded-bl-sm"
                }`}>
                  {msg.text.split("\n").map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
            {quickReplies.map((q) => (
              <button
                key={q.text}
                onClick={() => handleQuickReply(q)}
                className="text-[10px] bg-accent text-accent-foreground px-2.5 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
              >
                {q.text}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-accent rounded-xl px-3 py-2 text-xs outline-none"
            />
            <button onClick={handleSend} className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
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
