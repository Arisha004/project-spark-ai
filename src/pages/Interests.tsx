import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";

const fields = [
  { id: "ai", label: "Artificial Intelligence", emoji: "🧠", color: "bg-pastel-blue" },
  { id: "web", label: "Web Development", emoji: "🌐", color: "bg-pastel-yellow" },
  { id: "data", label: "Data Science", emoji: "📊", color: "bg-pastel-green" },
  { id: "cyber", label: "Cybersecurity", emoji: "🔐", color: "bg-pastel-pink" },
  { id: "mobile", label: "Mobile Apps", emoji: "📱", color: "bg-pastel-yellow" },
  { id: "ml", label: "Machine Learning", emoji: "⚡", color: "bg-pastel-mint" },
  { id: "se", label: "Software Engineering", emoji: "💻", color: "bg-pastel-blue" },
  { id: "db", label: "Database Systems", emoji: "🗄️", color: "bg-pastel-slate" },
];

const careerGoals = [
  { id: "software", label: "Software Engineer" },
  { id: "ai-ml", label: "AI / ML Engineer" },
  { id: "data-sci", label: "Data Scientist" },
  { id: "fullstack", label: "Full-Stack Developer" },
  { id: "mobile-dev", label: "Mobile Developer" },
  { id: "devops", label: "DevOps / Cloud" },
  { id: "cyber-sec", label: "Cybersecurity" },
  { id: "research", label: "Research / Academia" },
];

const projectPreferences = [
  { id: "practical", label: "Practical / Industry-ready", desc: "Build something companies would use" },
  { id: "research", label: "Research-oriented", desc: "Explore new ideas and contribute to knowledge" },
  { id: "social", label: "Social Impact", desc: "Solve real-world problems for communities" },
  { id: "innovative", label: "Innovative / Cutting-edge", desc: "Work with the latest technologies" },
];

const skillLevels = [
  { id: "beginner", label: "Beginner", desc: "Learning the basics, need guided projects" },
  { id: "intermediate", label: "Intermediate", desc: "Comfortable with coding, ready for a challenge" },
  { id: "advanced", label: "Advanced", desc: "Experienced developer, want complex projects" },
];

