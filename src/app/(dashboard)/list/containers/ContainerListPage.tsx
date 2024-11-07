import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Container, Prisma} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { User } from "next-auth";


type ContainerList = Container


const columns = [
    {
        header:"Konteyner ID",
        accessor:"containerId",
        className:"hidden md:table-cell",
    },
    {
        header:"Enlem/Boylam",
        accessor:"latlng",
        className:"hidden md:table-cell",
    },
    {
        header:"Adres",
        accessor:"address",
        className:"hidden md:table-cell",
    },
    {
        header:"Belediye",
        accessor:"municipality",
        className:"hidden md:table-cell",
    },
    {
        header:"IMEI",
        accessor:"imei",
        className:"hidden md:table-cell",
    },
    {
        header:"Isı",
        accessor:"heat",
        className:"hidden md:table-cell",
    },
    {
        header:"Doluluk",
        accessor:"fullness",
        className:"hidden md:table-cell",
    },
    {
        header:"Kapasite",
        accessor:"capacity",
        className:"hidden md:table-cell",
    },
]

interface ContainerPageProps {
    user: User;
  };

const ContainerListPage = async ({user}: ContainerPageProps) => {

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
       
    </div>
  )
}


//
export default ContainerListPage