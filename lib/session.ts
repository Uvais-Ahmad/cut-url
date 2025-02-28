import {JWTPayload, jwtVerify, SignJWT} from 'jose'
import { cookies } from 'next/headers';
const secretKey = process.env.SESSION_SECRET
const encryptKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encryptKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const {payload } = await jwtVerify(session, encryptKey, {
            algorithms: ['HS256']
        })
        return payload;
    }
    catch (e) {
        console.error("Error in decrypt",e);
    }
}


export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const session = await encrypt({userId, expiresAt});
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
}

export async function updateSession () {
    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);

    if(!session || !payload) 
        return;

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
}

export async function deleteSession () {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}