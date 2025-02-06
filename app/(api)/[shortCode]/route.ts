import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
    request: NextRequest, 
    {params} : {params: Promise<{shortCode: string}>}
) {
    const { shortCode } = await params;
    const shortUrlByShortCode = await prisma.shortUrl.findUnique({
        where: {
            shortCode
        }
    });
    
    const redirectUrl = shortUrlByShortCode?.originalUrl;
    if(redirectUrl) {
        await prisma.shortUrl.update({
            where: {
                shortCode
            },
            data: {
                clicks: {
                    increment: 1
                }
            }
        });
    }
    return NextResponse.redirect(
        redirectUrl || '/');
}