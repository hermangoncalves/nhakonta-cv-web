import UserCreationHandler from "@/components/userCreationHandler";
import { SignUp, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
