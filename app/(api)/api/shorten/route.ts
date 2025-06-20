import validateUrl from "@/lib/validateUrl";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const shortCodeLen: number = parseInt(process.env.NEXT_PUBLIC_SHORT_CODE_LENGTH as string, 10);
const ANON_COOKIE_NAME: string = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME as string;
const BaseUrl: string = process.env.NEXT_PUBLIC_BASE_URL as string;
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { originalUrl } = await request.json();
        const session = await getServerSession(authOptions);
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
        if(session && session.user) {
            
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

        // check if the URL already exists
        const urlExists = await prisma.shortUrl.findFirst({
            where: {
                originalUrl,
                anonUserId: anonUserExists?.id
            }
        });
        if(urlExists) {
            return NextResponse.json({
                shortUrl: `${BaseUrl}/${urlExists.shortCode}`,
                message: "Short URL already exists",
                data: urlExists
            }, {
                status: 200 // OK
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
            status: 500
        });
    }
}

export async function GET(request: NextRequest) {
    const ip: string = request.headers.get('x-forwarded-for') || 'unknown';
    const cookies = request.cookies.get(ANON_COOKIE_NAME)?.value;
    console.log("Cookies:", cookies);
    if(!cookies) {
        return NextResponse.json({
            error: "Anonymous user not found"
        }, {
            status: 400
        });
    }

    let anonUserExists = await prisma.anonymousUser.findUnique({
        where: {
            sessionId: cookies
        }
    });
    console.log("Anon User Exists:", anonUserExists);
    if(!anonUserExists) {
        anonUserExists = await prisma.anonymousUser.create({
            data: {
                sessionId: cookies,
                ipAddress: ip
            }
        });
    }

    const data = await prisma.shortUrl.findMany({
        where: {
            anonUserId: anonUserExists.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const shortUrls = data.map((url) => {
        return {
            id: url.id,
            originalUrl: url.originalUrl,
            shortUrl: `${BaseUrl}/${url.shortCode}`,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
            clicks: url.clicks,
            active: !url.isExpired
        };
    });
    return NextResponse.json({
        message: "Short URLs retrieved successfully",
        data: {
            shortUrls
        }
    }, {
        status: 200 // OK
    });
}