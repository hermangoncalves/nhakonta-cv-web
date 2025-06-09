import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import OnboardingBankAccountForm from "./BankAccountForm";

interface BankAccountSetupProps {
  onNext: () => void;
}

export default function BankAccountSetup({ onNext }: BankAccountSetupProps) {
  const { user } = useUser();

  useEffect(() => {
    const onboardingCompleted =
      user.publicMetadata?.onboardingCompleted === true;
    if (onboardingCompleted) {
      onNext();
    }
  }, []);

  return <OnboardingBankAccountForm onNext={onNext}  />;
}
