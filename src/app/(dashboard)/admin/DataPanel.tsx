"use client";
import React, { useEffect, useState } from "react";
import Cart from "@/components/Cart"
import prisma from "@/lib/prisma";
import { User } from "next-auth";
import LocationCart from "@/components/LocationCart";


interface Data {
    id: string
    lat: string
    lon: string
    temp: string
    alarm: string
    imei: string
    fullness: string
    capacity: string
}

const DataPanel = () => {
    const [data, setData] = useState<Data[]>([]);
    // API'den veri çekme fonksiyonu
    const fetchData = async () => {
        const payload = {
            id: "cm38ckgfq0000g3nd8dzy0rrb", // JSON body'deki ID
        };

        const token = "ZxXXm2qjsGXyYmaI2+PbLJzYPOtD7gfdwdTxnWLbFJU="; // Header'daki Bearer token

        try {
            const response = await fetch("/api/getdata", {
                method: "POST", // POST metodu
                headers: {
                    "Content-Type": "application/json", // JSON formatında veri gönderildiğini belirtir
                    "Authorization": `Bearer ${token}`, // Token başlığı
                },
                body: JSON.stringify(payload), // Body'yi JSON formatına çevir
            });

            if (!response.ok) {
                throw new Error("API isteği başarısız oldu");
            }
            const dt = await response.json();
            console.log(dt); // API'den gelen yanıt
            setData(Array.isArray(dt.data) ? dt.data : [dt.data]);

        } catch (error) {
            console.error("Hata:", error);
        }
    };

    // Her 1 saniyede bir veri yenileme
    useEffect(() => {
        fetchData(); // İlk veri çekme
        const interval = setInterval(() => {
            fetchData();
        }, 1000); // 1 saniyede bir yenileme

        return () => clearInterval(interval); // Bileşen unmount olduğunda interval'ı temizle
    }, []);

    return (
        <div className='p-4 flex gap-4 flex-col md:flex-row'>
            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* VEHICLE CARD */}
                   {data.map((item) =>(
                        <div key={item.id}>
                        <div className="flex gap-4 justify-between flex-wrap ">
                        <Cart type="Temperature" count={item.temp} />
                        <Cart type="Alarm" count={item?.alarm} />
                        <Cart type="Kapasite" count={item.capacity} />
                        <LocationCart type="Location" lat={item?.lat} lon={item?.lon} />
                        </div>
                </div>
                   ))}
                    
                
            </div>
        </div>
    )

};

export default DataPanel;