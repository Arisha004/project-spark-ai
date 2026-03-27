import type { FYPIdea } from "@/context/AppContext";

export function generatePRD(idea: FYPIdea): string {
  return `# Product Requirement Document (PRD)
## ${idea.title}

### 1. Product Overview
${idea.overview}

### 2. Problem Statement
${idea.problemStatement}

### 3. Goals & Objectives
- Build a functional MVP demonstrating core capabilities
- Achieve measurable impact in the target domain
- Create a scalable architecture for future enhancements
- Deliver a polished user experience suitable for demonstration

### 4. Target Users
- Primary: University students and faculty
- Secondary: Industry professionals and researchers
- Skill Level: ${idea.difficulty}

### 5. Key Features
${idea.features.map((f, i) => `${i + 1}. ${f}`).join("\n")}

### 6. Technical Requirements
- Tech Stack: ${idea.techStack.join(", ")}
- Performance: Page load < 3s, API response < 500ms
- Security: Authentication, input validation, data encryption
- Scalability: Support 100+ concurrent users

### 7. Success Metrics
- Feature completion: 100% of MVP scope
- Test coverage: > 80%
- User satisfaction: > 4.0/5.0 in usability testing
- Performance benchmarks met

### 8. Timeline
- Phase 1 (Week 1-3): Research & Planning
- Phase 2 (Week 4-6): Design & Architecture
- Phase 3 (Week 7-12): Core Development
- Phase 4 (Week 13-15): Testing & Deployment
- Phase 5 (Week 16): Documentation & Presentation

### 9. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | High | Strict MVP definition, weekly reviews |
| Technical complexity | Medium | Proof of concept early, mentor guidance |
| Data availability | Medium | Use public datasets, synthetic data generation |
| Time constraints | High | Prioritized feature backlog, agile sprints |

### 10. Deliverables
- Working application with core features
- Source code repository with documentation
- Final report (10,000+ words)
- Presentation slides & demo video
- User testing results
`;
}

export function generateUserFlow(idea: FYPIdea): string {
  return `# User Flow Document
## ${idea.title}

### Primary User Journey

\`\`\`
[Landing Page] → [Sign Up / Login] → [Dashboard]
       ↓
[Onboarding Survey] → [Personalized Setup]
       ↓
[Main Feature Access]
${idea.features.map((f) => `  ├── ${f}`).join("\n")}
       ↓
[Results / Output]
       ↓
[Export / Share / Save]
\`\`\`

### Detailed Flows

#### Flow 1: New User Registration
1. User visits landing page
2. Clicks "Get Started" CTA
3. Enters email and password
4. Verifies email address
5. Completes onboarding survey
6. Redirected to personalized dashboard

#### Flow 2: Core Feature Usage
1. User navigates to main feature from dashboard
2. Provides required input (upload/enter data)
3. System processes input (loading state shown)
4. Results displayed with visualizations
5. User can refine, export, or share results

#### Flow 3: Returning User
1. User logs in with credentials
2. Dashboard shows recent activity
3. Quick access to previous results
4. Notifications for updates/recommendations

### Error Handling Flows
- Invalid input → Clear error message with suggestions
- Network failure → Retry option with offline indicator
- Authentication expired → Seamless re-authentication
- Server error → Friendly error page with support link

### Navigation Structure
- Bottom Nav: Home | Features | History | Profile
- Header: Search | Notifications
- Floating: Help / AI Assistant
`;
}

