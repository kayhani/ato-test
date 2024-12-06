import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client"; // Prisma Client'ı import et

const prisma = new PrismaClient(); // Prisma Client'ı başlat

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as Blob | null;
        const data = formData.get("data");
        console.log("Received data:", data);  // Burada veriyi kontrol edin
        const res = JSON.parse(data as string); // JSON verisini al

        console.log({ res });

        if (!file || !res) {
            return NextResponse.json({ error: "No file or data provided" }, { status: 400 });
        }

        // Authorization kontrolü
        const authHeader = request.headers.get("authorization") || '';
        const authToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

        console.log({ authToken });

        if (authToken && authToken === process.env.CONTAINER_AUTH_TOKEN) {
            let uid;

            // Dosya işlemleri (image upload)
            const fileExtension = ".jpeg"; // Her zaman .jpeg olarak sabitleniyor
            const mimeType = "image/jpeg"; // MIME tipi de .jpeg olarak belirleniyor

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Dosya adı container id'ye göre belirleniyor
            const fileName = `${res.data.id}${fileExtension}`;

            const uploadsDir = path.join(process.cwd(), "public", "uploads");
            await fs.mkdir(uploadsDir, { recursive: true });

            const filePath = path.join(uploadsDir, fileName);
            await fs.writeFile(filePath, buffer);

            const fileUrl = `/uploads/${fileName}`;

            // Veritabanı işlemi: yeni bir container kaydı oluşturma veya güncelleme
            if (res.data.id === null && res.data.imei !== null) {
                // Yeni kayıt oluştur
                const a = await prisma.container.create({
                    data: {
                        lat: res.data.lat,
                        lon: res.data.lon,
                        alarm: res.data.alarm,
                        capacity: res.data.capacity,
                        temp: res.data.temp,
                        apikey: authToken,
                        imei: res.data.imei,
                        url: fileUrl, // Dosya URL'si "url" olarak kaydediliyor
                    },
                });

                uid = a.id;
            } else if (res.data.id !== null && res.data.imei !== null) {
                // Kayıt güncelle
                const b = await prisma.container.update({
                    where: {
                        id: res.data.id,
                        imei: res.data.imei,
                    },
                    data: {
                        lat: res.data.lat,
                        lon: res.data.lon,
                        alarm: res.data.alarm,
                        capacity: res.data.capacity,
                        temp: res.data.temp,
                        apikey: authToken,
                        imei: res.data.imei,
                        url: fileUrl, // Güncellenmiş dosya URL'si "url" olarak kaydediliyor
                    },
                });

                uid = res.data.id;
            }

            // Başarılı yanıt döndür
            return NextResponse.json({
                message: "File uploaded and data saved successfully",
                fileUrl,
                uid,
            });
        } else {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error processing upload:", error);
        return NextResponse.json({ error: "File upload or data save failed" }, { status: 500 });
    }
}
