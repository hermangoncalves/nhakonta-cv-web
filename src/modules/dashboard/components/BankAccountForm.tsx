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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { BankAccount, BankAccountForm, bankAccountFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface BankAccountModalFormProps {
  initialData?: BankAccount;
  onSubmit: (data: BankAccount) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const banks = [
  "Banco Cabo-verdiano de Negócios",
  "Banco Comercial do Atlântico",
  "Caixa Económica de Cabo Verde",
];

export const BankAccountModalForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: BankAccountModalFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BankAccountForm>({
    resolver: zodResolver(bankAccountFormSchema),
  });

  const handleCreateBankAccountSubmit = (data: BankAccountForm) => {
    console.log(data);
    // onSubmit(data);
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
          <Button variant="ghost" size="sm" onClick={onCancel} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleCreateBankAccountSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Banco *</Label>
              <Select
                {...register("bankName")}
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
                <p className="text-sm text-red-600">{errors.bankName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">Nome do Titular *</Label>
              <Input
                id="accountHolder"
                {...register("accountHolderName")}
                placeholder="Seu nome completo"
                className={errors.accountHolderName ? "border-red-500" : ""}
              />
              {errors.accountHolderName && (
                <p className="text-sm text-red-600">
                  {errors.accountHolderName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nib">NIB *</Label>
              <Input
                id="nib"
                {...register("accountNIB")}
                placeholder=""
                className={`font-mono ${
                  errors.accountNIB ? "border-red-500" : ""
                }`}
              />
              {errors.accountNIB && (
                <p className="text-sm text-red-600">{errors.accountNIB.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Número da Conta *</Label>
              <Input
                id="accountNumber"
                {...register("accountNumber")}
                placeholder=""
                className={`font-mono ${
                  errors.accountNumber ? "border-red-500" : ""
                }`}
              />
              {errors.accountNumber && (
                <p className="text-sm text-red-600">{errors.accountNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações (opcional)</Label>
              <Textarea
                id="notes"
                {...register("notes")}
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
