import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Star, Zap, TrendingUp, Code } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const ideas = [
  {
    id: 1,
    title: "AI-Powered Plagiarism Detector",
    difficulty: "Intermediate",
    techStack: ["Python", "NLP", "React"],
    impact: "High",
    career: "AI/ML Engineer",
    description: "Build an intelligent system that detects academic plagiarism using NLP and transformer models.",
    color: "bg-pastel-purple",
  },
  {
    id: 2,
    title: "Smart Campus Navigation",
    difficulty: "Beginner",
    techStack: ["React Native", "Firebase", "Maps API"],
    impact: "Medium",
    career: "Mobile Developer",
    description: "A mobile app that helps students navigate campus with indoor mapping and AR wayfinding.",
    color: "bg-pastel-blue",
  },
  {
    id: 3,
    title: "Blockchain Credential Verifier",
    difficulty: "Advanced",
    techStack: ["Solidity", "Next.js", "IPFS"],
    impact: "High",
    career: "Blockchain Developer",
    description: "A decentralized system for verifying academic credentials using blockchain technology.",
    color: "bg-pastel-pink",
  },
  {
    id: 4,
    title: "Mental Health Chatbot",
    difficulty: "Intermediate",
    techStack: ["Python", "GPT API", "React"],
    impact: "High",
    career: "AI Engineer",
    description: "An AI chatbot providing mental health support and connecting students with resources.",
    color: "bg-pastel-green",
  },
  {
    id: 5,
    title: "Real-Time Study Group Finder",
    difficulty: "Beginner",
    techStack: ["React", "Supabase", "WebSocket"],
    impact: "Medium",
    career: "Full-Stack Developer",
    description: "Platform that matches students into study groups based on courses, schedule, and location.",
    color: "bg-pastel-yellow",
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "bg-pastel-green text-foreground",
  Intermediate: "bg-pastel-yellow text-foreground",
  Advanced: "bg-pastel-pink text-foreground",
};

export default function Ideas() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = filter === "All" ? ideas : ideas.filter((i) => i.difficulty === filter);

  return (
    <div className="min-h-screen gradient-soft pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">FYP Ideas</h1>
            <p className="text-xs text-muted-foreground">AI-curated recommendations</p>
          </div>
          <div className="w-10 h-10 rounded-2xl gradient-accent flex items-center justify-center shadow-soft">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Filters */}
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

      {/* Ideas list */}
      <div className="px-6 space-y-4">
        {filtered.map((idea, i) => (
          <button
            key={idea.id}
            onClick={() => navigate(`/idea/${idea.id}`)}
            className={`w-full text-left bg-card rounded-3xl p-5 shadow-card hover:shadow-float transition-all animate-slide-up`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${idea.color} rounded-2xl flex items-center justify-center`}>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${difficultyColor[idea.difficulty]}`}>
                {idea.difficulty}
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1.5">{idea.title}</h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{idea.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {idea.techStack.map((tech) => (
                <span key={tech} className="text-[10px] bg-accent px-2 py-1 rounded-full font-medium text-accent-foreground">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {idea.impact} Impact</span>
              <span className="flex items-center gap-1"><Code className="w-3 h-3" /> {idea.career}</span>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
