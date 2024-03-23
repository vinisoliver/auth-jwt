import fastify from 'fastify'

import { SignInRoute } from './routes/sign-in'

const server = fastify({ logger: true })

server.register(SignInRoute)

server.listen({
  port: Number(process.env.SERVER_PORT) || 3333
}, () => console.log('Server is running in URL: http://localhost:3333'))