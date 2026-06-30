// Vercel runs files in /api as serverless functions.
// A Hono `app` is already a web-standard handler (it exposes `fetch`),
// which Vercel's Node.js runtime invokes directly. Do NOT wrap it with
// hono/vercel's `handle` here — that returns a bare `(req) => ...` function
// which Vercel treats as a legacy Node (req, res) handler, breaking Hono.
import app from '../src/server/index.js'

export default app
