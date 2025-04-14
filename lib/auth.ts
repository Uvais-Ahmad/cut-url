import { decrypt } from "./session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserBySessionId(encryptedSessionId: string) {
    if (!encryptedSessionId) {
        throw new Error('Session ID is required');
    }

    const decryptedUserId = await decrypt(encryptedSessionId);
    console.log("DECRUPTED USER ID : ",decryptedUserId)
    if (!decryptedUserId) {
        throw new Error('Invalid session ID');
    }
    // Fetch the user from the database using the session ID
    const userDetails = await prisma.user.findUnique({
        where: {
            id: decryptedUserId.userId as string
        }
    })
    console.log("Decrypted user Details : ",userDetails);
    if (!userDetails) {
        throw new Error('User not found');
    }
    return userDetails;
}