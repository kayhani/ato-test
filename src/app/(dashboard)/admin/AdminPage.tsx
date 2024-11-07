import Cart from "@/components/Cart"
import CountChart from "@/components/CountChart"
import ProgressChart from "@/components/ProgressChart"
import MapProvider from "@/app/providers/map-provider";
import Map from "@/components/Map"
import Announcement from "@/components/Announcement";
import Messages from "@/components/Messages";
import prisma from "@/lib/prisma";
import { User } from "next-auth";


interface AdminPageProps {
  user: User;
};

const AdminPage  = async ({user}: AdminPageProps) => {

  const adminCount = await prisma.user.count({where: {role: {equals:"admin"}}})
  const userCount = await prisma.user.count({where: {role:{not:"admin"}}})
  const truckCount = await prisma.truck.count({})
  const containerCount = await prisma.container.count({})

  const emptyContainers = await prisma.container.findMany({where: {fullness:{lte:30}}})
  const fullContainers = await prisma.container.findMany({where: {fullness:{gt:30}}})
 
 

  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* VEHICLE CARD */}
        <div className="flex gap-4 justify-between flex-wrap ">
          <Cart type="Personel" count={userCount}/>
          <Cart type="Araç" count={truckCount}/>
          <Cart type="Konteyner" count={containerCount}/>
          {/* <Cart type="Admin" count={adminCount}/> */}
        </div>
        {/* MIDDLE CHARTS */}
       
        {/* BOTTOM CHART */}
        <div className="">
          <MapProvider>
            <Map containers={fullContainers}/>
          </MapProvider>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">
        <Announcement/>
        <Messages/>
      </div>
    </div>
  )
}

export default AdminPage