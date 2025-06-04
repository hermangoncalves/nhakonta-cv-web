
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Clock, Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Simulação de dados - em produção seria buscado via API usando o hash
const getMockAccountData = (hash: string) => {
  // Simular dados baseados no hash para demonstração
  return {
    id: hash,
    bankName: "Banco Comercial do Atlântico (BCA)",
    accountHolder: "João Silva Santos",
    nib: "CV64003300004547069110176",
    accountNumber: "4547069110176",
    notes: "Conta principal para recebimentos",
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas a partir de agora
    isExpired: false
  };
};

const ShareView = () => {
  const { hash } = useParams<{ hash: string }>();
  const { toast } = useToast();

  // // Em produção, isso seria uma consulta real à API
  const accountData = hash ? getMockAccountData(hash) : null;

  if (!hash || !accountData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-indigo-500">Link Inválido</CardTitle>
            <CardDescription>
              Este link não existe ou não é válido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (accountData.isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-red-600">Link Expirado</CardTitle>
            <CardDescription>
              Este link expirou e não está mais disponível por motivos de segurança.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-700">
                  Link expirado em {accountData.expiresAt.toLocaleString('pt-CV')}
                </span>
              </div>
            </div>
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const shareData = `💳 Dados Bancários - ${accountData.accountHolder}

🏦 Banco: ${accountData.bankName}
👤 Titular: ${accountData.accountHolder}
🔢 NIB: ${accountData.nib}
📱 Conta: ${accountData.accountNumber}
${accountData.notes ? `📝 Obs: ${accountData.notes}` : ''}

📱 Enviado via nhaKonta`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData);
    toast({
      title: "Copiado!",
      description: "Dados bancários copiados para a área de transferência",
    });
  };

  const timeRemaining = Math.max(0, accountData.expiresAt.getTime() - Date.now());
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-indigo-600">nhaKonta</h1>
              <span className="text-sm text-gray-500">| Compartilhamento Seguro</span>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Início
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 pt-8">
        {/* Security Notice */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900">Link Temporário Seguro</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Este link expira automaticamente em{" "}
                  <span className="font-medium">
                    {hoursRemaining > 0 && `${hoursRemaining}h `}
                    {minutesRemaining}min
                  </span>
                  {" "}por motivos de segurança.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Account Data */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              💳 Dados Bancários
            </CardTitle>
            <CardDescription>
              Compartilhado via nhaKonta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Info */}
            <div className="grid gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">Banco</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {accountData.bankName.split('(')[0].trim()}
                </p>
                <p className="text-sm text-gray-500">
                  {accountData.bankName.includes('(') && accountData.bankName.split('(')[1]?.replace(')', '')}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">Titular da Conta</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {accountData.accountHolder}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">NIB</label>
                <p className="text-lg font-mono font-semibold text-gray-900 mt-1 break-all">
                  {accountData.nib}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">Número da Conta</label>
                <p className="text-lg font-mono font-semibold text-gray-900 mt-1">
                  {accountData.accountNumber}
                </p>
              </div>

              {accountData.notes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Observações</label>
                  <p className="text-gray-900 mt-1">
                    {accountData.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Copy Button */}
            <div className="pt-4 border-t">
              <Button 
                onClick={copyToClipboard}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                size="lg"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Dados Bancários
              </Button>
            </div>

            {/* Expiration Info */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-indigo-900">
                    Este link expira em {hoursRemaining > 0 && `${hoursRemaining}h `}{minutesRemaining}min
                  </p>
                  <p className="text-xs text-indigo-700 mt-1">
                    Expira em: {accountData.expiresAt.toLocaleString('pt-CV')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-sm text-gray-500">
            Dados compartilhados com segurança via{" "}
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              nhaKonta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareView;
