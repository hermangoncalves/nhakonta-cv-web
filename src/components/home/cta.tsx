import { SignInButton } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Avatars = {
  image: string;
  fallback: string;
};

const avatars: Avatars[] = [
  {
    image: "https://shadcnblocks.com/images/block/avatar-2.webp",
    fallback: "SU",
  },
  {
    image: "https://shadcnblocks.com/images/block/avatar-3.webp",
    fallback: "SU",
  },
  {
    image: "https://shadcnblocks.com/images/block/avatar-1.webp",
    fallback: "SU",
  },
];

function AvatarList() {
  return (
    <div className="relative">
      {avatars.map((avatar, index) => {
        let positionClass = "";

        if (index === 0) {
          positionClass =
            "absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5";
        } else if (index === 1) {
          positionClass =
            "absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5";
        } else {
          positionClass = "mb-4 size-16 border md:mb-5";
        }

        return (
          <Avatar className={positionClass}>
            <AvatarImage src={avatar.image} />
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          </Avatar>
        );
      })}
    </div>
  );
}

export function CTA() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
      <AvatarList />
      <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
        Pronto para começar?
      </h3>
      <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
        Junte-se aos cabo-verdianos que já facilitaram suas transações com o
        nhakonta
      </p>
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
        <SignInButton mode="modal">
          <Button size="lg" className="mt-10">
            Começar agora
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}
