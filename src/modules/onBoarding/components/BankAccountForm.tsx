import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { usecreateBankAccount } from "@/modules/shared/hooks/use-create-bank";
import {
  bankAccountFormSchema,
  CreateBankAccount,
} from "@/modules/shared/schemas";

const banks = [
  {
    name: "Banco Comercial do Atlântico",
    value: "Banco Comercial do Atlântico",
  },
  {
    name: "Banco Caboverdiano de Negócios",
    value: "Banco Caboverdiano de Negócios",
  },
  {
    name: "Caixa Económica de Cabo Verde",
    value: "Caixa Económica de Cabo Verde",
  },
];

export default function OnboardingCreateBankAccount({
  onNext,
}: {
  onNext: () => void;
}) {
  const {
    mutate: createBankAccount,
    error,
    isPending,
  } = usecreateBankAccount();

  const handleCreateBankAccount = async (data: CreateBankAccount) => {
    createBankAccount(data, {
      onSuccess: () => {
        onNext();
      },
    });
  };

  const form = useForm<CreateBankAccount>({
    resolver: zodResolver(bankAccountFormSchema),
    defaultValues: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      accountNIB: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateBankAccount)}
        className="space-y-4"
      >
        {/* Nome do Banco */}
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Banco *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o banco" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.value} value={bank.value}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nome do Titular */}
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Titular da Conta *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: João Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Número da Conta */}
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número da Conta *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NIB */}
        <FormField
          control={form.control}
          name="accountNIB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIB (Número de Identificação Bancária) *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={!form.formState.isValid}>
            {isPending ? "Guardando..." : "Continuar"}
          </Button>
        </div>
        {error && (
          <p style={{ color: "red" }}>Erro: {(error as Error).message}</p>
        )}
      </form>
    </Form>
  );
}
