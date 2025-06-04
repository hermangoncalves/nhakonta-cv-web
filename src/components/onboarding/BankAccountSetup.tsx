import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import OnboardingComplete from "./OnboardingComplete";

interface BankAccountSetupProps {
  onNext: () => void;
}

const banks = [
  {
    name: "Banco Comercial do Atlântico",
    value: "BCA",
  },
  {
    name: "Banco CaboVerdiano de Investimento",
    value: "BCN",
  },
  {
    name: "Caixa Económica de Cabo Verde",
    value: "CAIXA",
  },
];

const BankAccountSetup: React.FC<BankAccountSetupProps> = ({ onNext }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountNIB: "",
    accountHolderName: user?.fullName || "",
  });

  useEffect(() => {
    if (user?.unsafeMetadata.isOnboardingCompleted) {
      onNext();
    }
  }, [user?.unsafeMetadata.isOnboardingCompleted, onNext]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to obtain JWT");
      }

      const { ok } = await fetch(
        `${import.meta.env.VITE_API_URL}/api/onboarding/bank-accounts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!ok) throw new Error("Failed to update profile");

      toast({
        title: "Conta bancária adicionada!",
        description: "Os seus dados bancários foram guardados com sucesso.",
      });

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          isOnboardingCompleted: true,
        },
      });

      onNext();
    } catch (error: any) {
      toast({
        title: "Erro",
        description:
          error.message || "Ocorreu um erro ao adicionar a conta bancária.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.bankName.trim() &&
    formData.accountNumber.trim() &&
    formData.accountNIB.trim() &&
    formData.accountHolderName.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bankName">Nome do Banco *</Label>
        <Select
          onValueChange={(value) =>
            setFormData({ ...formData, bankName: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o banco" />
          </SelectTrigger>
          <SelectContent>
            {banks.map((bank) => (
              <SelectItem key={bank.value} value={bank.value}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountHolderName">Nome do Titular da Conta *</Label>
        <Input
          id="accountHolderName"
          name="accountHolderName"
          type="text"
          placeholder="Nome conforme aparece na conta"
          onChange={handleChange}
          value={formData.accountHolderName}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNumber">Número da Conta *</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          type="text"
          placeholder="Digite o número da sua conta"
          onChange={handleChange}
          value={formData.accountNumber}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNIB">
          NIB (Número de Identificação Bancária) *
        </Label>
        <Input
          id="accountNIB"
          name="accountNIB"
          type="text"
          placeholder="Digite o NIB da sua conta"
          onChange={handleChange}
          value={formData.accountNIB}
          required
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading || !isFormValid}>
          {loading ? "Guardando..." : "Continuar"}
        </Button>
      </div>
    </form>
  );
};

export default BankAccountSetup;
