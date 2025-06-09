import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import BankAccountSetup from "@/modules/onBoarding/components/BankAccountSetup";
import OnboardingComplete from "@/modules/onBoarding/components/OnboardingComplete";
import { routes } from "@/router";
import UserCreationHandler from "@/modules/onBoarding/components/userCreationHandler";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";

export default function Onboarding() {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completeOnboarding = () => {
    navigate(routes.dashboard);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BankAccountSetup onNext={nextStep} />;
      case 2:
        return <OnboardingComplete onComplete={completeOnboarding} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return <span className="text-lg">Adicione a sua conta bancária</span>
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar />
      {showOnboarding ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mt-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-extrabold lg:text-6xl mb-2">
                Benvindo(a) ao nhaKonta
              </h1>
              <p className="text-gray-600 mb-6">
                Vamos configurar a sua conta em poucos passos simples
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Passo {currentStep} de {totalSteps}
                  </span>
                  <span>{Math.round(progressPercentage)}% completo</span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="w-full bg-cv-blue"
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {currentStep < 2 && (
                    <Badge className="h-6 min-w-5 rounded-full p-2 font-mono tabular-nums mr-3">
                      {currentStep}
                    </Badge>
                  )}
                  {/* {currentStep === 2 && (
                    <CheckCircle className="w-6 h-6 text-indigo-500 mr-3" />
                  )} */}
                  {getStepTitle()}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && (
                    <span className="text-sm">
                      Adicione os dados da sua conta bancária principal
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderStep()}</CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <p>Loading...</p>
        </div>
      )}
      <UserCreationHandler setShowOnboarding={setShowOnboarding} />
    </>
  );
}
