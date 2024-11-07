import Menu from "@/components/Menu";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { BsTrash3 } from 'react-icons/bs';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <div className="h-screen flex text-black">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white p-4">
        <Link href="/" className="flex gap-4 items-center justify-center lg:justify-start">
          <BsTrash3 />
          <span className="hidden lg:block ">ATO</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] p-4 overflow-scroll">
        {children}
      </div>
    </div>
    </SessionProvider>
  );
}