import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compare } from "bcrypt";

import { UserRepository } from "../repositories/user-repository";

import { UserPasswordType, UserResponseType } from "../types/user-types";
import { LoginDTOSchema, LoginDTOType } from "../types/login-types";

import { BadRequestError } from "../errors/bad-request-error";

import { createToken } from "../lib/jwt/create-token";
import { routeHandler } from "./handlers/routeHandler";
import { swapMessages } from "../../src/swaps/messages";

export async function LoginRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()
  
  server.post('/api/login', async (request: FastifyRequest, response: FastifyReply) => { 
    await routeHandler({
      responseInstance: response,
      callback: async () => {
        const data = request.body as LoginDTOType
        const validatedData = LoginDTOSchema.safeParse(data)  

        if(!validatedData.success) {
          throw new BadRequestError(swapMessages.data.INVALID_DATA)
        }

        const user = await getUserIfCredentialsAreValid(validatedData.data)

        if(!user) {
          throw new BadRequestError(swapMessages.data.INVALID_CREDENTIALS)
        }
        
        const { password } = await userRepository.getPasswordById(user.id) as UserPasswordType
  
        const isPasswordCorrectly = await compare(validatedData.data.password, password)

        if(!isPasswordCorrectly) {
          throw new BadRequestError(swapMessages.data.INVALID_CREDENTIALS)
        }

        const token = createToken({ sub: user.id })

        response
        .status(200)
        .send({ token })
      }
    })   
  })

  async function getUserIfCredentialsAreValid({ 
    username, cpf 
  }: LoginDTOType): Promise<UserResponseType | null> {
    if(username) return await userRepository.getByUsername(username)
    if(cpf) return await userRepository.getByCpf(cpf)

    return null
  }
}

