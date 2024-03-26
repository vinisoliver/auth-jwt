import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomInt } from "crypto";
import { hash } from "bcrypt";

import { UserDTOSchema } from "../types/users-types";
import { UserRepository } from "../repositories/user-repository";
import { BadRequestError } from "../errors/bad-request-error";

export async function SignUpRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()
  
  server.post('/api/sign-up', async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const data = request.body
      const validatedData = UserDTOSchema.safeParse(data)

      if(!validatedData.success) {
        throw new BadRequestError('Invalid data')
      }

      const verifyIfUsernameAlreadyExists = await userRepository.getByUsername(validatedData.data.username)

      if(verifyIfUsernameAlreadyExists) {
        throw new BadRequestError('Username already exists')
      }

      if(validatedData.data.cpf) {
        const verifyIfCpfAlreadyExists = await userRepository.getByCpf(validatedData.data.cpf)

        if(verifyIfCpfAlreadyExists) {
          throw new BadRequestError('CPF already exists')
        }
      }
      
      const randomSalt = randomInt(10, 12)
      const passwordHash = await hash(validatedData.data.password, randomSalt)

      await userRepository.create({
        ...validatedData.data,
        password: passwordHash,
      })

      response.status(201)
    } catch (error: unknown) {
      if(error instanceof BadRequestError) {
        response
        .status(error.statusCode)
        .send({ error: error.message })
        return
     }

     response
     .status(500)
     .send(`Unxpected error: A internal server error - ${error}`)
  }})
}