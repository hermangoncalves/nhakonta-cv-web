import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/App";
import { SignIn, SignInButton } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={routes.home}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-indigo-900">nhakonta</span>
          </div>
        </Link>

        <SignedOut>
            <SignInButton mode="modal">
              <Button>Entrar</Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
