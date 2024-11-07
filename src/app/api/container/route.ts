
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const res = await request.json();
    console.log({ res });

    // Authorization başlığını almak için 'get' fonksiyonunu kullanın
    const authHeader = request.headers.get("authorization") || '';
    const authToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

    console.log({ authToken });

    if (authToken && authToken === process.env.CONTAINER_AUTH_TOKEN) {
        return NextResponse.json({
            data: {
                result: 'Ok',
                res: res,
                token: authToken
            }
        });
    } else {
        return NextResponse.json({ error: "Invalid Auth Token" }, { status: 401 });
    }
}