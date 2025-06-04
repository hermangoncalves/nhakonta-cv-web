
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { BankAccount } from "@/schemas";


interface BankAccountFormProps {
  initialData?: BankAccount;
  onSubmit: (data: BankAccount) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const banks = [
  "Banco Comercial do Atlântico (BCA)",
  "Banco Cabo Verde Negócios (BCN)",
  "Caixa Económica de Cabo Verde",
  "BAI Cabo Verde",
  "Banco Interatlântico",
  "Outro"
];

export const BankAccountForm = ({ initialData, onSubmit, onCancel, isEditing = false }: BankAccountFormProps) => {
  const [formData, setFormData] = useState<BankAccount>({
    bankName: initialData?.bankName || "",
    accountHolderName: initialData?.accountHolderName || "",
    accountNIB: initialData?.accountNIB || "",
    accountNumber: initialData?.accountNumber || "",
  });

  const [errors, setErrors] = useState<Partial<BankAccount>>({});

  const validateForm = () => {
    const newErrors: Partial<BankAccount> = {};

    if (!formData.bankName) {
      newErrors.bankName = "Selecione um banco";
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Nome do titular é obrigatório";
    }

    if (!formData.accountNIB.trim()) {
      newErrors.accountNIB = "NIB é obrigatório";
    } else if (formData.accountNIB.length !== 25) {
      newErrors.accountNIB = "NIB deve ter 25 caracteres";
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Número da conta é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatNib = (value: string) => {
    // Remove all non-alphanumeric characters and convert to uppercase
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    return cleaned.slice(0, 25);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg border-none shadow-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl text-gray-900">
              {isEditing ? "Editar Conta Bancária" : "Adicionar Nova Conta"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados da sua conta bancária
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancel}
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Banco *</Label>
              <Select 
                value={formData.bankName} 
                onValueChange={(value) => setFormData({ ...formData, bankName: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o banco" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bankName && (
                <p className="text-sm text-red-600">{errors.bankName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">Nome do Titular *</Label>
              <Input
                id="accountHolder"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                placeholder="Seu nome completo"
                className={errors.accountHolderName ? "border-red-500" : ""}
              />
              {errors.accountHolderName && (
                <p className="text-sm text-red-600">{errors.accountHolderName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nib">NIB (25 caracteres) *</Label>
              <Input
                id="nib"
                value={formData.accountNIB}
                onChange={(e) => setFormData({ ...formData, accountNIB: formatNib(e.target.value) })}
                placeholder="CV64003300004547069110176"
                maxLength={25}
                className={`font-mono ${errors.accountNIB ? "border-red-500" : ""}`}
              />
              <p className="text-xs text-gray-500">
                Caracteres: {formData.accountNIB.length}/25
              </p>
              {errors.accountNIB && (
                <p className="text-sm text-red-600">{errors.accountNIB}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Número da Conta *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="4547069110176"
                className={`font-mono ${errors.accountNumber ? "border-red-500" : ""}`}
              />
              {errors.accountNumber && (
                <p className="text-sm text-red-600">{errors.accountNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações (opcional)</Label>
              <Textarea
                id="notes"
                // value={formData.notes}
                // onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ex: Conta principal, conta para recebimentos..."
                rows={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isEditing ? "Atualizar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
