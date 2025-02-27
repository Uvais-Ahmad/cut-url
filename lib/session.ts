import {JWTPayload, SignJWT} from 'jose'
const secretKey = process.env.SESSION_SECRET
const encryptKey = new TextEncoder().encode(secretKey);

export async function encryptSession(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(encryptKey)
}
