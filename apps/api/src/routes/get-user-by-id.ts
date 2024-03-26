import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { BadRequestError } from "../errors/bad-request-error";
import { UserRepository } from "../repositories/user-repository";
import { NotFoundError } from "../errors/not-found-error";
import { UserIdSchema, UserIdType } from "../types/users-types";

export async function GetUserById(server: FastifyInstance) {
  const userRepository = new UserRepository()

  server.get('/api/user/:id', async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const data = request.params as UserIdType
      const userIdValidated = UserIdSchema.safeParse(data)

      if(!userIdValidated.success) {
        throw new BadRequestError('Invalid Id')
      }
      
      const user = await userRepository.getUserById(userIdValidated.data.id)
      
      if(!user) {
        throw new NotFoundError('User Not Found')
      }

      response
      .status(200)
      .send({ data: user })
    } catch (error: unknown) {
      if(error instanceof BadRequestError || error instanceof NotFoundError) {
        response
        .status(error.statusCode)
        .send({ error: error.message })
        return
      }
    }
  })
}