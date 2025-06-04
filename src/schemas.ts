import { z } from "zod";

export const bankAccountSchema = z.object({
    id: z.number(),
    bankName: z.string(),
    accountNumber: z.string(),
    accountNIB: z.string(),
    accountHolderName: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const dashboardSchema = z.object({
    bankAccounts: z.array(bankAccountSchema),
    totalAccounts: z.number(),
    totalShared: z.number(),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;
export type BankAccount = z.infer<typeof bankAccountSchema>;