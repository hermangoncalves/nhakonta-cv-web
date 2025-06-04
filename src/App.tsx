import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShareView from "./pages/ShareView";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/protected";
import { Protect } from "@clerk/clerk-react";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/signUp";
import OnBoarding from "./pages/onBoarding";
import OnBoardingGuard from "./components/OnBoardingGuard";

const queryClient = new QueryClient();

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  share: "/share/:hash",
  login: "/login",
  signIn: "/sign-in",
  signUp: "/sign-up",
  onBoarding: "/on-boarding",
  notFound: "*",
};

function RedirectToDashboard() {
  return <Navigate to={routes.home} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Index />} />
          <Route
            path={routes.dashboard}
            element={
              <Protect fallback={<RedirectToDashboard />}>
                <OnBoardingGuard>
                  <Dashboard />
                </OnBoardingGuard>
              </Protect>
            }
          />
          <Route path={routes.share} element={<ShareView />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signIn} element={<SignInPage />} />
          <Route path={routes.signUp} element={<SignUpPage />} />
          <Route
            path={routes.onBoarding}
            element={
              <Protect fallback={<RedirectToDashboard />}>
                <OnBoarding />
              </Protect>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
