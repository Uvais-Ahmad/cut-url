import { RegisterForm, RegisterFormSchema } from "@/lib/definitions";
import bcrypt from 'bcryptjs';
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

    const [name, email, password] = validateFields.data;
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user in database
}