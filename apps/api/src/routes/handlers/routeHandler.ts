import { FastifyReply } from "fastify";

import { BadRequestError } from "../../errors/bad-request-error";
import { NotFoundError } from "../../errors/not-found-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

interface RouteHandlerProps {
  responseInstance: FastifyReply,
  callback: Function,
  inErrorFunction?: (error: any, finishCatch: any) => true | void,
}

const finishCatch = () => true

export async function routeHandler({ responseInstance, callback, inErrorFunction }: RouteHandlerProps) {
  try {
    await callback()
  } catch (error) {
    if (inErrorFunction?.(error, finishCatch)) return
    
    if(
       error instanceof BadRequestError || 
       error instanceof NotFoundError ||
       error instanceof UnauthorizedError
      ) {
      
      responseInstance
      .status(error.statusCode)
      .send({ message: error.message })
      return
    }

    responseInstance
    .status(500)
    .send(`Internal Server Error: ${error}`)
  }
}