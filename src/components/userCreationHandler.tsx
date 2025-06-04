import { useEffect, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { z } from "zod";

const userCreateSchema = z.object({
  email: z.string().email().describe("Email"),
  firstName: z.string().describe("First name"),
  lastName: z.string().describe("Last name"),
  imageUrl: z.string().describe("Image URL"),
  provider: z.string().describe("Provider"),
  providerId: z.string().describe("Provider ID"),
});

type UserCreateSchema = z.infer<typeof userCreateSchema>;

export default function UserCreationHandler({
  setShowOnboarding,
}: {
  setShowOnboarding: (show: boolean) => void;
}) {
  const { user } = useUser();
  const { client, isSignedIn } = useClerk();
  const { getToken } = useAuth();
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const handleUserCreation = async () => {
    const userData: UserCreateSchema = {
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      provider: user.externalAccounts[0].provider,
      providerId: user.externalAccounts[0].id,
    };

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to obtain JWT");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/onboarding/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to notify backend");
      }

      const result = await response.json();
      console.log("Backend response:", result);
      setIsProcessed(true);
      setShowOnboarding(true);
      console.log("Backend notified successfully");
    } catch (error) {
      console.error("Error notifying backend:", error);
    }
  };

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
  }, [user, client, isProcessed, isSignedIn]);

  return null;
}
