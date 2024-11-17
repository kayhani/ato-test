import Cart from "@/components/Cart"
import MapProvider from "@/app/providers/map-provider";
import Map from "@/components/Map"
import Announcement from "@/components/Announcement";
import Messages from "@/components/Messages";
import prisma from "@/lib/prisma";
import { User } from "next-auth";
import LocationCart from "@/components/LocationCart";


interface AdminPageProps {
  user: User;
};

const AdminPage = async ({ user }: AdminPageProps) => {

  const  containerData = await prisma.container.findUnique({
    where: {
      id: "cm38ckgfq0000g3nd8dzy0rrb"
    }
  });

  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* VEHICLE CARD */}
        <div className="flex gap-4 justify-between flex-wrap ">
          <Cart type="Temperature" count={containerData?.temp!} />
          <Cart type="Alarm" count={containerData?.alarm!} />
          <Cart type="Kapasite" count={String(containerData?.capacity!)} />
          <LocationCart type="Location" lat={containerData?.lat!} lon={containerData?.lon!} />
        </div>
        {/* MIDDLE CHARTS */}
        {/* BOTTOM CHART */}
        <div className="">
          <MapProvider>
            <Map container = {containerData}/>
          </MapProvider>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">
        <Announcement />
        <Messages />
      </div>
    </div>
  )
}

export default AdminPage