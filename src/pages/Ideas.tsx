import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-pastel-green text-foreground",
  Intermediate: "bg-pastel-yellow text-foreground",
  Advanced: "bg-pastel-pink text-foreground",
};

export default function Ideas() {
  const navigate = useNavigate();
  const { getFilteredIdeas } = useApp();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const ideas = getFilteredIdeas();
  const filtered = filter === "All" ? ideas : ideas.filter((i) => i.difficulty === filter);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold tracking-tight">FYP Ideas</h1>
            <p className="text-xs text-muted-foreground">{ideas.length} ideas matched to your interests</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === f ? "gradient-accent text-primary-foreground" : "bg-card text-muted-foreground shadow-soft"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-card rounded-3xl p-8 shadow-card text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-sm font-semibold">No ideas found</p>
            <p className="text-xs text-muted-foreground mt-1">Try changing your filters or interests</p>
          </div>
        ) : (
          filtered.map((idea, i) => (
            <button
              key={idea.id}
              onClick={() => navigate(`/idea/${idea.id}`)}
              className="w-full text-left bg-card rounded-3xl p-5 shadow-card hover:shadow-float transition-all animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${idea.color} rounded-2xl flex items-center justify-center text-sm`}>
                  💡
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${difficultyColor[idea.difficulty]}`}>
                  {idea.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-sm mb-1.5">{idea.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{idea.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {idea.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-[10px] bg-accent px-2 py-1 rounded-full font-medium text-accent-foreground">
                    {tech}
                  </span>
                ))}
                {idea.techStack.length > 3 && (
                  <span className="text-[10px] bg-accent px-2 py-1 rounded-full font-medium text-accent-foreground">
                    +{idea.techStack.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                <span>{idea.impact} Impact</span>
                <span>{idea.career}</span>
              </div>
            </button>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
