import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { useState } from "react";

const previewContent = `# Product Requirement Document (PRD)
## AI-Powered Plagiarism Detector

### 1. Product Overview
An intelligent plagiarism detection system using NLP and transformer 
models to analyze academic documents for plagiarism.

### 2. Goals
- Detect paraphrased plagiarism with 90%+ accuracy
- Process documents in under 30 seconds
- Support PDF, DOCX, and TXT formats
- Generate detailed similarity reports

### 3. User Stories
- As a student, I can upload my document to check for plagiarism
- As a professor, I can batch-check multiple submissions
- As an admin, I can view analytics dashboard

### 4. Technical Requirements
- Backend: Python + FastAPI
- Frontend: React + TypeScript
- ML Model: Fine-tuned BERT for semantic similarity
- Database: PostgreSQL
- Cache: Redis for processed documents

### 5. MVP Features
1. Single document upload & scan
2. Similarity percentage score
3. Highlighted matching sections
4. Basic report generation
5. User authentication`;

export default function BundlePreview() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(previewContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen gradient-soft pb-8">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">PRD Preview</h1>
          <p className="text-xs text-muted-foreground">PRD.md · 4.2 KB</p>
        </div>
        <button
          onClick={handleCopy}
          className="w-10 h-10 rounded-2xl bg-card shadow-soft flex items-center justify-center"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-6">
        <div className="bg-card rounded-3xl p-5 shadow-card animate-fade-in">
          <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
            {previewContent}
          </pre>
        </div>

        <button className="w-full gradient-accent text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft mt-5">
          <Download className="w-4 h-4" /> Download Bundle
        </button>
      </div>
    </div>
  );
}
