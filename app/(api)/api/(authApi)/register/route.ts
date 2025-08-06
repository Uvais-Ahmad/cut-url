// import { createSession } from "@/lib/session";
import { RegisterFormSchema } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();
        
        const validateFields = RegisterFormSchema.safeParse(body);

        if (!validateFields.success) {
            const fieldErrors: Record<string, string> = {};
            
            validateFields.error.errors.forEach((error) => {
                const field = error.path[0] as string;
                fieldErrors[field] = error.message;
            });

            return NextResponse.json({
                message: "Validation failed",
                errors: fieldErrors
            }, { status: 400 });
        }

        const { name, email, password } = validateFields.data;
        
        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userExists) {
            return NextResponse.json({
                message: "User already exists",
                errors: {
                    email: 'An account with this email already exists'
                }
            }, { status: 400 });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 12);
        
        // Create user in database
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: hashPassword
            },
        });

        return NextResponse.json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Registration error:", error);
        
        if (error instanceof ZodError) {
            return NextResponse.json({
                message: "Invalid input data",
                errors: error.errors
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "Internal server error occurred during registration"
        }, { status: 500 });
    }
}