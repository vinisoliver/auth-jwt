import mysql from 'mysql2/promise'

export const dbConnection = mysql.createConnection(process.env.DATABASE_URL ?? '')