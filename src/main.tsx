import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { routes } from "./router.tsx";
import { env } from "@/lib/env";
import APIInterceptorProvider from "./components/providers/api-interceptor-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={env.CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl={routes.home}
      signUpFallbackRedirectUrl={routes.onBoarding}
      signInFallbackRedirectUrl={routes.dashboard}
    >
      <APIInterceptorProvider>
        <App />
      </APIInterceptorProvider>
    </ClerkProvider>
  </React.StrictMode>
);
