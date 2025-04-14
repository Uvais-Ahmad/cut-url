import { decrypt } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // Get cookies from the request
        const cookies = req.cookies;
        const encryptedSessionId = cookies.get('session')?.value;

        if (!encryptedSessionId) {
            return NextResponse.json({ error: 'Session ID not found in cookies' }, { status: 400 });
        }

        // Decrypt the session ID
        const decryptedUserId = await decrypt(encryptedSessionId);
        console.log("DECRUPTED USER ID : ",decryptedUserId)
        if (!decryptedUserId) {
            return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
        }

        // Fetch the user from the database using the session ID
        const userDetails = await prisma.user.findUnique({
            where: {
                id: decryptedUserId.userId as string
            }
        })
        console.log("Decrypted user Details : ",userDetails);
        if (!userDetails) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return the user data
        return NextResponse.json({ data: userDetails, message: "Successfully fetched user" },{ status: 200});
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}