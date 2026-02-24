import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

export async function GET() {
    const cwd = process.cwd();
    const dbPath = path.join(cwd, 'database', 'settings.json');
    const srcPath = path.join(cwd, 'src', 'data', 'settings.json');

    let dbSettings = null;
    let srcSettings = null;
    let dbError = null;
    let srcError = null;

    try {
        const raw = await fs.readFile(dbPath, 'utf-8');
        dbSettings = JSON.parse(raw);
    } catch (e: unknown) {
        dbError = e instanceof Error ? e.message : String(e);
    }

    try {
        const raw = await fs.readFile(srcPath, 'utf-8');
        srcSettings = JSON.parse(raw);
    } catch (e: unknown) {
        srcError = e instanceof Error ? e.message : String(e);
    }

    return NextResponse.json({
        cwd,
        dbPath,
        srcPath,
        database_settings: dbSettings,
        database_error: dbError,
        src_settings: srcSettings,
        src_error: srcError,
    }, { status: 200 });
}
