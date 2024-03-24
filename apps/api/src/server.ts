import fastify from 'fastify'

import { SignUpRoute } from './routes/sign-up'

const server = fastify({ logger: true })

server.register(SignUpRoute)

server.listen({
  port: Number(process.env.SERVER_PORT) || 3333
}, () => console.log('Server is running in URL: http://localhost:3333'))