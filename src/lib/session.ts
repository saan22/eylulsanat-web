import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'session-debug.log');
function log(msg: string) {
    try {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFile, `${timestamp}: ${msg}\n`);
    } catch (e) {
        // ignore
    }
}

const secretKey = process.env.SESSION_SECRET || 'default_secret_key_change_me_in_production';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error: any) {
        log(`Decrypt failed: ${error.message}`);
        return null;
    }
}

export async function createSession() {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ role: 'admin', expiresAt });
    const cookieStore = await cookies();

    log(`Creating session. Cookie set. Expires: ${expiresAt}`);

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: false, // Debugging: Relax security to rule out SSL mix-ups
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) {
        log('Verify: No session cookie found');
        return null;
    }

    const payload = await decrypt(session);

    if (!payload) {
        log('Verify: Payload decryption failed');
        return null;
    }

    log('Verify: Success');
    return { isAuth: true };
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
