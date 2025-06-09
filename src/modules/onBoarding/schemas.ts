import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email().describe("Email"),
  firstName: z.string().describe("First name"),
  lastName: z.string().describe("Last name"),
  imageUrl: z.string().describe("Image URL"),
  provider: z.string().describe("Provider"),
  providerId: z.string().describe("Provider ID"),
});

export type CreateUser = z.infer<typeof createUserSchema>
