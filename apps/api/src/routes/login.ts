import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compare } from "bcrypt";

import { UserRepository } from "../repositories/user-repository";
import { BadRequestError } from "../errors/bad-request-error";
import { UserPasswordType, UserResponseType } from "../types/users-types";
import { LoginDTOSchema, LoginDTOType } from "../types/login-dto";

export async function LoginRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()
  
  server.post('/api/login', async (request: FastifyRequest, response: FastifyReply) => {    
    try {
      const data = request.body as LoginDTOType
      const validatedData = LoginDTOSchema.safeParse(data)  

      if(!validatedData.success) {
        throw new BadRequestError('Invalid Data')
      }

      const user = await getUserIfCredentialsAreValid(validatedData.data)

      if(!user) {
        throw new BadRequestError('Invalid Credentials')
      }
      
      const { password } = await userRepository.getPasswordById(user.id) as UserPasswordType
 
      const isPasswordCorrectly = await compare(validatedData.data.password, password)

      if(!isPasswordCorrectly) {
        throw new BadRequestError('Invalid Credentials')
      }

      response
      .status(200)
      .send({ credentials: user!.id, authenticated: true })
    } catch (error: unknown) {
      if(error instanceof BadRequestError) {
        response
        .status(error.statusCode)
        .send({ error: error.message, authenticated: false })
        return
      }
    }
  })

  async function getUserIfCredentialsAreValid({ username, cpf }: LoginDTOType): Promise<UserResponseType | null> {
    if(username) return await userRepository.getByUsername(username)
    if(cpf) return await userRepository.getByCpf(cpf)
  
    return null
  }
}

