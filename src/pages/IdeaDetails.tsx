import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, BookOpen, Code, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

const ideaData: Record<number, any> = {
  1: {
    title: "AI-Powered Plagiarism Detector",
    difficulty: "Intermediate",
    overview: "Build an intelligent plagiarism detection system that uses Natural Language Processing and transformer models to analyze academic documents for potential plagiarism, providing detailed similarity reports.",
    features: ["Document upload & parsing", "NLP-based similarity analysis", "Detailed plagiarism reports", "Citation checker", "Batch processing", "Dashboard analytics"],
    technologies: ["Python", "Hugging Face Transformers", "React", "FastAPI", "PostgreSQL", "Redis"],
    whyStrong: "Plagiarism detection is a critical need in academia. This project demonstrates advanced NLP skills, system design, and practical real-world application — highly valued by employers in AI/ML.",
    color: "bg-pastel-purple",
  },
  2: {
    title: "Smart Campus Navigation",
    difficulty: "Beginner",
    overview: "A mobile application that helps students navigate university campus buildings with indoor mapping, AR wayfinding, and real-time room availability integration.",
    features: ["Indoor floor maps", "AR navigation", "Room availability", "Event locations", "Accessibility routes", "Bookmark locations"],
    technologies: ["React Native", "Firebase", "Google Maps API", "ARKit/ARCore"],
    whyStrong: "Combines mobile development with AR technology. Solves a real campus problem and demonstrates ability to build user-facing products with modern mobile frameworks.",
    color: "bg-pastel-blue",
  },
};

export default function IdeaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideaData[Number(id)] || ideaData[1];

  return (
    <div className="min-h-screen gradient-soft pb-8">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-bold flex-1">Idea Details</h1>
      </div>

      <div className="px-6 space-y-5">
        {/* Title card */}
        <div className={`${idea.color} rounded-3xl p-5 animate-fade-in`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-primary">{idea.difficulty}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.overview}</p>
        </div>

        {/* Features */}
        <div className="bg-card rounded-3xl p-5 shadow-card animate-slide-up">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Key Features
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {idea.features.map((f: string) => (
              <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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
            {idea.technologies.map((t: string) => (
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

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/research")}
            className="flex-1 bg-card text-foreground py-3.5 rounded-2xl font-semibold text-sm shadow-card flex items-center justify-center gap-2 hover:shadow-float transition-shadow"
          >
            <BookOpen className="w-4 h-4" /> Research
          </button>
          <button
            onClick={() => navigate("/bundle")}
            className="flex-1 gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm shadow-soft flex items-center justify-center gap-2"
          >
            Generate Bundle <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
