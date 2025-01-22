import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as Blob | null;
        const data = formData.get("data");

        if (!file || !data) {
            return NextResponse.json({ error: "No file or data provided" }, { status: 400 });
        }

        const res = JSON.parse(data as string);
        console.log("Parsed data:", res); // Gelen veriyi kontrol et

        // Authorization kontrolü
        const authHeader = request.headers.get("Authorization") || '';
        const authToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

        if (!authToken || authToken !== process.env.CONTAINER_AUTH_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Dosya işlemleri
        const fileExtension = ".jpeg";
        const fileName = `${res.data.id || 'new'}${fileExtension}`;
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        
        try {
            await fs.mkdir(uploadsDir, { recursive: true });
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const filePath = path.join(uploadsDir, fileName);
            await fs.writeFile(filePath, buffer);
        } catch (error) {
            console.error("File processing error:", error);
            return NextResponse.json({ error: "File processing failed" }, { status: 500 });
        }

        const fileUrl = `/uploads/${fileName}`;

        // Tüm değerleri string'e çeviriyoruz
        const baseData = {
            lat: res.data.lat?.toString() ?? null,
            lon: res.data.lon?.toString() ?? null,
            temp: res.data.temp?.toString() ?? null,
            // Yeni eklenen sensör verileri
            laser1: res.data.laser1?.toString() ?? null,
            laser2: res.data.laser2?.toString() ?? null,
            ax: res.data.ax?.toString() ?? null,
            ay: res.data.ay?.toString() ?? null,
            az: res.data.az?.toString() ?? null,
            // Diğer alanlar
            alarm: res.data.alarm?.toString() ?? null,
            capacity: res.data.capacity?.toString() ?? null,
            motion: res.data.motion?.toString() ?? null,
            apikey: authToken,
            imei: res.data.imei?.toString() ?? null,
            url: fileUrl,
            address: res.data.address?.toString() ?? null,
            owner: res.data.owner?.toString() ?? null
        };

        let result;
        if (!res.data.id && res.data.imei) {
            // Yeni kayıt
            result = await prisma.container.create({
                data: baseData
            });
        } else if (res.data.id && res.data.imei) {
            // Güncelleme
            result = await prisma.container.update({
                where: {
                    id: res.data.id,
                    imei: res.data.imei,
                },
                data: baseData
            });
        } else {
            return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
        }

        return NextResponse.json({
            message: "File uploaded and data saved successfully",
            fileUrl,
            uid: result.id,
        });

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ 
            error: "Request processing failed",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}