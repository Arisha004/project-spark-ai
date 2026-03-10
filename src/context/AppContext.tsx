import { createContext, useContext, useState, ReactNode } from "react";

export interface FYPIdea {
  id: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  techStack: string[];
  impact: string;
  career: string;
  description: string;
  color: string;
  category: string[];
  overview: string;
  features: string[];
  whyStrong: string;
  problemStatement: string;
  researchBackground: string;
  potentialImpact: string;
  literatureSummary: string;
}

export const allIdeas: FYPIdea[] = [
  {
    id: 1,
    title: "AI-Powered Plagiarism Detector",
    difficulty: "Intermediate",
    techStack: ["Python", "Hugging Face", "React", "FastAPI", "PostgreSQL"],
    impact: "High",
    career: "AI/ML Engineer",
    description: "An intelligent plagiarism detection system using NLP and transformer models to analyze academic documents.",
    color: "bg-pastel-blue",
    category: ["ai", "ml", "se"],
    overview: "Build an intelligent plagiarism detection system that uses Natural Language Processing and transformer models to analyze academic documents for potential plagiarism, providing detailed similarity reports with highlighted sections.",
    features: ["Document upload & parsing (PDF, DOCX, TXT)", "NLP-based semantic similarity analysis", "Detailed plagiarism reports with highlights", "Citation checker & bibliography validator", "Batch processing for multiple documents", "Dashboard with analytics & trends"],
    whyStrong: "Plagiarism detection is a critical need in academia. This project demonstrates advanced NLP skills, system design, and practical real-world application — highly valued by employers in AI/ML roles.",
    problemStatement: "Academic plagiarism remains a significant challenge in higher education. Existing tools like Turnitin rely on string matching and fail to detect paraphrased content, cross-language plagiarism, and AI-generated text. There is an urgent need for intelligent detection systems that understand semantic meaning.",
    researchBackground: "Natural Language Processing has advanced significantly with transformer architectures (BERT, GPT, T5). These models can understand semantic meaning through contextual embeddings, enabling more sophisticated plagiarism detection beyond traditional n-gram matching. Recent work by Wahle et al. (2022) demonstrated 94% accuracy using fine-tuned transformers.",
    potentialImpact: "An AI-powered plagiarism detector could reduce manual review time by 70%, improve detection accuracy for paraphrased content by 40%, and support cross-language detection — benefiting universities, publishers, and research institutions worldwide.",
    literatureSummary: "Key papers: (1) Foltýnek et al. (2019) - Taxonomy of plagiarism detection methods covering 50+ approaches, (2) Wahle et al. (2022) - Transformer-based plagiarism detection achieving state-of-the-art results, (3) Alzahrani et al. (2012) - Understanding plagiarism linguistic patterns across 15 languages.",
  },
  {
    id: 2,
    title: "Smart Campus Navigation",
    difficulty: "Beginner",
    techStack: ["React Native", "Firebase", "Google Maps API", "Node.js"],
    impact: "Medium",
    career: "Mobile Developer",
    description: "A mobile app that helps students navigate university campus with indoor mapping and real-time room availability.",
    color: "bg-pastel-blue",
    category: ["mobile", "web"],
    overview: "A mobile application that helps students navigate university campus buildings with indoor floor maps, AR-assisted wayfinding, and real-time room availability integration with the university timetable system.",
    features: ["Interactive indoor floor maps", "Turn-by-turn navigation", "Real-time room availability", "Event & class locations", "Accessibility-friendly routes", "Bookmark favorite locations"],
    whyStrong: "Combines mobile development with mapping APIs and real-time data. Solves a genuine campus problem and demonstrates ability to build polished, user-facing products with modern mobile frameworks.",
    problemStatement: "Large university campuses are difficult to navigate, especially for new students. Finding specific rooms, labs, and offices often wastes 15-20 minutes per day. Existing maps are outdated static PDFs that don't reflect real-time room availability or construction changes.",
    researchBackground: "Indoor positioning systems (IPS) have evolved from WiFi fingerprinting to BLE beacon-based solutions. Google's Indoor Maps API and Apple's Indoor Positioning provide frameworks for indoor navigation. AR wayfinding using ARKit/ARCore overlays directional cues onto camera feeds.",
    potentialImpact: "Could save students an average of 45 minutes per week in navigation time, improve accessibility for disabled students, and reduce late arrivals to classes by 30%. Scalable to any large campus or complex building.",
    literatureSummary: "Key works: (1) Xiao et al. (2020) - Survey of indoor positioning technologies, (2) Retscher (2020) - BLE-based campus navigation achieving 2m accuracy, (3) Chen et al. (2019) - AR-assisted indoor wayfinding improving user satisfaction by 65%.",
  },
  {
    id: 3,
    title: "Blockchain Credential Verifier",
    difficulty: "Advanced",
    techStack: ["Solidity", "Next.js", "IPFS", "Ethereum", "TypeScript"],
    impact: "High",
    career: "Blockchain Developer",
    description: "A decentralized system for verifying academic credentials using blockchain, preventing fraud and forgery.",
    color: "bg-pastel-pink",
    category: ["cyber", "web", "se"],
    overview: "A decentralized platform where universities issue tamper-proof digital credentials on the blockchain, and employers can instantly verify degrees, certificates, and transcripts without contacting the institution.",
    features: ["University credential issuance portal", "Student credential wallet", "Employer verification dashboard", "QR code instant verification", "Multi-institution support", "Audit trail & revocation"],
    whyStrong: "Blockchain + education is a growing field. This demonstrates smart contract development, decentralized architecture, and solves real credential fraud problems — impressive for both blockchain and enterprise roles.",
    problemStatement: "Credential fraud costs employers billions annually. Manual verification takes 2-4 weeks and involves phone calls and emails. Digital credentials stored in centralized databases are vulnerable to hacking and tampering. A decentralized solution is needed.",
    researchBackground: "Blockchain provides immutable, transparent record-keeping ideal for credential verification. Projects like MIT's Digital Diplomas and Blockcerts have pioneered this space. IPFS (InterPlanetary File System) enables decentralized storage of credential documents.",
    potentialImpact: "Could reduce verification time from weeks to seconds, eliminate credential fraud (estimated $7B annual cost), and give students portable, lifelong digital credentials that work across borders.",
    literatureSummary: "Key papers: (1) Grech & Camilleri (2017) - Blockchain in Education report for EU, (2) MIT Digital Diplomas (2018) - First blockchain-based university credentials, (3) Sharples & Domingue (2016) - Blockchain and smart contracts for education.",
  },
  {
    id: 4,
    title: "Mental Health Support Chatbot",
    difficulty: "Intermediate",
    techStack: ["Python", "GPT API", "React", "Flask", "MongoDB"],
    impact: "High",
    career: "AI Engineer",
    description: "An AI chatbot providing initial mental health support, mood tracking, and connecting students with professional resources.",
    color: "bg-pastel-green",
    category: ["ai", "web", "ml"],
    overview: "An empathetic AI chatbot that provides initial mental health support through conversation, tracks mood patterns over time, offers coping strategies based on CBT principles, and seamlessly connects students with professional counseling services when needed.",
    features: ["Empathetic conversational AI", "Daily mood tracking & journaling", "CBT-based coping exercises", "Crisis detection & escalation", "Anonymous usage mode", "Resource & counselor directory"],
    whyStrong: "Mental health in universities is a critical and growing concern. This project combines NLP, empathetic AI design, and ethical considerations — demonstrating both technical skill and social responsibility.",
    problemStatement: "70% of university students report moderate to severe stress, but only 30% seek professional help due to stigma, cost, and wait times averaging 2-3 weeks. An accessible, anonymous first-line support tool could bridge this gap.",
    researchBackground: "Conversational AI for mental health has shown promise: Woebot (Stanford) reduced depression symptoms by 22% in 2 weeks. GPT-based chatbots can be fine-tuned for empathetic responses. CBT (Cognitive Behavioral Therapy) principles can be encoded as structured conversation flows.",
    potentialImpact: "Could provide immediate support to students in distress, reduce counseling wait times by handling initial screenings, and identify at-risk students early. Potential to reach 5x more students than traditional counseling.",
    literatureSummary: "Key papers: (1) Fitzpatrick et al. (2017) - Woebot RCT showing significant depression reduction, (2) Abd-Alrazaq et al. (2019) - Systematic review of mental health chatbots, (3) Miner et al. (2016) - Smartphone-based crisis responses and AI.",
  },
  {
    id: 5,
    title: "Real-Time Study Group Finder",
    difficulty: "Beginner",
    techStack: ["React", "Supabase", "WebSocket", "Tailwind CSS"],
    impact: "Medium",
    career: "Full-Stack Developer",
    description: "A platform matching students into study groups based on courses, schedule, location, and learning style.",
    color: "bg-pastel-yellow",
    category: ["web", "mobile", "data"],
    overview: "A real-time platform where students can find and join study groups based on their courses, available times, campus location, and preferred study style. Features live chat, shared resources, and group scheduling.",
    features: ["Smart group matching algorithm", "Real-time group chat", "Shared resource library", "Session scheduling & reminders", "Campus location integration", "Study streak & gamification"],
    whyStrong: "Full-stack web development with real-time features is highly employable. This project covers authentication, real-time data, matching algorithms, and a polished UI — perfect for demonstrating production-ready skills.",
    problemStatement: "Students struggle to find compatible study partners. 60% of students report studying alone despite research showing group study improves retention by 50%. Current solutions (WhatsApp groups, notice boards) are unstructured and hard to discover.",
    researchBackground: "Collaborative learning theory (Vygotsky's ZPD) supports peer study. Matching algorithms similar to dating apps can be adapted for academic compatibility. Real-time communication via WebSocket enables instant group coordination.",
    potentialImpact: "Could increase study group participation by 3x, improve average grades by 0.5 GPA points, and reduce academic isolation. Scalable to any university with minimal setup.",
    literatureSummary: "Key papers: (1) Johnson & Johnson (2009) - Meta-analysis of cooperative learning with 1200+ studies, (2) Chi & Wylie (2014) - ICAP framework for active learning, (3) Springer et al. (1999) - Effects of small-group learning in STEM.",
  },
  {
    id: 6,
    title: "Automated Code Review Tool",
    difficulty: "Advanced",
    techStack: ["Python", "AST", "React", "Docker", "GitHub API"],
    impact: "High",
    career: "DevOps Engineer",
    description: "An AI tool that automatically reviews code for bugs, style violations, security issues, and suggests improvements.",
    color: "bg-pastel-mint",
    category: ["se", "ai", "cyber"],
    overview: "An automated code review platform that analyzes pull requests for bugs, security vulnerabilities, style violations, and performance issues using static analysis and ML models, then provides actionable suggestions inline.",
    features: ["GitHub/GitLab PR integration", "Multi-language support", "Security vulnerability scanning", "Code style enforcement", "Performance profiling hints", "Learning from team patterns"],
    whyStrong: "DevOps and code quality tools are in massive demand. This project shows deep understanding of software engineering, AST parsing, security analysis, and CI/CD integration — exactly what top tech companies look for.",
    problemStatement: "Code reviews are the biggest bottleneck in software development, taking an average of 4-8 hours per week per developer. Manual reviews miss 60% of potential bugs. Automated tools are needed to augment human reviewers.",
    researchBackground: "Static analysis tools (SonarQube, ESLint) catch syntax-level issues. ML-based approaches using code embeddings (Code2Vec, CodeBERT) can detect semantic bugs. GitHub's CodeQL demonstrates the power of query-based vulnerability detection.",
    potentialImpact: "Could reduce code review time by 50%, catch 40% more bugs before production, and standardize code quality across teams. Applicable to any software organization.",
    literatureSummary: "Key papers: (1) Alon et al. (2019) - Code2Vec for code representation, (2) Feng et al. (2020) - CodeBERT for programming languages, (3) Sadowski et al. (2018) - Google's Tricorder static analysis at scale.",
  },
  {
    id: 7,
    title: "IoT Smart Classroom System",
    difficulty: "Intermediate",
    techStack: ["Arduino", "MQTT", "React", "Node.js", "InfluxDB"],
    impact: "Medium",
    career: "IoT Engineer",
    description: "An IoT system that monitors classroom environment (temperature, humidity, CO2, noise) and auto-adjusts for optimal learning.",
    color: "bg-pastel-purple",
    category: ["se", "data", "ai"],
    overview: "A smart classroom monitoring system using IoT sensors to track environmental conditions and automatically optimize them for learning. Includes a dashboard for facility managers and real-time alerts for teachers.",
    features: ["Multi-sensor monitoring", "Auto HVAC/lighting control", "Occupancy detection", "Energy usage analytics", "Mobile alerts for facility staff", "Historical trend analysis"],
    whyStrong: "IoT is a rapidly growing field. This project combines hardware, networking protocols, real-time data processing, and dashboard development — making it ideal for IoT engineering or smart building roles.",
    problemStatement: "Poor classroom environments directly impact learning. Studies show that CO2 levels above 1000ppm reduce cognitive performance by 20%. Most classrooms lack environmental monitoring, leading to suboptimal conditions.",
    researchBackground: "IoT sensor networks using MQTT protocol enable efficient data collection. Time-series databases like InfluxDB handle high-frequency sensor data. Machine learning on environmental data can predict optimal conditions.",
    potentialImpact: "Could improve student focus and performance by 15%, reduce energy consumption by 25% through smart controls, and provide data-driven facility management. Applicable to any educational institution.",
    literatureSummary: "Key works: (1) Wargocki & Wyon (2017) - Indoor air quality and learning performance, (2) Gubbi et al. (2013) - IoT vision and directions in smart environments, (3) Satish et al. (2012) - CO2 impact on cognitive function.",
  },
  {
    id: 8,
    title: "Fake News Detection System",
    difficulty: "Intermediate",
    techStack: ["Python", "BERT", "React", "FastAPI", "Neo4j"],
    impact: "High",
    career: "Data Scientist",
    description: "An AI system that detects fake news articles using NLP analysis, source credibility scoring, and claim verification.",
    color: "bg-pastel-blue",
    category: ["ai", "ml", "data", "cyber"],
    overview: "A comprehensive fake news detection platform that analyzes news articles using NLP for linguistic patterns, checks source credibility via knowledge graphs, cross-references claims with fact-checking databases, and provides a reliability score.",
    features: ["Article URL or text input", "NLP linguistic analysis", "Source credibility graph", "Claim cross-referencing", "Reliability score with explanation", "Browser extension for real-time checking"],
    whyStrong: "Misinformation detection is a critical societal challenge. This project showcases NLP, knowledge graphs, API integration, and Chrome extension development — skills valued in media tech, cybersecurity, and data science.",
    problemStatement: "Misinformation spreads 6x faster than truth on social media (MIT 2018). 67% of people encounter fake news weekly. Existing fact-checking is manual and slow, checking only 1% of viral claims.",
    researchBackground: "Fake news detection approaches include linguistic analysis (writing style patterns), network analysis (propagation patterns), and knowledge-based verification. BERT-based classifiers achieve 90%+ accuracy on benchmark datasets.",
    potentialImpact: "Could provide instant credibility assessment for news articles, reduce misinformation sharing by 30%, and support journalists in rapid fact-checking. Scalable to multiple languages.",
    literatureSummary: "Key papers: (1) Vosoughi et al. (2018) - MIT study on true vs false news spread, (2) Zhou & Zafarani (2020) - Survey of fake news detection approaches, (3) Shu et al. (2017) - FakeNewsNet benchmark dataset.",
  },
];

