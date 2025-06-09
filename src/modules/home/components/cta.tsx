import { SignInButton } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LatestUser } from "../schemas";


type CTAProps = {
  latestUsers: {
    users: LatestUser[];
    total: number;
  };
};

function AvatarList({ users }: { users: CTAProps['latestUsers']['users'] }) {
  const getAvatarClass = (index: number) => {
    switch (index) {
      case 0:
        return "absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5";
      case 1:
        return "absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5";
      default:
        return "mb-4 size-16 border md:mb-5";
    }
  };

  return (
    <div className="relative mb-6 h-16 w-16">
      {users?.slice(0, 3).map((user, index) => (
        <Avatar key={index} className={getAvatarClass(index)} title={user.firstName}>
          <AvatarImage src={user.imageUrl} alt={user.firstName} />
          <AvatarFallback>{user.firstName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export function CTA({ latestUsers }: CTAProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
      {latestUsers?.total >= 3 && (
        <AvatarList users={latestUsers?.users} />
      )}
      <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
        Pronto para começar?
      </h3>
      <p className="mb-4 max-w-3xl text-muted-foreground lg:text-lg">
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
