import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Auth } from "../middlewares/auth";
import { UserRepository } from "../repositories/user-repository";

import { UserIdSchema, UserIdType } from "../types/user-types";

import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

import { routeHandler } from "./handlers/routeHandler";
import { swapMessages } from "../../src/swaps/messages";

export async function GetUserByIdRoute(server: FastifyInstance) {
  const userRepository = new UserRepository()

  server.get('/api/user', { preHandler: Auth }, async (request: FastifyRequest, response: FastifyReply) => {
    await routeHandler({
      responseInstance: response,
      callback: async () => {
        const data = request.params as UserIdType
        const userIdValidated = UserIdSchema.safeParse(data)

        if(!userIdValidated.success) {
          throw new BadRequestError(swapMessages.data.INVALID_ID)
        }
        
        const user = await userRepository.getUserById(userIdValidated.data.id)
        
        if(!user) {
          throw new NotFoundError(swapMessages.data.user.NOT_FOUND)
        }

        response
        .status(200)
        .send({ data: user })
      }
    })
  })
}