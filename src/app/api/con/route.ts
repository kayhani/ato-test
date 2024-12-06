
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';


export async function POST(request: NextRequest) {
    const res = await request.json();
    console.log({ res });

    let uid;
    // Authorization başlığını almak için 'get' fonksiyonunu kullanın
    const authHeader = request.headers.get("authorization") || '';
    const authToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

    console.log({ authToken });

    if (authToken && authToken === process.env.CONTAINER_AUTH_TOKEN) {

        return NextResponse.json({
            data: {
                result: 'Ok',
                id: uid,
                token: authToken,
                response: res.data,
            }
        });
    } else {
        
    }
}