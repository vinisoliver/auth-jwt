import { IErrorTypes } from "./error-types"

export class UnauthorizedError implements IErrorTypes {
  public message: string
  public statusCode = 401

  constructor(errorMessage: string) {
    this.message = errorMessage
  }
}