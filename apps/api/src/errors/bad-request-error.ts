import { IErrorTypes } from "./error-types"

export class BadRequestError implements IErrorTypes {
  public message: string
  public statusCode = 400

  constructor(errorMessage: string) {
    this.message = errorMessage
  }
}