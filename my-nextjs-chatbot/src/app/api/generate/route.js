// API endpoint

import { NextResponse } from 'next/server';
import GeminiController from '../../../lib/controllers/geminiController';
import ValidationError from '@/lib/utils/validationError';

const controller = new GeminiController();

export async function POST(request) {
    try {
        const body = await request.json();
        const result = await controller.generateContent(body.prompt);
        return NextResponse.json({ content: result });
    } catch (error) {
        let statusCode;
        error instanceof ValidationError ? statusCode = 401 : statusCode = 500
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: statusCode });
    }
}