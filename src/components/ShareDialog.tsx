import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Copy,
  Share2,
  Clock,
  Link as LinkIcon,
  MessageCircle,
  Mail,
  Smartphone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BankAccount } from "@/schemas";

interface ShareDialogProps {
  account: BankAccount;
  onClose: () => void;
}

export const ShareDialog = ({ account, onClose }: ShareDialogProps) => {
  const { toast } = useToast();
  const [shareMethod, setShareMethod] = useState<"direct" | "link">("direct");
  const [expirationTime, setExpirationTime] = useState("1h");
  const [customHours, setCustomHours] = useState("");

  const shareData = `💳 Dados Bancários

🏦 Banco: ${account.bankName}
👤 Titular: ${account.accountHolderName}
🔢 NIB: ${account.accountNIB}
📄 Nº da Conta: ${account.accountNumber}

📲 Compartilhado via nhaKonta
🌐 https://nhaKonta.cv
`;

  const generateTempLink = () => {
    const hash = Math.random().toString(36).substring(2, 15);
    return `https://nhaKonta.cv/share/${hash}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description:
        "Dados copiados para a área de transferência. Agora você pode compartilhar com quem quiser.",
    });
  };

  const shareViaWhatsApp = () => {
    const encodedText = encodeURIComponent(shareData);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  const shareViaSMS = () => {
    const encodedText = encodeURIComponent(shareData);
    window.open(`sms:?body=${encodedText}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(
      `Dados Bancários - ${account.accountHolderName}`
    );
    const body = encodeURIComponent(shareData);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const createTempLink = () => {
    const link = generateTempLink();
    copyToClipboard(link);
    toast({
      title: "Link Temporário Criado",
      description: `Link válido por ${
        expirationTime === "custom" ? customHours + "h" : expirationTime
      }`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg border-none shadow-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Share2 className="h-5 w-5 mr-2 text-indigo-600" />
              Compartilhar Conta
            </CardTitle>
            <CardDescription className="text-gray-600">
              {account.bankName.split("(")[0].trim()} -{" "}
              {account.accountHolderName}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Share Method Selection */}
          <div className="space-y-3">
            <Label>Método de Compartilhamento</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={shareMethod === "direct" ? "default" : "outline"}
                onClick={() => setShareMethod("direct")}
                className={`flex flex-col h-auto p-4 ${
                  shareMethod === "direct"
                    ? "bg-indigo-700 hover:bg-indigo-500 text-white"
                    : "bg-white text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                <Copy className="h-5 w-5 mb-2" />
                <span className="text-xs sm:text-sm">Compartilhar Direto</span>
              </Button>
              <Button
                variant={shareMethod === "link" ? "default" : "outline"}
                onClick={() => setShareMethod("link")}
                className={`flex flex-col h-auto p-4 ${
                  shareMethod === "link"
                    ? "bg-indigo-700 hover:bg-indigo-500 text-white"
                    : "bg-white text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                <LinkIcon className="h-5 w-5 mb-2" />
                <span className="text-xs sm:text-sm">Link Temporário</span>
              </Button>
            </div>
          </div>

          {shareMethod === "direct" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Pré-visualização dos Dados</Label>
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {shareData}
                  </pre>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Compartilhar via:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={shareViaWhatsApp}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={shareViaSMS}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                  <Button
                    onClick={shareViaEmail}
                    className="bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(shareData)}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {shareMethod === "link" && (
            // <div className="space-y-4">
            //   <div className="space-y-2">
            //     <Label htmlFor="expiration">Tempo de Expiração</Label>
            //     <Select
            //       value={expirationTime}
            //       onValueChange={setExpirationTime}
            //     >
            //       <SelectTrigger>
            //         <SelectValue />
            //       </SelectTrigger>
            //       <SelectContent>
            //         <SelectItem value="15m">15 minutos</SelectItem>
            //         <SelectItem value="1h">1 hora</SelectItem>
            //         <SelectItem value="6h">6 horas</SelectItem>
            //         <SelectItem value="24h">24 horas</SelectItem>
            //         <SelectItem value="custom">Personalizado</SelectItem>
            //       </SelectContent>
            //     </Select>
            //   </div>

            //   {expirationTime === "custom" && (
            //     <div className="space-y-2">
            //       <Label htmlFor="customHours">Horas (1-168)</Label>
            //       <Input
            //         id="customHours"
            //         type="number"
            //         min="1"
            //         max="168"
            //         value={customHours}
            //         onChange={(e) => setCustomHours(e.target.value)}
            //         placeholder="Digite o número de horas"
            //       />
            //     </div>
            //   )}

            //   <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            //     <div className="flex items-start space-x-2">
            //       <Clock className="h-5 w-5 text-indigo-600 mt-0.5" />
            //       <div>
            //         <p className="text-sm font-medium text-indigo-900">
            //           Link Temporário
            //         </p>
            //         <p className="text-sm text-indigo-700 mt-1">
            //           O link será válido por{" "}
            //           {expirationTime === "custom"
            //             ? `${customHours} horas `
            //             : `${expirationTime} `}
            //           e depois será automaticamente desativado por segurança.
            //         </p>
            //       </div>
            //     </div>
            //   </div>

            //   <Button
            //     onClick={createTempLink}
            //     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            //     disabled={
            //       expirationTime === "custom" &&
            //       (!customHours || parseInt(customHours) < 1)
            //     }
            //   >
            //     <LinkIcon className="h-4 w-4 mr-2" />
            //     Criar Link Temporário
            //   </Button>
            // </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Funcionalidade em Desenvolvimento
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Esta funcionalidade estará disponível em breve. Estamos
                      trabalhando para permitir links temporários com validade
                      personalizada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="w-full">
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
