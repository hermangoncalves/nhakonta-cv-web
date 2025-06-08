import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { Protect } from "@clerk/clerk-react";
import OnBoardingGuard from "./components/OnBoardingGuard";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/onBoarding";
import NotFound from "./pages/NotFound";

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  share: "/share/:hash",
  onBoarding: "/on-boarding",
  notFound: "*",
};

function RedirectToDashboard() {
  return <Navigate to={routes.home} />;
}

export default function AppRouter() {
  return (
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
        {/* <Route path={routes.share} element={<ShareView />} /> */}
        <Route
          path={routes.onBoarding}
          element={
            <Protect fallback={<RedirectToDashboard />}>
              <Onboarding />
            </Protect>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
