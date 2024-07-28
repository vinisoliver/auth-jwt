import { z } from "zod";

export const LoginDTOSchema = z.object({
  username: z.string().optional(),
  cpf: z.number().optional(),
  password: z.string(),
})

export type LoginDTOSchemaType = z.infer<typeof LoginDTOSchema>