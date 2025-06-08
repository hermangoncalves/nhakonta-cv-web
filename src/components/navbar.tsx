import { Link } from "react-router-dom";
import { routes } from "@/router";
import { SignInButton } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
      <div className="container mx-auto p-2 flex justify-between items-center">
        <Link to={routes.home}>
          <div className="flex items-center space-x-2">
            <div className="w-12">
              <img src="./pwa-192.png" />
            </div>
          </div>
        </Link>

        <SignedOut>
          <SignInButton mode="modal">
            <Button size="sm">Entrar</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
