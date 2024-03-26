import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compare } from "bcrypt";

import { UserRepository } from "../repositories/user-repository";
import { BadRequestError } from "../errors/bad-request-error";
import { UserType } from "../types/users-types";
import { LoginDTOSchema } from "../types/login-dto";

export async function LoginRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()
  
  server.post('/api/login', async (request: FastifyRequest, response: FastifyReply) => {    
    try {
      const data = request.body
      const validatedData = LoginDTOSchema.safeParse(data)  

      if(validatedData.success) {
        let user: UserType | null

        if(validatedData.data.username) {
          user = await userRepository.getByUsername(validatedData.data.username)
        }
    
        if(validatedData.data.cpf) {
          user = await userRepository.getByCpf(validatedData.data.cpf)
        }

        const isPasswordCorrectly = await compare(validatedData.data.password, user!.password)

        if(!isPasswordCorrectly) {
          throw new BadRequestError('Invalid Credentials')
        }

        response
        .status(200)
        .send({ credentials: validatedData.data, authenticated: true })
      } else {
        throw new BadRequestError('Invalid Data')
      }
    } catch (error: unknown) {
      if(error instanceof BadRequestError) {
        response
        .status(error.statusCode)
        .send({ error: error.message, authenticated: false })
        return
      }
    }
  })
}