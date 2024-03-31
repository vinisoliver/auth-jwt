import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { IAuthPayload } from "./types/auth-payload-interface";

import { BadRequestError } from "../errors/bad-request-error";
import { InternalError } from "../errors/internal-error";

import { routeHandler } from "../routes/handlers/routeHandler";
import { swapMessages } from "../../src/swaps/messages";

export function Auth(request: FastifyRequest, response: FastifyReply, done: any) {
  routeHandler({
    responseInstance: response,
    callback: () => {
      const authHeader = request.headers.authorization
   
      if(!authHeader) {
        throw new BadRequestError(swapMessages.auth.TOKEN_NOT_PROVIDED)
      }
    
      const [, token] = authHeader.split(' ')
      
      if(!process.env.JWT_SECRET) {
        throw new InternalError(swapMessages.error.INTERNAL_ENVIRONMENT_ERROR)
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET) as IAuthPayload

      request.params = { id: payload.sub }

      done()
    },
    inErrorFunction: (error, finishCatch) => {
      if(error instanceof jwt.JsonWebTokenError) {
        response
        .status(401)
        .send({ message: swapMessages.auth.INVALID_EXPIRED_TOKEN })

        return finishCatch()
      }
    }
  })
}