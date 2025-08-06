import { LogInFormSchema } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const prisma = new PrismaClient();

interface LogInBody {
    email: string;  
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data: LogInBody = JSON.parse(body.data as string) as LogInBody;
        
        const validateFields = LogInFormSchema.safeParse(data);
        
        if (!validateFields.success) {
            const fieldErrors: Record<string, string> = {};
            
            validateFields.error.errors.forEach((error) => {
                const field = error.path[0] as string;
                fieldErrors[field] = error.message;
            });

            return NextResponse.json({
                message: "Invalid input data",
                errors: fieldErrors
            }, { status: 400 });
        }

        const { email, password } = validateFields.data;
        
        const userExists = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!userExists) {
            return NextResponse.json({
                message: "Invalid credentials",
                errors: {
                    email: 'Invalid email or password',
                    password: 'Invalid email or password'
                }
            }, { status: 401 });
        }

        const isValidPassword = await bcrypt.compare(password, userExists.password);

        if (!isValidPassword) {
            return NextResponse.json({
                message: "Invalid credentials",
                errors: {
                    password: 'Invalid email or password'
                }
            }, { status: 401 });
        }

        return NextResponse.json({
            message: "Login successful",
            user: {
                id: userExists.id,
                name: userExists.name,
                email: userExists.email,
                createdAt: userExists.createdAt,
                updatedAt: userExists.updatedAt
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        
        if (error instanceof ZodError) {
            return NextResponse.json({
                message: "Invalid input data",
                errors: error.errors
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "Internal server error occurred during login"
        }, { status: 500 });
    }
}