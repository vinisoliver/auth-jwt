import { IErrorTypes } from "./error-types"

export class NotFoundError implements IErrorTypes {
  public message: string
  public statusCode = 404

  constructor(errorMessage: string) {
    this.message = errorMessage
  }
}