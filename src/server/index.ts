import { Hono } from 'hono'
// import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import type { PrismaClient } from './generated/prisma/client.js';
import { passwordRouter } from './routes/password.routes.js';
import withPrisma from './lib/prisma.js';

export type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient; 
  }; 
};

const app = new Hono<ContextWithPrisma>(); 

app.get('/api', (c) => {
  return c.text("KyoLocker API")
})

app.use(
    '*',
    cors({
        origin: '*',
        credentials: true,
    }),
    withPrisma
)

app.route("api/password", passwordRouter)

// serve({
//     fetch: app.fetch,
//     port: 3002,
//     hostname: '0.0.0.0',
// })

// console.log('Hono server running on http://localhost:3002 🚀🚀')

export default app;