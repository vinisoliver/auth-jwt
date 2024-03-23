import { z } from "zod"

export const UserSchema = z.object({
  username: z.string().max(30),
  password: z.string().min(8).max(35),
})

export type UserType = z.infer<typeof UserSchema>