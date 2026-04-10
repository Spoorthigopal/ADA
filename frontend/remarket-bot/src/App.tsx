import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./components/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";
import MessagingEnginePage from "./pages/dashboard/MessagingEnginePage";
import CampaignsPage from "./pages/dashboard/CampaignsPage";
import ConversationsPage from "./pages/dashboard/ConversationsPage";
import RecoveryFlowsPage from "./pages/dashboard/RecoveryFlowsPage";
import AISupportPage from "./pages/dashboard/AISupportPage";
import SegmentsPage from "./pages/dashboard/SegmentsPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import PreferencesPage from "./pages/dashboard/PreferencesPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import FatigueEnginePage from "./pages/dashboard/FatigueEnginePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-right" toastOptions={{ className: "glass-card" }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="messaging" element={<MessagingEnginePage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="recovery" element={<RecoveryFlowsPage />} />
            <Route path="support" element={<AISupportPage />} />
            <Route path="segments" element={<SegmentsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="preferences" element={<PreferencesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="fatigue" element={<FatigueEnginePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
