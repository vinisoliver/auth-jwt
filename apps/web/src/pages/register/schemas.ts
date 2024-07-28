import { z } from "zod"

export const RegisterSchema = z.object({
  username: z.string().max(30, 'max').min(1, 'min'),
  email: z.string().max(40).refine(email => email.includes('@enterprise.br'), 'The email must includes @enterprise.br'),
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(40).optional(),
  phoneNumber: z.coerce.number().refine(number => number.toString().length === 11),
  cep: z.coerce.number().refine(cep => cep.toString().length === 8).optional(),
  cpf: z.coerce.number().refine(cpf => cpf.toString().length === 11).optional(),
  dateOfBirth: z.string()
    .refine(date => new Date(date).toString() !== 'Invalid Date')
    .transform(date => {
      const newDate = new Date(date)
      return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + (newDate.getDate() + 1)
    }),
  password: z.string().min(8).max(35),
  confirmPassword: z.string().min(8).max(35),
}).refine((data) => {
  if(data.password !== data.confirmPassword) return false
  return true
}, {
  message: "Passwords must be the same",
  path: ["confirmPassword"],
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>