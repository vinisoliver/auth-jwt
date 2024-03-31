import { IErrorTypes } from "./error-types"

export class InternalError implements IErrorTypes {
  public message: string
  public statusCode = 500

  constructor(errorMessage: string) {
    this.message = errorMessage
  }
}