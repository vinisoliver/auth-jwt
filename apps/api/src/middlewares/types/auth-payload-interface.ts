import jwt from 'jsonwebtoken'

export type IAuthPayload = {
  sub: string;
} & jwt.JwtPayload
