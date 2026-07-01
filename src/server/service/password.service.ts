import type { Prisma, PrismaClient } from "../generated/prisma/client.js"
import { encrypt } from "../helper/crypto.helper.js"

export const passwordService = {

    async createPassword(
        prisma: PrismaClient,
        data: Prisma.PasswordCreateInput
    ) {
        try {

            data.dateCreated = new Date()
            data.dateModified = new Date()

            const password = await prisma.password.create({
                data
            })

            return {
                success: true,
                data: password
            }

        } catch (error: unknown) {

            const message =
                error instanceof Error ? error.message : "Unknown error occurred";

            return {
                success: false,
                data: null,
                message: message
            }
        }
    },

    async updatePassword(
        prisma: PrismaClient,
        data: Prisma.PasswordUncheckedCreateInput
    ) {
        try {
            data.dateModified = new Date();
            const id = data.id

            console.log(data)

            const password = await prisma.password.update({
                where: {
                    id,
                },
                data,
            });

            return {
                success: true,
                data: password,
            };
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Unknown error occurred";

            return {
                success: false,
                data: null,
                message,
            };
        }
    },

    async getPasswords(prisma: PrismaClient) {
        try {
            const data = await prisma.password.findMany()
            const absoluteData = data.map((x) => ({
                ...x,
                password: encrypt(x.password),
            }));

            return {
                success: true,
                data: absoluteData,
            };
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Unknown error occurred";

            return {
                success: false,
                data: null,
                message: message
            }
        }
    }
}
