import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomInt } from "crypto";
import { hash } from "bcrypt";

import { UserRepository } from "../repositories/user-repository";

import { UserDTOSchema } from "../types/user-types";

import { BadRequestError } from "../errors/bad-request-error";

import { createToken } from "../lib/jwt/create-token";
import { routeHandler } from "./handlers/routeHandler";
import { swapMessages } from "../../src/swaps/messages";

export async function SignUpRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()
  
  server.post('/api/sign-up', async (request: FastifyRequest, response: FastifyReply) => {
    await routeHandler({
      responseInstance: response,
      callback: async () => {
        const data = request.body
        const validatedData = UserDTOSchema.safeParse(data)

        if(!validatedData.success) {
          throw new BadRequestError(swapMessages.data.INVALID_DATA)
        }

        const verifyIfUsernameAlreadyExists = await userRepository.getByUsername(validatedData.data.username)

        if(verifyIfUsernameAlreadyExists) {
          throw new BadRequestError(swapMessages.data.user.USERNAME_ALREADY_EXISTS)
        }

        if(validatedData.data.cpf) {
          const verifyIfCpfAlreadyExists = await userRepository.getByCpf(validatedData.data.cpf)

          if(verifyIfCpfAlreadyExists) {
            throw new BadRequestError(swapMessages.data.user.CPF_ALREADY_EXISTS)
          }
        }
        
        const randomSalt = randomInt(10, 12)
        const passwordHash = await hash(validatedData.data.password, randomSalt)

        await userRepository.create({
          ...validatedData.data,
          password: passwordHash,
        })

        const user = await userRepository.getByUsername(validatedData.data.username)

        const token = createToken({ sub: user!.id })

        response
        .status(201)
        .send({ token })
      }
    })
  })
}