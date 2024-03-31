import { randomUUID } from "crypto";
import { dbConnection } from "../lib/db/mysql";

import { UserDTOType, UserPasswordType, UserResponseType } from "../types/users-types copy";
import { IUserRepository } from "./types/repository-interfaces";
import { MySqlResponse } from "./types/mysql-response";

export class UserRepository implements IUserRepository {
  async create({ 
    username, password, cep, cpf, dateOfBirth, email, firstName, lastName, phoneNumber
  }: UserDTOType) {
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

  async getByUsername(username: string): Promise<UserResponseType | null> {
    const sql = `
    SELECT username, cep, cpf, dateOfBirth, email, firstName, lastName, phoneNumber, id 
    FROM users WHERE username = ?
    `
    const values = [ username ]
  
    const user = await (await dbConnection).query(sql, values) as unknown as MySqlResponse<UserResponseType>

    return user[0][0] || null
  }

  async getByCpf(cpf: number): Promise<UserResponseType | null> {
    const sql = `
      SELECT username, cep, cpf, dateOfBirth, email, firstName, lastName, phoneNumber, id 
      FROM users WHERE cpf = ?
    `
    const values = [ cpf ]

    const user = await (await dbConnection).query(sql, values) as unknown as MySqlResponse<UserResponseType>

    return user[0][0] || null
  }

  async getUserById(id: string): Promise<UserResponseType | null> {
    const sql = `
      SELECT username, cep, cpf, dateOfBirth, email, firstName, lastName, phoneNumber, id 
      FROM users WHERE id = ?
    `
    const values = [ id ]

    const user = await (await dbConnection).query(sql, values) as unknown as MySqlResponse<UserResponseType>

    return user[0][0] || null
  }

  async getPasswordById(id: string): Promise<UserPasswordType | null> {
    const sql = `
      SELECT password FROM users WHERE id = ?
    `
    const values = [ id ]

    const user = await (await dbConnection).query(sql, values) as unknown as MySqlResponse<UserPasswordType>

    return user[0][0] || null
  }
}