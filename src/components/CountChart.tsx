"use client"

import { MdMoreHoriz } from 'react-icons/md';
import { FcFullTrash  } from 'react-icons/fc';
import { FcEmptyTrash  } from 'react-icons/fc';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Toplam',
        count: 123,
        fill: 'white',
    },
    {
        name: 'Boş',
        count: 123,
        fill: '#FAE27C',
    },
    {
        name: 'Dolu',
        count: 100,
        fill: '#C3EBFA',
    },
    
];



const CountChart =({emptyContainersCount, fullContainersCount}:{emptyContainersCount?:number, fullContainersCount?:number}) => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4 relative'>
             
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Konteyner Boş/Dolu</h1>
                <MdMoreHoriz />
            </div>
            <div className='absolute w-50 h-50 flex items-center justify-center right-5 w-5/6 h-2/3 z-10'>
                <FcEmptyTrash  className="text-5xl"/> 
                <FcFullTrash   className="text-5xl"/>
            </div>
            {/* CHART */}
            <div className='w-full h-[75%]  '>
                <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                        <RadialBar
                            background
                            dataKey="count"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
           
            {/* BOTTOM */}
            <div className='flex justify-between gap-16'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-tekoSky rounded-full'/>
                    <h1 className='font-bold'>{emptyContainersCount}</h1>
                    <h2 className='text-xs text-gray-600'>Boş {}</h2>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-tekoYellow rounded-full'/>
                    <h1 className='font-bold'>{fullContainersCount}</h1>
                    <h2 className='text-xs text-gray-600'>Dolu {}</h2>
                </div>
            </div>

        </div>
    )
}

export default CountChart