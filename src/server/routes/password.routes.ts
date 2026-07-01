import { Hono } from "hono";
import withPrisma from "../lib/prisma.js";
import type { ContextWithPrisma } from "../index.js";
import { passwordService } from "../service/password.service.js";
import { auth } from "../helper/auth.helper.js";

export const passwordRouter = new Hono<ContextWithPrisma>();

passwordRouter.use("*", auth)

passwordRouter.post("/", withPrisma, async (c) => {
    const prisma = c.get("prisma"); 
    const body = await c.req.json();
    
    const data = await passwordService.createPassword(prisma, body)
    return c.json(data)
});

passwordRouter.put("/", withPrisma, async (c) => {
    const prisma = c.get("prisma"); 
    const body = await c.req.json();
    
    const data = await passwordService.updatePassword(prisma, body)
    return c.json(data)
});

passwordRouter.get("/", withPrisma, async (c) => {
    const prisma = c.get("prisma"); 
    
    const data = await passwordService.getPasswords(prisma)
    return c.json(data)
});

