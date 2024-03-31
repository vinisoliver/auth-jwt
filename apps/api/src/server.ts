import fastify from 'fastify'

import { SignUpRoute } from './routes/sign-up'
import { LoginRoute } from './routes/login'
import { GetUserByIdRoute } from './routes/get-user-by-id'

const server = fastify({ logger: true })

server.register(SignUpRoute)
server.register(LoginRoute)
server.register(GetUserByIdRoute)

server.listen({
  port: Number(process.env.SERVER_PORT) || 3333
}, () => console.log('Server is running in URL: http://localhost:3333'))