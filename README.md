**Project info**

FYP Forge is now a fully functional app, not a prototype:

A polished 3D robot matching the reference aesthetic with floating stat badges on onboarding.

App is locked to 430px max-width with a centered mobile container, just like a real mobile app.

Global state context (AppContext) persists interests, selected project, milestones, and bundle status to localStorage. Every screen reads from and writes to shared state.

The Vibe Coding Bundle generates actual files (PRD, User Flow, Flowchart, DB Schema, MVP Scope, Master Prompt) with real, detailed content tailored to the selected project, then packages them into a downloadable ZIP using JSZip.

Tap to toggle completion, progress tracked across dashboard, roadmap, and profile.

The floating AI assistant understands context (selected project, user name), responds to natural language, and navigates to relevant screens.

8 unique FYP ideas — Each with full research data (problem statement, literature review, impact analysis) that drives all generated content.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

