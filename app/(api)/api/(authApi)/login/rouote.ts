import { LogInFormSchema } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body: unknown =  await request.json();
    console.log("LogIn Body : ",body)
    const validateFields = LogInFormSchema.safeParse(body);
    
    if(!validateFields.success) {
        return NextResponse.json(validateFields, {status: 400})
    }

    const {email, password} = validateFields.data;
    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(userExists) {
        return NextResponse.json({
            errors: {
                email: 'Incorrect email or password',
                name: '',
                password: []
            }
        }, {status: 400})
    }

    const  isValidPassword = await bcrypt.compare(password, userExists?.password);

    if (!isValidPassword) {
        return NextResponse.json({ message: "Invalid credentials" }, {status: 400});
    }

}