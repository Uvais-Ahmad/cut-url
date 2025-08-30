import axiosInstance from "@/lib/axiosInstance"
import { PrismaClient } from "@prisma/client";
import { User, Session, Account, Profile } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
const prisma = new PrismaClient();
const ANON_COOKIE_NAME: string = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME as string;
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
import { cookies } from "next/headers";
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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
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
        async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
            const cookiesStore = await cookies();
            console.log("=== SIGNIN CALLBACK START ===");
            console.log("Provider:", account?.provider);
            console.log("User data:", { id: user.id, email: user.email, name: user.name });
            console.log("Account data:", account);
            console.log("Profile data:", profile);
            
            // Handle Google authentication
            if (account?.provider === 'google' && user.email) {
                try {
                    console.log("Processing Google authentication for:", user.email);
                    
                    // Check if user already exists
                    let existingUser = await prisma.user.findUnique({
                        where: { email: user.email }
                    });
                    
                    console.log("Existing user found:", existingUser ? existingUser.id : 'None');
                    
                    // If user doesn't exist, create them
                    if (!existingUser) {
                        console.log("Creating new user for Google auth");
                        existingUser = await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name || '',
                                password: null, // No password for Google users
                            }
                        });
                        console.log("Created new user with ID:", existingUser.id);
                    }
                    
                    // Update user object with database ID
                    user.id = existingUser.id;
                    console.log("Updated user ID to:", user.id);
                    
                } catch (error) {
                    console.error("Error handling Google sign-in:", error);
                    return false;
                }
            }
            
            const visitorUId = cookiesStore.get(ANON_COOKIE_NAME)?.value;
            console.log("visitorUId", visitorUId);
            if(visitorUId && user && user.id) {
                const updatedShortUrls = await prisma.shortUrl.updateMany({
                    where: {
                        visitorUId: visitorUId,
                        userId: null, // Only update if the user is not logged in
                    },
                    data: {
                        userId: user.id, // Assign the logged-in user's ID
                        visitorUId: null, // Clear the anonymous user ID
                    }
                });
                console.log(`Updated ${updatedShortUrls.count} short URLs for user`);
            }
            // remove the anonymous user cookie after sign-in
            cookiesStore.delete(ANON_COOKIE_NAME);
            console.log("=== SIGNIN CALLBACK SUCCESS ===");
            return true; // Return true to allow sign-in
        }
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