export function generateFlowchart(idea: FYPIdea): string {
  return `# System Flowchart
## ${idea.title}

### High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────┐
│                 CLIENT LAYER                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Web App  │  │ Mobile   │  │  Admin   │  │
│  │  (React)  │  │  (PWA)   │  │  Panel   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
└───────┼──────────────┼──────────────┼────────┘
        │              │              │
        ▼              ▼              ▼
┌─────────────────────────────────────────────┐
│               API GATEWAY                    │
│         (Authentication + Rate Limiting)     │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│   Auth   │ │   Core   │ │  Admin   │
│ Service  │ │  Service │ │ Service  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │             │
     ▼            ▼             ▼
┌─────────────────────────────────────────────┐
│              DATA LAYER                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │PostgreSQL│  │  Redis   │  │  Storage │  │
│  │ Database │  │  Cache   │  │  (Files) │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
\`\`\`

### Request Flow
1. Client sends request → API Gateway
2. Gateway validates auth token
3. Request routed to appropriate service
4. Service processes business logic
5. Database/cache queried as needed
6. Response returned through gateway
7. Client updates UI

### Technology Stack
${idea.techStack.map((t) => `- ${t}`).join("\n")}

### API Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User authentication
- GET /api/data - Fetch user data
- POST /api/process - Core feature processing
- GET /api/results/:id - Get results
- PUT /api/settings - Update settings
- DELETE /api/data/:id - Delete data
`;
}

export function generateDatabaseSchema(idea: FYPIdea): string {
  return `-- Database Schema for: ${idea.title}
-- Generated by FYP Forge AI
-- Database: PostgreSQL

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CORE DATA TABLES
-- ============================================

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE project_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    data_type VARCHAR(50) NOT NULL,
    content TEXT,
    file_url TEXT,
    processed BOOLEAN DEFAULT FALSE,
    result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    result_type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL,
    score DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ANALYTICS & TRACKING
-- ============================================

CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_project_data_project_id ON project_data(project_id);
CREATE INDEX idx_results_project_id ON results(project_id);
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects"
    ON projects FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert own projects"
    ON projects FOR INSERT
    WITH CHECK (user_id = auth.uid());
`;
}

export function generateMVPScope(idea: FYPIdea): string {
  return `# MVP Scope Document
## ${idea.title}

### MVP Definition
The Minimum Viable Product focuses on delivering the core value proposition 
with the least amount of features needed to validate the concept and 
satisfy FYP requirements.

### In-Scope (MVP)
${idea.features.slice(0, 4).map((f, i) => `${i + 1}. ✅ ${f}`).join("\n")}

### Out-of-Scope (Future Iterations)
${idea.features.slice(4).map((f, i) => `${i + 1}. 🔮 ${f}`).join("\n")}

### MVP User Stories

#### Must Have (P0)
- As a user, I can create an account and log in securely
- As a user, I can access the core feature (${idea.features[0]})
- As a user, I can view results and output
- As a user, I can save and retrieve my data

#### Should Have (P1)
- As a user, I can customize settings
- As a user, I can export results
- As a user, I can view my usage history

#### Nice to Have (P2)
- As a user, I can share results with others
- As a user, I can receive notifications
- As an admin, I can view usage analytics

### Technical MVP Requirements
- **Frontend**: Responsive web application (${idea.techStack.filter(t => ["React", "Next.js", "React Native", "Vue.js"].includes(t)).join(", ") || "React"})
- **Backend**: RESTful API with authentication
- **Database**: ${idea.techStack.filter(t => ["PostgreSQL", "MongoDB", "Firebase", "Supabase"].includes(t)).join(", ") || "PostgreSQL"}
- **Deployment**: Cloud hosting (Vercel/Railway/AWS)
- **Testing**: Unit tests + integration tests (>80% coverage)

### Sprint Breakdown

#### Sprint 1 (Week 7-8): Foundation
- Project setup & CI/CD pipeline
- Authentication system
- Database schema & migrations
- Basic UI layout

#### Sprint 2 (Week 9-10): Core Feature
- Implement primary feature logic
- API endpoints for core functionality
- Frontend integration
- Basic error handling

#### Sprint 3 (Week 11-12): Polish & Testing
- Complete remaining MVP features
- Comprehensive testing
- Performance optimization
- UI/UX refinement
- Bug fixes

### Acceptance Criteria
- [ ] All P0 user stories implemented and tested
- [ ] Application deploys successfully
- [ ] Response times under 500ms
- [ ] No critical or high severity bugs
- [ ] Code review completed
- [ ] Basic documentation written
`;
}

