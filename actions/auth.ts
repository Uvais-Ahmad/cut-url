import {RegisterFormSchema, TRegisterFormSchema } from "@/lib/types";
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

export async function logout () {
    await deleteSession()
    redirect('/login');
}