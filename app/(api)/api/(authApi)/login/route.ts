import { LogInFormSchema } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body: unknown = await request.json();
    const data = JSON.parse(body.data as string);
    console.log("LogIn Body : ",data)
    const validateFields = LogInFormSchema.safeParse(data);
    console.log("LogIn Validation : ",validateFields)
    if(!validateFields.success) {
        return NextResponse.json(validateFields, {status: 400})
    }

    const {email, password} = validateFields.data;
    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!userExists) {
        console.log("User does not exist");
        return NextResponse.json({
            errors: {
                email: 'Incorrect email or password',
                name: '',
                password: []
            }
        }, {status: 400})
    }

    const  isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) {
        console.log("Invalid password");
        return NextResponse.json({ message: "Invalid credentials" }, {status: 400});
    }

    console.log("User logged in successfully");
    return NextResponse.json({
        message: "User logged in successfully",
        user: {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            createdAt: userExists.createdAt,
            updatedAt: userExists.updatedAt
        }
    }, {status: 200});

}