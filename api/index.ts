import { handle } from 'hono/vercel'
import app from '../src/server/index.js'

// Run on the Node.js runtime (Prisma + pg need Node, not Edge).
export const config = {
  runtime: 'nodejs',
}

export default handle(app)