export function generateMasterPrompt(idea: FYPIdea): string {
  return `# Master Vibe Coding Prompt
## ${idea.title}

> Use this prompt with AI coding tools (Cursor, Kiro, Antigravity, Bolt, Lovable) 
> to generate accurate, production-ready code for your FYP.

---

## Project Context

You are building: **${idea.title}**

${idea.overview}

## Technical Stack
${idea.techStack.map((t) => `- ${t}`).join("\n")}

## Core Requirements

### Architecture
- Follow clean architecture principles (separation of concerns)
- Use repository pattern for data access
- Implement service layer for business logic
- Use DTOs for API request/response

### Authentication & Security
- JWT-based authentication with refresh tokens
- Input validation on all endpoints
- Rate limiting on API routes
- CORS configuration for frontend origin
- Environment variables for sensitive config

### Database
- Use migrations for schema changes
- Implement proper indexing for query performance
- Add row-level security where applicable
- Use transactions for multi-table operations

### Frontend
- Responsive, mobile-first design
- Component-based architecture
- Global state management (Context/Zustand)
- Form validation with error feedback
- Loading states and error boundaries
- Accessibility (WCAG 2.1 AA)

### API Design
- RESTful conventions (proper HTTP methods & status codes)
- Consistent error response format
- Pagination for list endpoints
- Request validation middleware

## Key Features to Implement

${idea.features.map((f, i) => `### Feature ${i + 1}: ${f}
- Implement the core logic
- Add proper error handling
- Write unit tests
- Create UI components
`).join("\n")}

## Code Quality Standards
- TypeScript strict mode
- ESLint + Prettier configuration
- Meaningful variable and function names
- JSDoc comments for complex functions
- Error boundaries in React components
- Proper TypeScript types (no \`any\`)

## Testing Requirements
- Unit tests for utility functions
- Integration tests for API endpoints
- Component tests for critical UI flows
- E2E tests for core user journeys

## Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] HTTPS enabled
- [ ] Error monitoring setup (Sentry)
- [ ] Performance monitoring
- [ ] Backup strategy defined

---

*Generated by FYP Forge — Your AI Project Mentor*
`;
}

export async function downloadBundle(idea: FYPIdea) {
  const JSZip = (await import("jszip")).default;
  const { saveAs } = await import("file-saver");
  const { generateTestCases } = await import("./testCaseGenerator");

  const zip = new JSZip();
  const folder = zip.folder(`${idea.title.replace(/\s+/g, "-").toLowerCase()}-bundle`)!;

  folder.file("PRD.md", generatePRD(idea));
  folder.file("user-flow.md", generateUserFlow(idea));
  folder.file("system-flowchart.md", generateFlowchart(idea));
  folder.file("database-schema.sql", generateDatabaseSchema(idea));
  folder.file("mvp-scope.md", generateMVPScope(idea));
  folder.file("master-prompt.md", generateMasterPrompt(idea));
  folder.file("test-cases.md", generateTestCases(idea));
  folder.file("README.md", `# ${idea.title} - Vibe Coding Bundle\n\nGenerated by FYP Forge AI.\n\n## Contents\n\n1. **PRD.md** - Product Requirement Document\n2. **user-flow.md** - User Flow Diagrams\n3. **system-flowchart.md** - System Architecture\n4. **database-schema.sql** - Database Schema\n5. **mvp-scope.md** - MVP Scope Document\n6. **master-prompt.md** - Master Coding Prompt\n7. **test-cases.md** - Test Cases\n\n## How to Use\n\n1. Open your AI coding tool (Cursor, Kiro, etc.)\n2. Upload this entire folder as context\n3. Start with the master-prompt.md\n4. Reference other files as needed\n\n*Happy vibe coding!*\n`);

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${idea.title.replace(/\s+/g, "-").toLowerCase()}-bundle.zip`);
}
