import { UserDTOType, UserPasswordType, UserResponseType } from "../../types/users-types";

export interface IUserRepository {
  create(data: UserDTOType): void
  getByUsername(username: string): Promise<UserResponseType | null>
  getByCpf(cpf: number): Promise<UserResponseType | null>
  getUserById(id: string): Promise<UserResponseType | null>
  getPasswordById(id: string): Promise<UserPasswordType | null>
}