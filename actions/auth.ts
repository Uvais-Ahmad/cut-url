import { RegisterForm, RegisterFormSchema } from "@/lib/definitions";
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

export async function register( state: RegisterForm, formData: FormData) {
    const validateFields = RegisterFormSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if(!validateFields?.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
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
        return {
            errors: {
                email: 'Email already exists',
                name: '',
                password: []
            }
        }
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
    // authorization
    redirect('/home');
}