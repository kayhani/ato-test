import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Ato",
    absolute: "Ato",
  },
  description:
    "Atık Toplama Otomasyonu",
};



export default function RootLayout({
   
  children,
}: Readonly<{
  children: React.ReactNode;
  
  
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
              <NavBar />
              {children}
        </SessionProvider>
      </body>
    </html>
  );
}
