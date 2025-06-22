import validateUrl from "@/lib/validateUrl";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

const shortCodeLen: number = parseInt(process.env.NEXT_PUBLIC_SHORT_CODE_LENGTH as string, 10);
const ANON_COOKIE_NAME: string = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME as string;
const BaseUrl: string = process.env.NEXT_PUBLIC_BASE_URL as string;
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { originalUrl } = await request.json();
        const session = await getServerSession(authOptions);
        const dbUserId: string | null = session?.user?.id || null;
        const visitorUId = request.cookies.get(ANON_COOKIE_NAME)?.value;
        
        // check if the URL is valid
        if (!originalUrl || !validateUrl(originalUrl)) {
            return NextResponse.json({
                error: "Please provide a valid URL"
            }, {
                status: 400 // Bad Request
            });
        }

        // check if the URL already exists
        const urlExists = await prisma.shortUrl.findFirst({
            where: {
                originalUrl,
                anonUserId: !dbUserId ? visitorUId: null,
                userId: dbUserId || null,
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
                anonUserId: !dbUserId ? visitorUId : null,
                userId: dbUserId || null,
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
    const session = await getServerSession(authOptions);
    const dbUserId: string | null = session?.user?.id || null;
    const visitorUId = request.cookies.get(ANON_COOKIE_NAME)?.value;

    const data = await prisma.shortUrl.findMany({
        where: {
            anonUserId: !dbUserId ? visitorUId: null,
            userId: dbUserId || null,
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