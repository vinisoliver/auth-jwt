import { z } from "zod"

export const UserSchema = z.object({
  username: z.string().max(30),
  email: z.string().max(40).refine(email => email.includes('@enterprise.br'), 'The email must includes @enterprise.br'),
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(40).optional(),
  phoneNumber: z.number().refine(number => number.toString().length === 11),
  cep: z.number().refine(cep => cep.toString().length === 8).optional(),
  cpf: z.number().refine(cpf => cpf.toString().length === 11).optional(),
  dateOfBirth: z.string()
    .refine(date => new Date(date).toString() !== 'Invalid Date')
    .transform(date => {
      const newDate = new Date(date)
      return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + (newDate.getDate() + 1)
    }),
})

export const UserIdSchema = z.object({
  id: z.string()
})

export const UserPasswordSchema = z.object({
  password: z.string().min(8).max(35),
})

export const UserDTOSchema = UserSchema.merge(UserPasswordSchema)
export const UserResponseSchema = UserSchema.merge(UserIdSchema)

export type UserDTOType = z.infer<typeof UserDTOSchema>
export type UserIdType = z.infer<typeof UserIdSchema>
export type UserPasswordType = z.infer<typeof UserPasswordSchema>
export type UserResponseType = z.infer<typeof UserResponseSchema>