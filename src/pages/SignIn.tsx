import { Navbar } from "@/components/navbar";
import { SignIn, useClerk, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function SignInPage() {
  const { user } = useUser();
  const { client } = useClerk();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}