export default function Interests() {
  const {
    interests, setInterests,
    userName, setUserName, university, setUniversity,
    year, setYear, setCareerGoal, setProjectPreference, setSkillLevel,
    completeOnboarding,
  } = useApp();

  const [step, setStep] = useState(0);
  const [name, setName] = useState(userName);
  const [uni, setUni] = useState(university);
  const [yr, setYr] = useState(year || "4");
  const [selected, setSelected] = useState<string[]>(interests);
  const [career, setCareer] = useState("");
  const [projPref, setProjPref] = useState("");
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const canProceed = () => {
    switch (step) {
      case 0: return name.trim().length > 0 && uni.trim().length > 0;
      case 1: return selected.length > 0;
      case 2: return career.length > 0;
      case 3: return projPref.length > 0 && skill.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        userName: name.trim(),
        university: uni.trim(),
        year: yr,
        interests: selected,
        careerGoal: career,
        projectPreference: projPref,
        skillLevel: skill,
      });
      navigate("/dashboard");
    }
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div className="flex-1 flex gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                i <= step ? "bg-foreground" : "bg-border"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground font-medium">{step + 1}/{totalSteps}</span>
      </div>

      <div className="flex-1">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div className="animate-fade-in">
            <p className="text-xs text-muted-foreground font-semibold mb-1 tracking-wider uppercase">About You</p>
            <h1 className="text-2xl font-extrabold mb-2 tracking-tight">Let's get to know you</h1>
            <p className="text-muted-foreground text-sm mb-6">We'll personalize your FYP recommendations based on your profile.</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-card rounded-2xl px-4 py-3.5 text-sm border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/10 outline-none transition-all shadow-soft"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">University</label>
                <input
                  type="text"
                  value={uni}
                  onChange={(e) => setUni(e.target.value)}
                  placeholder="e.g. FAST NUCES, LUMS, NUST"
                  className="w-full bg-card rounded-2xl px-4 py-3.5 text-sm border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/10 outline-none transition-all shadow-soft"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Year of Study</label>
                <div className="flex gap-2">
                  {["3", "4", "5"].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYr(y)}
                      className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all ${
                        yr === y ? "bg-foreground text-background" : "bg-card shadow-soft"
                      }`}
                    >
                      Year {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Interests */}
        {step === 1 && (
          <div className="animate-fade-in">
            <p className="text-xs text-muted-foreground font-semibold mb-1 tracking-wider uppercase">Your Interests</p>
            <h1 className="text-2xl font-extrabold mb-2 tracking-tight">What excites you?</h1>
            <p className="text-muted-foreground text-sm mb-6">Select all domains you're interested in. We'll match FYP ideas to these.</p>

            <div className="grid grid-cols-2 gap-3">
              {fields.map((field) => {
                const isSelected = selected.includes(field.id);
                return (
                  <button
                    key={field.id}
                    onClick={() => toggle(field.id)}
                    className={`p-4 rounded-3xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? "border-foreground bg-card shadow-float"
                        : "border-transparent bg-card shadow-card hover:shadow-float"
                    }`}
                  >
                    <div className={`w-10 h-10 ${field.color} rounded-2xl flex items-center justify-center mb-3 text-lg`}>
                      {field.emoji}
                    </div>
                    <span className="text-sm font-semibold">{field.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Career Goal */}
        {step === 2 && (
          <div className="animate-fade-in">
            <p className="text-xs text-muted-foreground font-semibold mb-1 tracking-wider uppercase">Career Vision</p>
            <h1 className="text-2xl font-extrabold mb-2 tracking-tight">Where do you see yourself?</h1>
            <p className="text-muted-foreground text-sm mb-6">Your career goal helps us suggest projects that build relevant skills.</p>

            <div className="space-y-3">
              {careerGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setCareer(goal.id)}
                  className={`w-full p-4 rounded-3xl border-2 text-left transition-all ${
                    career === goal.id
                      ? "border-foreground bg-card shadow-float"
                      : "border-transparent bg-card shadow-card"
                  }`}
                >
                  <span className="text-sm font-semibold">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Project Preference & Skill Level */}
        {step === 3 && (
          <div className="animate-fade-in">
            <p className="text-xs text-muted-foreground font-semibold mb-1 tracking-wider uppercase">Preferences</p>
            <h1 className="text-2xl font-extrabold mb-2 tracking-tight">Final details</h1>
            <p className="text-muted-foreground text-sm mb-6">Help us fine-tune the perfect project recommendations for you.</p>

            <label className="text-xs font-semibold text-muted-foreground mb-3 block">What kind of project do you prefer?</label>
            <div className="space-y-2 mb-6">
              {projectPreferences.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => setProjPref(pref.id)}
                  className={`w-full p-4 rounded-3xl border-2 text-left transition-all ${
                    projPref === pref.id
                      ? "border-foreground bg-card shadow-float"
                      : "border-transparent bg-card shadow-card"
                  }`}
                >
                  <p className="text-sm font-semibold">{pref.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{pref.desc}</p>
                </button>
              ))}
            </div>

            <label className="text-xs font-semibold text-muted-foreground mb-3 block">Your coding skill level</label>
            <div className="space-y-2">
              {skillLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSkill(level.id)}
                  className={`w-full p-4 rounded-3xl border-2 text-left transition-all ${
                    skill === level.id
                      ? "border-foreground bg-card shadow-float"
                      : "border-transparent bg-card shadow-card"
                  }`}
                >
                  <p className="text-sm font-semibold">{level.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{level.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!canProceed()}
        className="mt-6 w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-soft disabled:opacity-40 transition-all active:scale-[0.98]"
      >
        {step === 3 ? "Start My FYP Journey" : "Continue"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
