import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, BookOpen, Code, TrendingUp, CheckCircle2, ArrowRight, Heart } from "lucide-react";
import { useApp, allIdeas } from "@/context/AppContext";
import { useState } from "react";
import { toast } from "sonner";

export default function IdeaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedIdea, selectedIdea } = useApp();
  const [liked, setLiked] = useState(false);
  
  const idea = allIdeas.find((i) => i.id === Number(id)) || allIdeas[0];
  const isSelected = selectedIdea?.id === idea.id;

  const handleSelectIdea = () => {
    setSelectedIdea(idea);
    toast.success(`"${idea.title}" selected as your FYP project!`);
  };

  return (
    <div className="min-h-screen gradient-soft pb-8">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-bold flex-1">Idea Details</h1>
        <button
          onClick={() => setLiked(!liked)}
          className={`w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center transition-colors ${liked ? "text-destructive" : ""}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="px-6 space-y-4">
        {/* Title card */}
        <div className={`${idea.color} rounded-3xl p-5 animate-fade-in`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-primary">{idea.difficulty}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.overview}</p>
        </div>

        {/* Career & Impact */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-3xl p-4 shadow-card text-center">
            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold">{idea.impact} Impact</p>
            <p className="text-[10px] text-muted-foreground">Real-world value</p>
          </div>
          <div className="bg-card rounded-3xl p-4 shadow-card text-center">
            <Code className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold">{idea.career}</p>
            <p className="text-[10px] text-muted-foreground">Career path</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-3xl p-5 shadow-card animate-slide-up">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Key Features
          </h3>
          <div className="space-y-2">
            {idea.features.map((f: string) => (
              <div key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-card rounded-3xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" /> Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {idea.techStack.map((t: string) => (
              <span key={t} className="text-xs bg-accent px-3 py-1.5 rounded-full font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Why strong */}
        <div className="bg-card rounded-3xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Why It's a Strong FYP
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{idea.whyStrong}</p>
        </div>

        {/* Select as project */}
        {!isSelected ? (
          <button
            onClick={handleSelectIdea}
            className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft"
          >
            <Sparkles className="w-4 h-4" /> Select as My FYP Project
          </button>
        ) : (
          <div className="w-full bg-pastel-green text-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> This is your current project
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/research")}
            className="flex-1 bg-card text-foreground py-3 rounded-2xl font-semibold text-sm shadow-card flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Research
          </button>
          <button
            onClick={() => {
              if (!isSelected) handleSelectIdea();
              navigate("/bundle");
            }}
            className="flex-1 gradient-accent text-primary-foreground py-3 rounded-2xl font-semibold text-sm shadow-soft flex items-center justify-center gap-2"
          >
            Bundle <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
