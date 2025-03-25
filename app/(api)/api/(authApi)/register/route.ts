import { createSession } from "@/lib/session";
import { RegisterFormSchema } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body: unknown =  request.body;
    console.log("Body : ",body)
    const validateFields = RegisterFormSchema.safeParse(body);

    if(!validateFields.success) {
        return NextResponse.json(validateFields, {status: 400})
    }

    const {name, email, password} = validateFields.data;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("name, email, password", name, email, password);
    
    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(userExists) {
        return NextResponse.json({
            errors: {
                email: 'Email already exists',
                name: '',
                password: []
            }
        }, {status: 400})
    }
    
    // Create user in database
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        },
    });

    // create session
    await createSession(user?.id);
    return NextResponse.json({
        message: "Registered Successfully"
    },{
        status: 200
    });
}