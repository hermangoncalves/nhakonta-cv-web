import { ArrowRight } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/router";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { LatestUser } from "../schemas";

type HeroSectionProps = {
  latestUsers: {
    users: LatestUser[];
    total: number;
  }
};

const HeroSection = ({latestUsers}: HeroSectionProps) => {
  const { isSignedIn } = useAuth();

  return (
    <section className="mt-14">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">
            Guarde e compartilhe seus dados bancários com facilidade.
          </h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            Salve números de conta, NIB e outras informações bancárias em um só
            lugar. Compartilhe com segurança, quando e como quiser.
          </p>
        </div>
        {isSignedIn ? (
          <Button size="lg" className="mt-10">
            <Link to={routes.dashboard}>Dashboard</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button size="lg" className="mt-10">
              Começar agora
            </Button>
          </SignInButton>
        )}

        {latestUsers?.total >= 4 && (
          <div className="mx-auto mt-10 flex w-fit items-center gap-4 sm:flex-row">
            <span className=" inline-flex items-center -space-x-4">
              {latestUsers?.users.map((user, index) => (
                <Avatar key={index} className="size-10 sm:size-14 border">
                  <AvatarImage src={user.imageUrl} alt={user.firstName} />
                </Avatar>
              ))}
            </span>
            <span className="text-xs text-muted-foreground">
              {latestUsers?.total} Caboverdianos
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export { HeroSection };
