import { randomUUID } from "crypto";
import { dbConnection } from "../lib/db/mysql";

import { UserType } from "../types/users-types";
import { IUserRepository } from "./types/repository-interfaces";
import { MySqlResponse } from "./types/mysql-response";

export class UserRepository implements IUserRepository {
  async create({ 
    username, password, cep, cpf, dateOfBirth, email, firstName, lastName, phoneNumber
  }: UserType) {
    const id = randomUUID()

    const sql = `
      INSERT INTO users(username, password, cep, cpf, dateOfBirth, email, firstName, lastName, phoneNumber, id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      username,
      password,
      cep,
      cpf, 
      dateOfBirth,
      email,
      firstName,
      lastName,
      phoneNumber,
      id,
    ]
  
    await (await dbConnection).query(sql, values)
  }

  async getByUsername(username: string): Promise<UserType | null> {
    const sql = `
      SELECT * FROM users WHERE username = ?
    `
    const values = [ username ]
  
    const user = await (await dbConnection).query(sql, values) as unknown as MySqlResponse<UserType>

    return user[0][0] || null
  }

  async getByCpf(cpf: number): Promise<UserType | null> {
    const sql = `
      SELECT * FROM users WHERE cpf = ?
    `
    const values = [ cpf ]

    const user = await (await dbConnection).query(sql, values) as unknown as MySqlResponse<UserType>

    return user[0][0] || null
  }
}