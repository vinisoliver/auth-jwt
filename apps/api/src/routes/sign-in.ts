import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { UserSchema } from "../types/users-types";
import { UserRepository } from "../repositories/user-repository";
import { BadRequestError } from "../errors/bad-request-error";

export async function SignInRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()
  
  server.post('/sign-up', async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const data = request.body
      const validatedData = UserSchema.safeParse(data)

      if(!validatedData.success) {
        throw new BadRequestError('Invalid data')
      }
      
      await userRepository.create(validatedData.data)

      response.status(201)
    } catch (error: unknown) {
      if(error instanceof BadRequestError) {
        response
        .status(error.statusCode)
        .send(error.message)
        return
     }

     response
     .status(500)
     .send(`Unxpected error: A internal server error - ${error}`)
  }})
}