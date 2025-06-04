import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, User, Banknote } from 'lucide-react';

interface OnboardingCompleteProps {
  onComplete: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onComplete }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-indigo-500" />
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

      <div className="flex items-center justify-center gap-4 my-8">        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Banknote className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900">Conta Bancária</h4>
          <p className="text-sm text-gray-600">Os seus dados bancários estão seguros</p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <h4 className="font-medium text-gray-900">Próximos passos:</h4>
        <ul className="text-left space-y-2 text-sm text-gray-600">
          <li className="flex items-start justify-center">
            Adicione mais contas bancárias no dashboard
          </li>
          <li className="flex items-start justify-center">
            Gerencie todas os seus dados bancários num só local
          </li>
        </ul>
      </div>

      <Button 
        onClick={onComplete}
        className="w-full bg-indigo-500 hover:bg-indigo-600 py-3"
        size="lg"
      >
        Ir para o Dashboard
      </Button>
    </div>
  );
};

export default OnboardingComplete;