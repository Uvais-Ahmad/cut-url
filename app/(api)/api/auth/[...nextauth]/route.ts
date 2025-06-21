import axiosInstance from "@/lib/axiosInstance"
import NextAuth, { User, Session } from "next-auth"
import { JWT } from "next-auth/jwt";

// Extend the Session and User types to include 'id'
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
    interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

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

                const data = res.data;
                if (res.status === 200 && data && data.user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return data.user;
                }
                
                return null;
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            // Persist the user information in the token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Send properties to the client, like an access_token from a provider.
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
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
