import { useState, useEffect } from "react";
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
import { useUser } from "@clerk/clerk-react";
import BankAccountSetup from "@/components/onboarding/BankAccountSetup";
import OnboardingComplete from "@/components/onboarding/OnboardingComplete";
import { routes } from "@/App";
import UserCreationHandler from "@/components/userCreationHandler";

const Onboarding = () => {
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
        return <span className="text-xl">Adicione a sua conta bancária</span>;
      case 2:
        return <span className="text-indigo-500">Tudo Pronto!</span>;
      default:
        return "";
    }
  };

  return (
    <>
      {showOnboarding ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mt-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Bem-vindo ao nhaKonta!
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
                    <div className="w-6 h-6 bg-indigo-400 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {currentStep}
                    </div>
                  )}
                  {currentStep === 2 && (
                    <CheckCircle className="w-6 h-6 text-indigo-500 mr-3" />
                  )}
                  {getStepTitle()}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 &&
                    "Adicione os dados da sua conta bancária principal"}
                  {currentStep === 2 &&
                    "A sua conta está configurada e pronta para usar"}
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
};

export default Onboarding;
