import fastify from 'fastify'

import { SignUpRoute } from './routes/sign-up'
import { LoginRoute } from './routes/login'
import { GetUserById } from './routes/get-user-by-id'

const server = fastify({ logger: true })

server.register(SignUpRoute)
server.register(LoginRoute)
server.register(GetUserById)

server.listen({
  port: Number(process.env.SERVER_PORT) || 3333
}, () => console.log('Server is running in URL: http://localhost:3333'))