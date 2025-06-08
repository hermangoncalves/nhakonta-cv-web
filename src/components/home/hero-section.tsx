import { ArrowRight } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/router";
import { SignInButton, useAuth } from "@clerk/clerk-react";

type Users = {
  src: string;
  alt: string;
};

const users: Users[] = [
  {
    src: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
    alt: "Avatar 1",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
    alt: "Avatar 2",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/avatar-3.webp",
    alt: "Avatar 3",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
    alt: "Avatar 4",
  },
];

const HeroSection = () => {
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

        <div className="mx-auto mt-10 flex w-fit items-center gap-4 sm:flex-row">
          <span className=" inline-flex items-center -space-x-4">
            {users.map((avatar, index) => (
              <Avatar key={index} className="size-10 sm:size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>
          <span className="text-xs text-muted-foreground">
            250 Caboverdianos
          </span>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
