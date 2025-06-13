import axiosInstance from "@/lib/axiosInstance"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
  
    providers: [
        // ...add more providers here
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await axiosInstance.post('/api/login', {
                    data: JSON.stringify(credentials)
                });

                const user = res.data;

                if (res.status === 200 && user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }
                
                return null;
            },
        })
    ],
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login',
        newUser: '/register', // Will disable the new account creation screen
        verifyRequest: '/login', // Will disable the email verification screen
        
    },
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
