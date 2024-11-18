
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
        if(res.data.id === null && res.data.imei !== null){

            const a= await prisma.container.create({
                data: {
                    lat: res.data.lat,
                    lon: res.data.lon,
                    alarm: res.data.alarm,
                    capacity: res.data.capacity,
                    temp: res.data.temp,
                    apikey : authToken,
                    imei : res.data.imei
                },
            });

             uid = a.id; 
        
        }else if(res.data.id !== null && res.data.imei !== null){
            const b = await prisma.container.update({
                where: {
                    id: res.data.id,
                    imei: res.data.imei  // Güncellemek istediğiniz kaydın ID'si
                },
                data: {
                    lat: res.data.lat,
                    lon: res.data.lon,
                    alarm: res.data.alarm,
                    capacity: res.data.capacity,
                    temp: res.data.temp,
                    apikey : authToken,
                    imei: res.data.imei
                },
            });
            uid = res.data.id; 
        };

        return NextResponse.json({
            data: {
                result: 'Ok',
                id: uid,
                token: authToken
            }
        });
    } else {
        
    }
}