interface AppState {
  interests: string[];
  selectedIdea: FYPIdea | null;
  userName: string;
  university: string;
  year: string;
  completedMilestones: string[];
  bundleGenerated: boolean;
  onboardingComplete: boolean;
}

interface AppContextType extends AppState {
  setInterests: (interests: string[]) => void;
  setSelectedIdea: (idea: FYPIdea | null) => void;
  setUserName: (name: string) => void;
  setUniversity: (uni: string) => void;
  setYear: (year: string) => void;
  toggleMilestone: (title: string) => void;
  setBundleGenerated: (v: boolean) => void;
  setOnboardingComplete: (v: boolean) => void;
  getFilteredIdeas: () => FYPIdea[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("fyp-forge-state");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return {
      interests: [],
      selectedIdea: null,
      userName: "",
      university: "",
      year: "4",
      completedMilestones: [],
      bundleGenerated: false,
      onboardingComplete: false,
    };
  });

  const persist = (newState: AppState) => {
    setState(newState);
    localStorage.setItem("fyp-forge-state", JSON.stringify(newState));
  };

  const setInterests = (interests: string[]) => persist({ ...state, interests });
  const setSelectedIdea = (idea: FYPIdea | null) => persist({ ...state, selectedIdea: idea, bundleGenerated: false });
  const setUserName = (name: string) => persist({ ...state, userName: name });
  const setUniversity = (uni: string) => persist({ ...state, university: uni });
  const setYear = (year: string) => persist({ ...state, year });
  const toggleMilestone = (title: string) => {
    const cm = state.completedMilestones.includes(title)
      ? state.completedMilestones.filter((m) => m !== title)
      : [...state.completedMilestones, title];
    persist({ ...state, completedMilestones: cm });
  };
  const setBundleGenerated = (v: boolean) => persist({ ...state, bundleGenerated: v });
  const setOnboardingComplete = (v: boolean) => persist({ ...state, onboardingComplete: v });

  const getFilteredIdeas = () => {
    if (state.interests.length === 0) return allIdeas;
    return allIdeas.filter((idea) => idea.category.some((c) => state.interests.includes(c)));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setInterests, setSelectedIdea, setUserName, setUniversity, setYear,
      toggleMilestone, setBundleGenerated, setOnboardingComplete, getFilteredIdeas,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
