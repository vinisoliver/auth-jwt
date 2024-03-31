import jwt from 'jsonwebtoken'

export function createToken(payload: object) {
  const jwtToken = jwt.sign(
    payload, 
    process.env.JWT_SECRET!, 
    {
      expiresIn: 60,
  })

  return jwtToken
}  