"use client"

import { useRouter } from "next/navigation"
import React from "react"
import { IoSearchOutline } from "react-icons/io5"

const TableSearch = () => {
    const router = useRouter()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const value = (e.currentTarget[0] as HTMLInputElement).value;
        
        const params = new URLSearchParams(window.location.search)
        params.set("search", value)
        router.push(`${window.location.pathname}?${params}`)
    }


    return (
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300">
            <IoSearchOutline className="relative w-5 h-5 -right-3" />
            <input
                type="text"
                id="id"
                name="name"
                placeholder="Ara..."
                className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
            />
        </form>
    )
}

export default TableSearch