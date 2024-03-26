import { z } from "zod";

export const LoginDTOSchema = z.object({
  username: z.string().optional(),
  cpf: z.number().optional(),
  password: z.string(),
})

export type LoginDTOType = z.infer<typeof LoginDTOSchema>