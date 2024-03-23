import { dbConnection } from "../lib/db/mysql";

import { UserType } from "../types/users-types";
import { IUserRepository } from "./types/repository-interfaces";

export class UserRepository implements IUserRepository {
  async create({ 
    username, password
  }: UserType) {
    const sql = 'INSERT INTO users(username, password) VALUES (?, ?)'
    const values = [
      username,
      password,
    ]
  
    await (await dbConnection).query(sql, values)
  }
}