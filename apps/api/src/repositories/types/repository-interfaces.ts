import { UserType } from "../../types/users-types";

export interface IUserRepository {
  create(data: UserType): void
}