import { UserType } from "../../types/users-types";

export interface IUserRepository {
  create(data: UserType): void
  getByUsername(username: string): Promise<UserType | null>
  getByCpf(cpf: number): Promise<UserType | null>
}