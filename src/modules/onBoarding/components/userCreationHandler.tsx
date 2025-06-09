import { useEffect, useState, useCallback } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { usecreateUserAccount } from "../hooks/use-create-user";
import { CreateUser } from "../schemas";

export default function UserCreationHandler({
  setShowOnboarding,
}: {
  setShowOnboarding: (show: boolean) => void;
}) {
  const { user } = useUser();
  const { isSignedIn } = useClerk();
  const { mutate: createUserAccount } = usecreateUserAccount();
  const [isProcessed, setIsProcessed] = useState(false);

  const handleUserCreation = useCallback(() => {
    if (
      !user?.emailAddresses?.[0]?.emailAddress ||
      !user?.externalAccounts?.[0]
    )
      return;

    const data: CreateUser = {
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      provider: user.externalAccounts[0].provider,
      providerId: user.externalAccounts[0].id,
    };

    createUserAccount(data, {
      onSuccess: () => setIsProcessed(true),
      onError: () => setIsProcessed(true),
    });
  }, [user, createUserAccount]);

  useEffect(() => {
    if (user?.publicMetadata?.userCreated) {
      setShowOnboarding(true);
      return;
    }

    if (
      user &&
      !isProcessed &&
      isSignedIn &&
      !user.publicMetadata?.userCreated
    ) {
      handleUserCreation();
    }
  }, [user, isSignedIn, isProcessed, setShowOnboarding, handleUserCreation]);

  return null;
}
