import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Banknote } from 'lucide-react';

interface OnboardingCompleteProps {
  onComplete: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onComplete }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-primary" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Parabéns! A sua conta está configurada!
        </h3>
        <p className="text-gray-600">
          Agora pode começar a usar o nhaKonta para receber transferências de forma mais organizada.
        </p>
      </div>

      <Button 
        onClick={onComplete}
        className="w-full py-3"
        size="lg"
      >
        Ir para o Dashboard
      </Button>
    </div>
  );
};

export default OnboardingComplete;