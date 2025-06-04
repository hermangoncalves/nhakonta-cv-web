import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      navigate("/sign-in");
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isSignedIn && !isLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
