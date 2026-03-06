import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Interests from "./pages/Interests";
import Dashboard from "./pages/Dashboard";
import Ideas from "./pages/Ideas";
import IdeaDetails from "./pages/IdeaDetails";
import Research from "./pages/Research";
import Roadmap from "./pages/Roadmap";
import Milestones from "./pages/Milestones";
import Documentation from "./pages/Documentation";
import Bundle from "./pages/Bundle";
import BundlePreview from "./pages/BundlePreview";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/idea/:id" element={<IdeaDetails />} />
          <Route path="/research" element={<Research />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/bundle" element={<Bundle />} />
          <Route path="/bundle-preview" element={<BundlePreview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
