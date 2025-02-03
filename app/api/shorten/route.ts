import validateUrl from "@/lib/validateUrl";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const shortCodeLen: number = parseInt(process.env.NEXT_PUBLIC_SHORT_CODE_LENGTH as string, 10);
const ANON_COOKIE_NAME: string = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME as string;
const BaseUrl: string = process.env.NEXT_PUBLIC_BASE_URL as string;
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { originalUrl } = await request.json();
        const cookies = request.cookies.get(ANON_COOKIE_NAME)?.value;
        const ip: string = request.headers.get('x-forwarded-for') || 'unknown';

        // check if the URL is valid
        if (!originalUrl || !validateUrl(originalUrl)) {
            return NextResponse.json({
                error: "Please provide a valid URL"
            }, {
                status: 400 // Bad Request
            });
        }

        let anonUserExists = await prisma.anonymousUser.findUnique({
            where: {
                sessionId: cookies
            }
        });

        if (!anonUserExists && cookies) {
            anonUserExists = await prisma.anonymousUser.create({
                data: {
                    sessionId: cookies,
                    ipAddress: ip
                }
            });
        }

        const shortCode = nanoid(shortCodeLen);

        const shortUrlRecord = await prisma.shortUrl.create({
            data: {
                originalUrl,
                shortCode,
                anonUserId: anonUserExists?.id
            }
        });

        return NextResponse.json({
            shortUrl: `${BaseUrl}/${shortCode}`,
            message: "Short URL created successfully",
            data: shortUrlRecord
        }, {
            status: 201 // Created
        });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return NextResponse.json({
            error: "An error occurred while creating the short URL"
        }, {
            status: 500 // Internal Server Error
        });
    }
}