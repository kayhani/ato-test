import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';


export async function POST(request: NextRequest) {
    const res = await request.json();
    console.log({ res });

    let dt;

    // Authorization başlığını almak için 'get' fonksiyonunu kullanın
    const authHeader = request.headers.get("authorization") || '';
    const authToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

    console.log({ authToken });

    if(res.data.id !== null){
        const b = await prisma.container.findUnique({
            where: {
                id: res.data.id,
            },
        });
        dt = b;
        console.log({ dt });
    }else {
        return NextResponse.json({ error: "Invalid Auth Token" }, { status: 401 });
    };

    return NextResponse.json({
        data: {
            lat: dt?.lat,
            lon: dt?.lon,
            temp: dt?.temp,
            alarm: dt?.alarm,
        }
    });
}